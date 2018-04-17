import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import Card, { CardContent } from "material-ui/Card";
import Divider from "material-ui/Divider";
import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";
import Dictionary, {
  DictionaryKey,
  DictionaryValue,
} from "../../components/Dictionary";
import RelativeDate from "../../components/RelativeDate";
import KitchenTime from "../../components/KitchenTime";
import Duration from "../../components/Duration";

class EventDetailsCheckResult extends React.PureComponent {
  static propTypes = {
    check: PropTypes.object.isRequired,
    entity: PropTypes.object.isRequired,
  };

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
    entity: gql`
      fragment EventDetailsCheckResult_entity on Entity {
        name
      }
    `,
  };

  render() {
    const { check, entity } = this.props;
    return (
      <Card>
        <CardContent>
          <Typography variant="headline" gutterBottom>
            Check Result
          </Typography>
          <Grid container spacing={0}>
            <Grid item xs={12} md={6}>
              <Dictionary>
                <DictionaryKey>Status</DictionaryKey>
                <DictionaryValue>{check.status}</DictionaryValue>
                <DictionaryKey>Last OK</DictionaryKey>
                <DictionaryValue>
                  <RelativeDate timestamp={check.lastOK} capitalize />
                </DictionaryValue>
                <DictionaryKey>Occurrences</DictionaryKey>
                <DictionaryValue>
                  {check.occurrences} occurrences
                </DictionaryValue>
                <DictionaryKey>Occurrences Watermark</DictionaryKey>
                <DictionaryValue>
                  {check.occurrencesWatermark} occurrences
                </DictionaryValue>
              </Dictionary>
            </Grid>
            <Grid item xs={12} md={6}>
              <Dictionary>
                <DictionaryKey>Check</DictionaryKey>
                <DictionaryValue>{check.name}</DictionaryValue>
                <DictionaryKey>Entity</DictionaryKey>
                <DictionaryValue>{entity.name}</DictionaryValue>
                <DictionaryKey>Ran at</DictionaryKey>
                <DictionaryValue>
                  Issued & executed at <KitchenTime dateTime={check.executed} />
                </DictionaryValue>
                <DictionaryKey>Ran for</DictionaryKey>
                <DictionaryValue>
                  <Duration duration={check.duration * 1000} />
                </DictionaryValue>
              </Dictionary>
            </Grid>
          </Grid>
        </CardContent>

        {!!check.output && (
          <React.Fragment>
            <Divider />
            <CardContent>
              <Typography>{check.output}</Typography>
            </CardContent>
          </React.Fragment>
        )}
      </Card>
    );
  }
}

export default EventDetailsCheckResult;
