import React, {Component} from "react";
import PropTypes from "prop-types";
import Cell from "./Cell.jsx";

const LENGTH = 20;

/* global requestAnimationFrame cancelAnimationFrame */
class LifeManager extends Component {
  /*
    Initialize default state.
  */
  constructor(props) {
    super(props);

    let board = {
      delay: 1000 / this.props.fps
    };

    this.svgStyle = {
      width: this.props.width * LENGTH,
      height: this.props.height * LENGTH,
      position: "absolute",
      background: "cyan"
    };

    // Avoid 2d array and use an object instead.
    for (let row = 0; row < this.props.width; row++) {
      for (let col = 0; col < this.props.height; col++) {
        if (Math.random() > 0.5) {
          board[
            [row, col]
          ] = true;
        } else {
          board[
            [row, col]
          ] = false;
        }
      }
    }

    // Bind functions.
    this.mod = this.mod.bind(this);
    this.countNeighbors = this.countNeighbors.bind(this);
    this.nextGeneration = this.nextGeneration.bind(this);

    this.state = board;
  }

  /*
    Perform floor mod.
  */
  mod(n, m) {
    return ((n % m) + m) % m;
  }

  /*
    Count the neighbors of a given cell.
  */
  countNeighbors(row, col) {
    let neighbors = 0;
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
  }

  /*
    Setup the next generation.
  */
  nextGeneration() {
    let nextState = {};
    let then = new Date().getTime();
    let now;
    let neighbors;
    let delta;

    for (let row = 0; row < this.props.width; row++) {
      for (let col = 0; col < this.props.height; col++) {
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
    while (delta < this.state.delay) {
      now = new Date().getTime();
      delta = now - then;
    }

    this.requestID = requestAnimationFrame(this.nextGeneration);
  }

  /*
    Start the process when mounted.
  */
  componentDidMount() {
    this.nextGeneration();
  }

  /*
    Cancel animation when unmounted.
  */
  componentWillUnmount() {
    cancelAnimationFrame(this.requestID);
  }

  /*
    Render the component.
  */
  render() {
    let cells = [];
    for (let row = 0; row < this.props.width; row++) {
      for (let col = 0; col < this.props.height; col++) {
        cells.push(<Cell status={this.state[[row, col]]}
                         row={row}
                         col={col}
                         key={row + "cell" + col}
                         cellActiveColor={this.props.cellActiveColor} cellInActiveColor={this.props.cellInActiveColor}
                         lineColor={this.props.lineColor}/>);
      }
    }

    return (
      <svg style={this.svgStyle}>
        {cells}
      </svg>
    );
  }
};

/*
  Define prop types.
*/
LifeManager.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fps: PropTypes.number,
  lineColor: PropTypes.string,
  cellActiveColor: PropTypes.string,
  cellInActiveColor: PropTypes.string
};

/*
  Define default prop types.
*/
LifeManager.defaultProps = {
  width: 20,
  height: 20,
  fps: 60,
  lineColor: "cyan",
  cellActiveColor: "black",
  cellInActiveColor: "gray"
};

export default LifeManager;
