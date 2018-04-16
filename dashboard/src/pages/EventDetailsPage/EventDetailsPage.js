import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const query = gql`
  query EventDetailsPageQuery(
    $ns: NamespaceInput!
    $check: String!
    $entity: String!
  ) {
    event(ns: $ns, entity: $entity, check: $check) {
      id
      timestamp
    }
  }
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
        {({ data = {}, loading }) => {
          if (loading) return <div>Loading...</div>;

          return (
            <React.Fragment>
              <p>timestamp: {data.event.timestamp}</p>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default EventDetailsPage;
