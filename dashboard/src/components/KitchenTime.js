import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

class KitchenTime extends React.PureComponent {
  static propTypes = {
    dateTime: PropTypes.string.isRequired,
  };

  render() {
    const { dateTime, ...props } = this.props;
    const date = new Date(dateTime);
    const format = moment(date).format("M:ss A");

    return (
      <time dateTime={dateTime} {...props}>
        {format}
      </time>
    );
  }
}

export default KitchenTime;
