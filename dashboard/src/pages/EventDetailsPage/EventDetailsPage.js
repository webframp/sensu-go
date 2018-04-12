import React from "react";
import PropTypes from "prop-types";

class EventDetailsPage extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  };

  render() {
    const { match } = this.props;
    return <p>id: {match.id}</p>;
  }
}

export default EventDetailsPage;
