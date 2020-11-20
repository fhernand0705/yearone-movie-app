import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './style.css';

import Search from '../Search/component';
import MovieProfile from '../MovieProfile/component';

function App() {
  return (
    <div data-testid="app-component">
      <Router data-testid="react-router">
        <Switch>
          <Route exact path="/" render={() => <Search />}/>  
          <Route path="/profile/:id" render={() => <MovieProfile />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
