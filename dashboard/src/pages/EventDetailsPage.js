import React from "react";
import PropTypes from "prop-types";

import { graphql } from "react-relay";
import { withStyles } from "material-ui/styles";
import Card from "material-ui/Card";
import Typography from "material-ui/Typography";
import classNames from "classnames";

import AppContent from "../components/AppContent";

const styles = {
  cardHolder: {
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: 24,
  },
  card: {
    width: "100%",
  },
  firstCard: {
    marginRight: 24,
  },
  container: {
    padding: 16,
  },
};

class EventsPage extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    classes: PropTypes.object.isRequired,
  };

  static query = graphql`
    query EventsPageQuery($environment: String!, $organization: String!) {
      viewer {
        ...EventsContainer_viewer
      }
      environment(organization: $organization, environment: $environment) {
        events(first: 1) {
          edges {
            node {
              ...EventDetailsContainer_event
            }
          }
        }
      }
    }
  `;

  render() {
    const { classes } = this.props;
    return (
      <AppContent>
        <Card>
          <div className={classes.container}>
            <Typography type="headline">History</Typography>
          </div>
        </Card>
        <div className={classes.cardHolder}>
          <Card className={classNames(classes.card, classes.firstCard)}>
            <div className={classes.container}>
              <Typography type="headline">Checkname</Typography>
              ... iterate over check details
            </div>
          </Card>
          <Card className={classes.card}>
            <div className={classes.container}>
              <Typography type="headline">Entityname</Typography>
            </div>
          </Card>
        </div>
      </AppContent>
    );
  }
}

export default withStyles(styles)(EventsPage);
