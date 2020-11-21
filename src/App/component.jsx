import React from 'react';
import { Route, Switch, BrowserRouter as Router, Link } from 'react-router-dom';
import './style.css';

import Search from '../Search/component';
import MovieProfile from '../MovieProfile/component';
import MoviesTable from '../MoviesTable/component'

function App() {
  return (
    <div data-testid="app-component">
      <Router data-testid="react-router">
        {/* extract navbar to a new component */}
        <nav>
          <Link to="/">Search</Link>
          <Link to="/movies-table">Movies Table</Link>
        </nav>
        <Switch>
          <Route exact path="/" render={() => <Search />}/>  
          <Route path="/profile/:id" render={() => <MovieProfile />} />
          <Route path="/movies-table" render={() => <MoviesTable />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
