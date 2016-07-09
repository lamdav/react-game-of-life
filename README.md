# react-game-of-life
A React Component depicting the Conway's Game of Life.

# How to use:
```
var React = require("react");
var LifeManager = require("react-game-of-life);

var Game = React.createClass({
  render: function() {
    return (
      <LifeManager width = {20} height = {20} />
    );
  }
});
```

# Props:
| prop   | description                     | default |
|:------:|:-------------------------------:|:-------:|
| width  | defines the width of the board  | 20      |
| height | defines the height of the board | 20      |
