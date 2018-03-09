import React from "react";
import PropTypes from "prop-types";

import { graphql } from "react-relay";
import { withStyles } from "material-ui/styles";
import Card from "material-ui/Card";
import Typography from "material-ui/Typography";
import classNames from "classnames";
import AppContent from "../components/AppContent";
import CheckDetailsCard from "../components/CheckDetailsCard";

const styles = {
  cardHolder: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    marginTop: 24,
  },
  card: {
    width: "100%",
  },
  notFirstCard: {
    marginLeft: 24,
  },
  container: {
    padding: 16,
  },
};

class EventsPage extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    node: PropTypes.object.isRequired,
  };

  static query = graphql`
    query EventDetailsPageQuery($id: ID!) {
      node(id: $id) {
        ... on Event {
          check {
            ...CheckDetailsCard_check
          }
        }
      }
    }
  `;

  render() {
    const { classes } = this.props;
    return (
      <AppContent>
        <div>
          <Card>
            <div className={classes.container}>
              <Typography type="headline">History</Typography>
            </div>
          </Card>
          <div className={classes.cardHolder}>
            <CheckDetailsCard check={this.props.node.check} />
            <Card className={classNames(classes.card, classes.notFirstCard)}>
              <div className={classes.container}>
                <Typography type="headline">Entity</Typography>
              </div>
            </Card>
          </div>
        </div>
      </AppContent>
    );
  }
}

export default withStyles(styles)(EventsPage);
