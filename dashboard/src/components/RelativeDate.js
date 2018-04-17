import React from "react";
import PropTypes from "prop-types";
import { duration } from "moment";
import capitalizeStr from "lodash/capitalize";

// time interval in which delta is recalculated
const recalcInterval = 60000;

function deltaFromNow(ts) {
  return new Date(ts) - new Date();
}

function humanizeDelta(delta) {
  if (Math.abs(delta) > 10) {
    return duration(delta).humanize(true);
  }
  return "just now";
}

class RelativeDate extends React.Component {
  static propTypes = {
    capitalize: PropTypes.bool,
    timestamp: PropTypes.string.isRequired,
  };

  static defaultProps = {
    capitalize: false,
  };

  constructor(props) {
    super();
    this.state = { delta: deltaFromNow(props.timestamp) };
  }

  componentDidMount() {
    this.interval = setInterval(this.setDelta, recalcInterval);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.timestamp !== nextProps.timestamp) {
      this.setState({ delta: deltaFromNow(nextProps.timestamp) });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  setDelta = () => {
    this.setState({ delta: deltaFromNow(this.props.timestamp) });
  };

  render() {
    const { timestamp, capitalize, ...props } = this.props;
    const { delta } = this.state;

    let relativeDate = humanizeDelta(delta);
    if (capitalize) relativeDate = capitalizeStr(relativeDate);
    return (
      <time dateTime={timestamp} {...props}>
        {relativeDate}
      </time>
    );
  }
}

export default RelativeDate;
