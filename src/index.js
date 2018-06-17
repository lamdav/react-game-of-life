import React from 'react';
import ReactDOM from 'react-dom';
import LifeManager from './lib/LifeManager.js';

ReactDOM.render(
  <LifeManager width={40}
               lineColor={"green"}
               cellActiveColor={"pink"}/>,
  document.getElementById('root')
);
