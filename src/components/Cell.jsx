import React, {Component} from "react";
import PropTypes from "prop-types";

const LENGTH = 20;

class Cell extends Component {
  /*
    Render the component.
  */
  render() {
    let fillColor = this.props.status
      ? this.props.cellActiveColor
      : this.props.cellInActiveColor;

    return (
      <rect width={LENGTH} height={LENGTH} x={LENGTH * this.props.row} y={LENGTH * this.props.col} fill={fillColor} stroke={this.props.lineColor} strokeWidth="1"></rect>
    );
  }
};

/*
  Define prop types.
*/
Cell.propTypes = {
  status: PropTypes.bool.isRequired,
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  lineColor: PropTypes.string.isRequired,
  cellActiveColor: PropTypes.string.isRequired,
  cellInActiveColor: PropTypes.string.isRequired
};

export default Cell;
