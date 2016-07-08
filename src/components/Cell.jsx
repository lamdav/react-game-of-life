var React = require("react");

var LENGTH = 20;

var Cell = React.createClass({
  /*
    Define prop types.
  */
  propTypes: {
    status: React.PropTypes.bool.isRequired,
    row: React.PropTypes.number.isRequired,
    col: React.PropTypes.number.isRequired
  },

  /*
    Render the component.
  */
  render: function() {
    var fillColor = "gray";
    if (this.props.status) {
      fillColor = "black";
    }

    return (
      <rect width = {LENGTH} height = {LENGTH} x = {LENGTH * this.props.row} y = {LENGTH * this.props.col} fill = {fillColor} stroke = "cyan" strokeWidth = "1"></rect>
    );
  }
});

module.exports = Cell;
