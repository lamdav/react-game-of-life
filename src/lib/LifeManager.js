"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Cell = require("./Cell.jsx");

var _Cell2 = _interopRequireDefault(_Cell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LENGTH = 20;

/* global requestAnimationFrame cancelAnimationFrame */

var LifeManager = function (_Component) {
  _inherits(LifeManager, _Component);

  /*
    Initialize default state.
  */
  function LifeManager(props) {
    _classCallCheck(this, LifeManager);

    var _this = _possibleConstructorReturn(this, (LifeManager.__proto__ || Object.getPrototypeOf(LifeManager)).call(this, props));

    var board = {
      delay: 1000 / _this.props.fps
    };

    _this.svgStyle = {
      width: _this.props.width * LENGTH,
      height: _this.props.height * LENGTH,
      position: "absolute",
      background: "cyan"
    };

    // Avoid 2d array and use an object instead.
    for (var row = 0; row < _this.props.width; row++) {
      for (var col = 0; col < _this.props.height; col++) {
        if (Math.random() > 0.5) {
          board[[row, col]] = true;
        } else {
          board[[row, col]] = false;
        }
      }
    }

    // Bind functions.
    _this.mod = _this.mod.bind(_this);
    _this.countNeighbors = _this.countNeighbors.bind(_this);
    _this.nextGeneration = _this.nextGeneration.bind(_this);

    _this.state = board;
    return _this;
  }

  /*
    Perform floor mod.
  */


  _createClass(LifeManager, [{
    key: "mod",
    value: function mod(n, m) {
      return (n % m + m) % m;
    }

    /*
      Count the neighbors of a given cell.
    */

  }, {
    key: "countNeighbors",
    value: function countNeighbors(row, col) {
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
    }

    /*
      Setup the next generation.
    */

  }, {
    key: "nextGeneration",
    value: function nextGeneration() {
      var nextState = {};
      var then = new Date().getTime();
      var now = void 0;
      var neighbors = void 0;
      var delta = void 0;

      for (var row = 0; row < this.props.width; row++) {
        for (var col = 0; col < this.props.height; col++) {
          neighbors = this.countNeighbors(row, col);

          // default: lives on.
          nextState[[row, col]] = this.state[[row, col]];
          if (neighbors < 2 || neighbors > 3) {
            // death
            nextState[[row, col]] = false;
          } else if (neighbors === 3 && !this.state[[row, col]].status) {
            // birth
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

  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.nextGeneration();
    }

    /*
      Cancel animation when unmounted.
    */

  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      cancelAnimationFrame(this.requestID);
    }

    /*
      Render the component.
    */

  }, {
    key: "render",
    value: function render() {
      var cells = [];
      for (var row = 0; row < this.props.width; row++) {
        for (var col = 0; col < this.props.height; col++) {
          cells.push(_react2.default.createElement(_Cell2.default, { status: this.state[[row, col]],
            row: row,
            col: col,
            key: row + "cell" + col,
            cellActiveColor: this.props.cellActiveColor,
            cellInActiveColor: this.props.cellInActiveColor,
            lineColor: this.props.lineColor }));
        }
      }

      return _react2.default.createElement(
        "svg",
        { style: this.svgStyle },
        cells
      );
    }
  }]);

  return LifeManager;
}(_react.Component);

;

/*
  Define prop types.
*/
LifeManager.propTypes = {
  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
  fps: _propTypes2.default.number,
  lineColor: _propTypes2.default.string,
  cellActiveColor: _propTypes2.default.string,
  cellInActiveColor: _propTypes2.default.string
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

exports.default = LifeManager;