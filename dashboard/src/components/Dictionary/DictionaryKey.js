import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";

const styles = theme => ({
  root: {
    width: "50%",
    paddingRight: theme.spacing.unit,
    textOverflow: "ellipsis",
  },
});

class DictionaryKey extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
  };

  render() {
    const { className: classNameProp, classes, children } = this.props;
    const className = [classNameProp || "", classes.root].join(" ");

    return (
      <td className={className}>
        <Typography color="textSecondary">{children}</Typography>
      </td>
    );
  }
}

export default withStyles(styles)(DictionaryKey);
