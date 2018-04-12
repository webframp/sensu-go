import React from "react";
import PropTypes from "prop-types";
import { graphql } from "react-relay";

class EventDetailsPage extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  };

  static query = graphql`
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

  render() {
    const { match } = this.props;
    return (
      <React.Fragment>
        <p>entity: {match.params.entity}</p>
        <p>check: {match.params.check}</p>
      </React.Fragment>
    );
  }
}
