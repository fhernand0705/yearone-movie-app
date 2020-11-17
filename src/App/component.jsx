import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './style.css';

import Search from '../Search/component';
import Profile from '../Profile/component';

function App() {
  return (
    <div data-testid="app-component">
      <Switch>
        <Route exact path="/" render={() => <Search />}/>  
        <Route path="/profile/:id" render={() => <Profile />} />
      </Switch>
    </div>
  );
}

export default App;
