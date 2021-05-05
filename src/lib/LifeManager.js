"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Cell = _interopRequireDefault(require("./Cell"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var LENGTH = 20;
/* global requestAnimationFrame cancelAnimationFrame */

var LifeManager = /*#__PURE__*/function (_Component) {
  _inherits(LifeManager, _Component);

  var _super = _createSuper(LifeManager);

  /*
    Initialize default state.
  */
  function LifeManager(props) {
    var _this;

    _classCallCheck(this, LifeManager);

    _this = _super.call(this, props);
    var board = {
      delay: 1000 / _this.props.fps
    };
    _this.svgStyle = {
      width: _this.props.width * LENGTH,
      height: _this.props.height * LENGTH,
      position: "absolute",
      background: "cyan"
    }; // Avoid 2d array and use an object instead.

    for (var row = 0; row < _this.props.width; row++) {
      for (var col = 0; col < _this.props.height; col++) {
        if (Math.random() > 0.5) {
          board[[row, col]] = true;
        } else {
          board[[row, col]] = false;
        }
      }
    } // Bind functions.


    _this.mod = _this.mod.bind(_assertThisInitialized(_this));
    _this.countNeighbors = _this.countNeighbors.bind(_assertThisInitialized(_this));
    _this.nextGeneration = _this.nextGeneration.bind(_assertThisInitialized(_this));
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
      var neighbors = 0; // right

      if (this.state[[this.mod(row + 1, this.props.width), col]]) {
        neighbors++;
      } // left


      if (this.state[[this.mod(row - 1, this.props.width), col]]) {
        neighbors++;
      } // down


      if (this.state[[row, this.mod(col + 1, this.props.height)]]) {
        neighbors++;
      } // up


      if (this.state[[row, this.mod(col - 1, this.props.height)]]) {
        neighbors++;
      } // up-left


      if (this.state[[this.mod(row - 1, this.props.width), this.mod(col - 1, this.props.height)]]) {
        neighbors++;
      } // up-right


      if (this.state[[this.mod(row - 1, this.props.width), this.mod(col + 1, this.props.height)]]) {
        neighbors++;
      } // down-left


      if (this.state[[this.mod(row + 1, this.props.width), this.mod(col - 1, this.props.height)]]) {
        neighbors++;
      } // down-right


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
      var now;
      var neighbors;
      var delta;

      for (var row = 0; row < this.props.width; row++) {
        for (var col = 0; col < this.props.height; col++) {
          neighbors = this.countNeighbors(row, col); // default: lives on.

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

      this.setState(nextState); // Pseudo 60fps.

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
          cells.push( /*#__PURE__*/(0, _jsxRuntime.jsx)(_Cell["default"], {
            status: this.state[[row, col]],
            row: row,
            col: col,
            cellActiveColor: this.props.cellActiveColor,
            cellInActiveColor: this.props.cellInActiveColor,
            lineColor: this.props.lineColor
          }, row + "cell" + col));
        }
      }

      return /*#__PURE__*/(0, _jsxRuntime.jsx)("svg", {
        style: this.svgStyle,
        children: cells
      });
    }
  }]);

  return LifeManager;
}(_react.Component);

;
/*
  Define prop types.
*/

LifeManager.propTypes = {
  width: _propTypes["default"].number,
  height: _propTypes["default"].number,
  fps: _propTypes["default"].number,
  lineColor: _propTypes["default"].string,
  cellActiveColor: _propTypes["default"].string,
  cellInActiveColor: _propTypes["default"].string
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
var _default = LifeManager;
exports["default"] = _default;