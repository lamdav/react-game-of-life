var React = require("react");
var Cell = require("./Cell");

var LENGTH = 20;
var DELAY = 1000 / 120;

/* global requestAnimationFrame cancelAnimationFrame */
var LifeManager = React.createClass({
  /*
    Define prop types.
  */
  propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number
  },

  /*
    Define default prop types.
  */
  getDefaultProps: function() {
    return ({width: 20, height: 20});
  },

  /*
    Initialize default state.
  */
  getInitialState: function() {
    var board = {};
    this.svgStyle = {
      width: this.props.width * LENGTH,
      height: this.props.height * LENGTH,
      position: "absolute",
      background: "cyan"
    };

    // Avoid 2d array and use an object instead.
    for (var row = 0; row < this.props.width; row++) {
      for (var col = 0; col < this.props.height; col++) {
        if (Math.random() > 0.5) {
          board[[row, col]] = true;
        } else {
          board[[row, col]] = false;
        }
      }
    }

    return (board);
  },

  /*
    Perform floor mod.
  */
  mod: function(n, m) {
    return ((n % m) + m) % m;
  },

  /*
    Count the neighbors of a given cell.
  */
  countNeighbors: function(row, col) {
    var neighbors = 0;
    // right
    if (this.state[[this.mod(row + 1, this.props.width), col]]) {
      neighbors++;
    }
    // left
    if (this.state[[this.mod(row - 1, this.props.width), col]]) {
      neighbors++;
    }
    // down
    if (this.state[[row, this.mod(col + 1, this.props.height)]]) {
      neighbors++;
    }
    // up
    if (this.state[[row, this.mod(col - 1, this.props.height)]]) {
      neighbors++;
    }
    // up-left
    if (this.state[[this.mod(row - 1, this.props.width), this.mod(col - 1, this.props.height)]]) {
      neighbors++;
    }
    // up-right
    if (this.state[[this.mod(row - 1, this.props.width), this.mod(col + 1, this.props.height)]]) {
      neighbors++;
    }
    // down-left
    if (this.state[[this.mod(row + 1, this.props.width), this.mod(col - 1, this.props.height)]]) {
      neighbors++;
    }
    // down-right
    if (this.state[[this.mod(row + 1, this.props.width), this.mod(col + 1, this.props.height)]]) {
      neighbors++;
    }
    return neighbors;
  },

  /*
    Setup the next generation.
  */
  nextGeneration: function() {
    var nextState = {};
    var then = new Date().getTime();
    var now;
    var neighbors;
    var delta;

    for (var row = 0; row < this.props.width; row++) {
      for (var col = 0; col < this.props.height; col++) {
        neighbors = this.countNeighbors(row, col);

        // default: lives on.
        nextState[[row, col]] = this.state[[row, col]];
        if (neighbors < 2 || neighbors > 3) { // death
          nextState[[row, col]] = false;
        } else if (neighbors === 3 && !this.state[[row, col]].status) { // birth
          nextState[[row, col]] = true;
        }
      }
    }

    this.setState(nextState);

    // Pseudo 60fps.
    now = new Date().getTime();
    delta = now - then;
    while (delta < DELAY) {
      now = new Date().getTime();
      delta = now - then;
    }

    this.requestID = requestAnimationFrame(this.nextGeneration);
  },

  /*
    Start the process when mounted.
  */
  componentDidMount: function() {
    this.nextGeneration();
  },

  /*
    Cancel animation when unmounted.
  */
  componentWillUnmount: function() {
    cancelAnimationFrame(this.requestID);
  },

  /*
    Render the component.
  */
  render: function() {
    var cells = [];
    for (var row = 0; row < this.props.width; row++) {
      for (var col = 0; col < this.props.height; col++) {
        cells.push(<Cell status = {this.state[[row, col]]} row = {row} col = {col} key = {row + "cell" + col} />);
      }
    }

    return (
      <svg style = {this.svgStyle}>
        {cells}
      </svg>
    );
  }
});

module.exports = LifeManager;
