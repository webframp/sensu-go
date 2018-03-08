import React from "react";
import PropTypes from "prop-types";

import { graphql, createFragmentContainer } from "react-relay";
import { withStyles } from "material-ui/styles";
import Card from "material-ui/Card";
import Typography from "material-ui/Typography";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "material-ui/Table";

import EventStatus from "./EventStatus";

const styles = {
  card: { width: "100%" },
  container: { padding: 16 },
};

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

    return (
      <Card className={classes.card}>
        <div className={classes.container}>
          <Typography type="headline">{check.name}</Typography>
          <Table>
            <TableHead />
            <TableBody>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell>
                  <EventStatus status={check.status} />
                  ({check.status})
                  {readableStatus}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card>
    );
  }
}

export default createFragmentContainer(
  withStyles(styles)(CheckDetailsCard),
  graphql`
    fragment CheckDetailsCard_check on Check {
      name
      command
      executed
      status
      history {
        executed
        status
      }
      interval
    }
  `,
);
