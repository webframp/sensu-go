package messaging

import (
	"context"
	"errors"
	"sync"
	"time"

	"github.com/sensu/sensu-go/backend/ring"
	"github.com/sensu/sensu-go/util/retry"

	"github.com/sensu/sensu-go/types"
)

// wizardTopic encapsulates state around a WizardBus topic and its
// consumer channel bindings.
type wizardTopic struct {
	id       string
	bindings sync.Map
	ring     types.Ring
}

// Send a message to all subscribers to this topic.
func (wTopic *wizardTopic) Send(msg interface{}) {
	wTopic.bindings.Range(func(_, v interface{}) bool {
		subscriber := v.(Subscriber)
		select {
		case subscriber.Receiver() <- msg:
		default:
		}
		return true
	})
}

// SendDirect sends a message directly to a subscriber of this topic.
func (wTopic *wizardTopic) SendDirect(msg interface{}) error {
	if wTopic.ring == nil {
		return errors.New("no ring for topic: " + wTopic.id)
	}

	id, err := wTopic.ring.Next(context.Background())
	if err != nil {
		return err
	}

	v, ok := wTopic.bindings.Load(id)
	if !ok {
		// Should we clean up this ring entry?
		return errors.New("subscriber not found: " + id)
	}

	v.(Subscriber).Receiver() <- msg

	return nil
}

// Subscribe a Subscriber to this topic and receive a Subscription.
func (wTopic *wizardTopic) Subscribe(id string, sub Subscriber) (Subscription, error) {
	wTopic.bindings.Store(id, sub)

	if wTopic.ring != nil {
		if err := wTopic.ring.Add(context.Background(), id); err != nil {
			return Subscription{}, err
		}
	}

	return Subscription{
		id:     id,
		cancel: wTopic.unsubscribe,
	}, nil
}

// Unsubscribe a consumer from this topic.
func (wTopic *wizardTopic) unsubscribe(id string) error {
	wTopic.bindings.Delete(id)

	if wTopic.ring != nil {
		backoff := &retry.ExponentialBackoff{
			MaxDelayInterval: 5 * time.Second,
			MaxElapsedTime:   60 * time.Second,
		}

		var err error
		backoff.Retry(func(int) (bool, error) {
			err = wTopic.ring.Remove(context.Background(), id)
			if err != nil && err != ring.ErrNotOwner {
				return false, nil
			}
			return true, nil
		})
		return err
	}

	return nil
}
