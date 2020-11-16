import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './style.css';

import Search from '../Search/component'

function App() {
  return (
    <div data-testid="app-component">
      <Search />
    </div>
  );
}

export default App;
