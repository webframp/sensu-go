package messaging

import (
	"fmt"
	"testing"

	"github.com/sensu/sensu-go/testing/mockring"
)

func BenchmarkWizardBusPublish(b *testing.B) {
	topicName := "topic"

	tt := []int{1, 10, 100, 1000, 10000}

	startClients := func(bus *WizardBus, numClients int) {
		for i := 0; i < numClients; i++ {
			ch := channelSubscriber{make(chan interface{}, 1000)}
			go func(client string, ch channelSubscriber) {
				bus.Subscribe(topicName, client, ch)
				for range ch.Channel {
				}
			}(fmt.Sprintf("client-%d", i), ch)
		}
	}

	for _, tc := range tt {
		b.Run(fmt.Sprintf("%d-clients", tc), func(b *testing.B) {
			bus, _ := NewWizardBus(WizardBusConfig{
				RingGetter: &mockring.Getter{},
			})
			_ = bus.Start()

			go startClients(bus, tc)

			b.ResetTimer()
			for i := 0; i < b.N; i++ {
				if err := bus.Publish(topicName, &i); err != nil {
					b.FailNow()
				}
			}
		})
	}
}
