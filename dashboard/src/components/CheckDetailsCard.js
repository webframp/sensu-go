import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "material-ui/styles";
import Card from "material-ui/Card";

const styles = {};

class EventDetails extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    classes: PropTypes.object.isRequired,
  };

  render() {
    const { classes } = this.props;
    return <Card className={classes.container}>This is a check card</Card>;
  }
}

e;
