package messaging

import (
	"context"
	"errors"
	"sync"
	"sync/atomic"

	"github.com/sensu/sensu-go/types"
)

// WizardBus is a message bus.
//
// For every topic, WizardBus creates a new goroutine responsible for fanning
// messages out to each subscriber for a given topic. Any type can be passed
// across a WizardTopic and it is up to the consumers/producers to coordinate
// around a particular topic type. Care should be taken not to send multiple
// message types over a single topic, however, as we do not want to introduce
// a dependency on reflection to determine the type of the received interface{}.
type WizardBus struct {
	running    atomic.Value
	topics     sync.Map
	errchan    chan error
	ringGetter types.RingGetter
}

// WizardBusConfig configures a WizardBus
type WizardBusConfig struct {
	RingGetter types.RingGetter
}

// WizardOption is a functional option.
type WizardOption func(*WizardBus) error

// NewWizardBus creates a new WizardBus.
func NewWizardBus(cfg WizardBusConfig, opts ...WizardOption) (*WizardBus, error) {
	bus := &WizardBus{
		errchan:    make(chan error, 1),
		ringGetter: cfg.RingGetter,
	}
	for _, opt := range opts {
		if err := opt(bus); err != nil {
			return nil, err
		}
	}
	return bus, nil
}

// Start ...
func (b *WizardBus) Start() error {
	b.running.Store(true)
	return nil
}

// Stop ...
func (b *WizardBus) Stop() error {
	b.running.Store(false)
	close(b.errchan)
	return nil
}

// Status ...
func (b *WizardBus) Status() error {
	if !b.running.Load().(bool) {
		return errors.New("bus has shutdown")
	}
	return nil
}

// Err ...
func (b *WizardBus) Err() <-chan error {
	return b.errchan
}

// Subscribe to a WizardBus topic. This function locks the WizardBus
// mutex (RW), fetches the appropriate WizardTopic (or creates it if
// missing), unlocks the WizardBus mutex, locks the WizardTopic's
// mutex (RW), adds the consumer channel to the WizardTopic's
// bindings, and unlocks the WizardTopics mutex.
//
// WARNING:
//
// Messages received over a topic should be considered IMMUTABLE by consumers.
// Modifying received messages will introduce data races. While these _may_ be
// detected by the Golang race detector, this is not always the case and is
// only exacerbated by the fact that we test each package individually.
func (b *WizardBus) Subscribe(topic string, consumer string, sub Subscriber) (Subscription, error) {
	if !b.running.Load().(bool) {
		return Subscription{}, errors.New("bus no longer running")
	}

	// We can either have a mutex only for subscribing so that we don't
	// have to alloc on subscribe or we can alloc on subscribe. It seems
	// like the latter is the least expensive since every agent connection
	// calls Subscribe multiple times.
	t, _ := b.topics.LoadOrStore(topic, &wizardTopic{id: topic})
	wTopic := t.(*wizardTopic)

	subscription, err := wTopic.Subscribe(consumer, sub)
	return subscription, err
}

// Publish publishes a message to a topic. If the topic does not
// exist, this is a noop.
func (b *WizardBus) Publish(topic string, msg interface{}) error {
	if !b.running.Load().(bool) {
		return errors.New("bus no longer running")
	}

	v, ok := b.topics.Load(topic)
	if ok {
		v.(*wizardTopic).Send(msg)
	}

	return nil
}

// PublishDirect publishes a message to a single consumer.
func (b *WizardBus) PublishDirect(topic string, msg interface{}) error {
	if !b.running.Load().(bool) {
		return errors.New("bus no longer running")
	}

	t, ok := b.topics.Load(topic)
	if !ok {
		return nil
	}

	wt := t.(*wizardTopic)

	if wt.ring == nil {
		if err := b.makeRing(wt); err != nil {
			return err
		}
	}

	return wt.SendDirect(msg)
}

// makeRing constructs a ring for a topic. rings are lazily constructed;
// they are not created until the need for one is identified by a call to PublishDirect.
func (b *WizardBus) makeRing(wt *wizardTopic) error {
	ring := b.ringGetter.GetRing(wt.id)

	var err error

	wt.bindings.Range(func(k, _ interface{}) bool {
		id := k.(string)
		err = ring.Add(context.Background(), id)
		return err != nil
	})

	if err != nil {
		return err
	}

	wt.ring = ring

	return nil
}
