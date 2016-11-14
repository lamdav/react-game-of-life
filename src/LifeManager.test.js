import React from 'react';
import ReactDOM from 'react-dom';
import LifeManager from './components/LifeManager.jsx';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LifeManager />, div);
});
