import React, {Component} from "react";

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
  status: React.PropTypes.bool.isRequired,
  row: React.PropTypes.number.isRequired,
  col: React.PropTypes.number.isRequired,
  lineColor: React.PropTypes.string.isRequired,
  cellActiveColor: React.PropTypes.string.isRequired,
  cellInActiveColor: React.PropTypes.string.isRequired
};

export default Cell;
