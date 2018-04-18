import React from "react";
import gql from "graphql-tag";
import Placeholder from "../../../PlaceholderCard";

class EventDetailsHistory extends React.Component {
  static fragments = {
    check: gql`
      fragment EventDetailsHistory_check on Check {
        history {
          status
          executed
        }
      }
    `,
  };

  render() {
    return <Placeholder />;
  }
}

export default EventDetailsHistory;
