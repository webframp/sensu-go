import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";

class EventDetailsCheckResult extends React.Component {
  static propTypes = {
    check: PropTypes.object.isRequired,
  };

  static fragments = {
    check: gql`
      fragment EventDetailsCheckResult_check on Check {
        status
        lastOK
        occurrences
        occurrencesWatermark
      }
    `,
  };

  render() {
    const { check } = this.props;
    return (
      <React.Fragment>
        <p>status: {check.status}</p>
      </React.Fragment>
    );
  }
}

export default EventDetailsCheckResult;
