import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import consecutivePairs from "../../utils/consecutivePairs";

const styles = {
  root: {
    border: 0,
    width: "100%",
  },
};

class Dictionary extends React.Component {
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

    const pairs = consecutivePairs(children);
    const wrappedEntries = pairs.map(([key, val]) => (
      <tr>
        <key.type {...key.props} />
        <val.type {...val.props} />
      </tr>
    ));

    return (
      <table className={className}>
        <tbody>{wrappedEntries}</tbody>
      </table>
    );
  }
}

export default withStyles(styles)(Dictionary);
