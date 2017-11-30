package agent

import (
	"github.com/sensu/sensu-go/system"
	"github.com/sensu/sensu-go/types"
)

func (a *Agent) getAgentEntity() *types.Entity {
	if a.entity == nil {
		e := &types.Entity{
			ID:               a.config.AgentID,
			Class:            "agent",
			Subscriptions:    a.config.Subscriptions,
			Deregister:       a.config.Deregister,
			KeepaliveTimeout: a.config.KeepaliveTimeout,
			Environment:      a.config.Environment,
			Organization:     a.config.Organization,
			User:             a.config.User,
		}

		if a.config.DeregistrationHandler != "" {
			e.Deregistration = types.Deregistration{
				Handler: a.config.DeregistrationHandler,
			}
		}

		s, err := system.Info()
		if err == nil {
			e.System = s
		}

		a.entity = e
	}

	return a.entity
}

// getEntities receives an event and verifies if we have a proxy entity, so it
// can be added as the source, and ensures that the event uses the agent's
// entity
func (a *Agent) getEntities(event *types.Event) {
	// Verify if we have an entity in the event, and that it is different from the
	// agent's entity
	if event.Entity != nil && event.Entity.ID != a.config.AgentID {
		// Identify the event's source as the provided entity so it can be properly
		// handled by the backend
		event.Check.Config.Source = event.Entity.ID
	}

	// From this point we make sure that the agent's entity is used in the event
	// so we provide details like the environment and the organization to the
	// backend
	event.Entity = a.getAgentEntity()
}