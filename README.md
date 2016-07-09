# react-game-of-life
A React Component depicting the Conway's Game of Life.  
[Demo](https://lamdav.github.io/react-game-of-life/)

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
| prop              | description                                         | default | type   |
|:-----------------:|:---------------------------------------------------:|:-------:|:------:|
| width             | defines the width of the board                      | 20      | number |
| height            | defines the height of the board                     | 20      | number |
| fps               | defines the number of frames to refesh every second | 60      | number |
| lineColor         | defines the color of the cell's outline             | cyan    | string |
| cellActiveColor   | defines the cell's alive status color               | gray    | string |
| cellInActiveColor | defines the cell's inactive status color            | black   | string |
