import React from "react";
import gql from "graphql-tag";
import Placeholder from "../../components/PlaceholderCard";

class EventDetailsCheckResult extends React.Component {
  static fragments = {
    check: gql`
      fragment EventDetailsCheckResult_check on Check {
        status
        lastOK
        occurrences
        occurrencesWatermark
        name
        executed
        issued
        duration
        output
      }
    `,
  };

  render() {
    return <Placeholder tall />;
  }
}

export default EventDetailsCheckResult;
