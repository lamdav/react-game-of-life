
# react-game-of-life
A React Component depicting the Conway's Game of Life.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

[Demo](https://lamdav.github.io/react-game-of-life/)

# Install:
`npm install react-game-of-life`

# How to use:
```javascript
import React, {Component} from "react";
import ReactDOM from "react-dom";
import LifeManager from "react-game-of-life";

ReactDOM.render(<LifeManager />, document.findElementById("game"));
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
