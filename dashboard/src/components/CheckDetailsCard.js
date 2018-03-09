import React from "react";
import PropTypes from "prop-types";

import { graphql, createFragmentContainer } from "react-relay";
import { withStyles } from "material-ui/styles";
import Card from "material-ui/Card";
import Typography from "material-ui/Typography";
import Table, { TableBody, TableCell, TableRow } from "material-ui/Table";
import Button from "material-ui/Button";
import classNames from "classnames";
import map from "lodash/map";
import moment from "moment";

import EventStatus from "./EventStatus";

const styles = theme => ({
  card: { width: "100%" },
  container: { padding: 16 },
  status: {
    display: "flex",
    alignItems: "center",
  },
  key: { fontWeight: "bold" },
  cell: {
    borderBottom: "none",
    padding: 0,
  },
  time: {
    fontStyle: "italic",
  },
  bottomActions: {
    backgroundColor: theme.palette.divider,
    padding: 8,
    display: "flex",
    justifyContent: "flex-end",
  },
});

class CheckDetailsCard extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    check: PropTypes.object.isRequired,
  };

  render() {
    const { classes, check } = this.props;

    let readableStatus = "";
    switch (check.status) {
      case 0:
        readableStatus = "Passing";
        break;
      case 1:
        readableStatus = "Warning";
        break;
      case 2:
        readableStatus = "Critical";
        break;
      default:
        readableStatus = "Unknown";
    }

    function fromNow(date) {
      const delta = new Date(date) - new Date();
      if (delta < 0) {
        return moment.duration(delta).humanize(true);
      }
      return "just now";
    }

    // some of the values need to be presented in a certain way
    // here we can specify those
    const valueTransformerMap = {
      status: val => (
        <div className={classes.status}>
          <EventStatus status={val} />
          &nbsp;({val})&nbsp;
          {readableStatus}
        </div>
      ),
      command: val => <code>{val}</code>,
      output: val => <code>{val}</code>,
      stdin: val => <code>{val.toString()}</code>,
      publish: val => <code>{val.toString()}</code>,
      executed: val => <span className={classes.time}>{fromNow(val)}</span>,
    };

    // generating the table cells
    // TODO why error about unique keys still
    const data = map(check, (val, key) => {
      let transformer = valueTransformerMap[key];
      transformer = transformer ? transformer(val, key) : <span>{val}</span>;
      return (
        <TableRow>
          <TableCell
            key={key}
            className={classNames(classes.key, classes.cell)}
          >
            {key}
          </TableCell>
          <TableCell key={`${key}+${val}`} className={classes.cell}>
            {transformer}
          </TableCell>
        </TableRow>
      );
    });

    return (
      <Card className={classes.card}>
        <div className={classes.container}>
          <Typography type="headline">Check</Typography>
          <Table>
            <TableBody>{data}</TableBody>
          </Table>
        </div>
        <div className={classes.bottomActions}>
          <Button>Silence</Button>
          <Button>Resolve</Button>
        </div>
      </Card>
    );
  }
}

// TODO readd history[status, executed]
export default createFragmentContainer(
  withStyles(styles)(CheckDetailsCard),
  graphql`
    fragment CheckDetailsCard_check on Check {
      name
      status
      executed
      interval
      command
      output
      source
      publish
      stdin
      subscriptions
    }
  `,
);
