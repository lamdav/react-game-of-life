var React = require("react");

var LENGTH = 20;

var Cell = React.createClass({
  /*
    Define prop types.
  */
  propTypes: {
    status: React.PropTypes.bool.isRequired,
    row: React.PropTypes.number.isRequired,
    col: React.PropTypes.number.isRequired,
    lineColor: React.PropTypes.object.isRequired,
    cellActiveColor: React.PropTypes.object.isRequired,
    cellInActiveColor: React.PropTypes.object.isRequired
  },

  /*
    Render the component.
  */
  render: function() {
    var fillColor = this.props.cellInActiveColor;
    if (this.props.status) {
      fillColor = this.props.cellActiveColor;
    }

    return (
      <rect width = {LENGTH} height = {LENGTH} x = {LENGTH * this.props.row} y = {LENGTH * this.props.col} fill = {fillColor} stroke = {this.props.lineColor} strokeWidth = "1"></rect>
    );
  }
});

module.exports = Cell;
