import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Grid from "material-ui/Grid";
import AppContent from "../../components/AppContent";
import EventDetailsCheckResult from "./EventDetailsCheckResult";
import EventDetailsHistory from "./EventDetailsHistory";
import EventDetailsRelatedEntities from "./EventDetailsRelatedEntities";
import EventDetailsConfiguration from "./EventDetailsConfiguration";

const query = gql`
  query EventDetailsPageQuery(
    $ns: NamespaceInput!
    $check: String!
    $entity: String!
  ) {
    event(ns: $ns, entity: $entity, check: $check) {
      id
      timestamp

      check {
        ...EventDetailsCheckResult_check
        ...EventDetailsHistory_check
        ...EventDetailsConfiguration_check
      }
      entity {
        ...EventDetailsCheckResult_entity
        ...EventDetailsRelatedEntities_entity
        ...EventDetailsConfiguration_entity
      }
    }
  }

  ${EventDetailsCheckResult.fragments.check}
  ${EventDetailsCheckResult.fragments.entity}
  ${EventDetailsHistory.fragments.check}
  ${EventDetailsRelatedEntities.fragments.entity}
  ${EventDetailsConfiguration.fragments.check}
  ${EventDetailsConfiguration.fragments.entity}
`;

class EventDetailsPage extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  };

  render() {
    const { match } = this.props;
    const ns = {
      organization: match.params.organization,
      environment: match.params.environment,
    };

    return (
      <Query query={query} variables={{ ...match.params, ns }}>
        {({ data: { event } = {}, loading }) => {
          if (loading) return <div>Loading...</div>;
          if (!event) return <div>Not found!</div>;

          const { check, entity } = event;
          return (
            <AppContent>
              <Grid container>
                <Grid item xs={12}>
                  <EventDetailsHistory check={check} />
                </Grid>
                <Grid item xs={12}>
                  <EventDetailsCheckResult check={check} entity={entity} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <EventDetailsRelatedEntities entity={entity} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <EventDetailsConfiguration check={check} entity={entity} />
                </Grid>
              </Grid>
            </AppContent>
          );
        }}
      </Query>
    );
  }
}

export default EventDetailsPage;
