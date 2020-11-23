import React from 'react';
import { Route, Switch, BrowserRouter as Router, Link } from 'react-router-dom';

import Search from '../Search/component';
import MovieProfile from '../MovieProfile/component';
import MoviesTable from '../MoviesTable/component'

function App() {
  return (
    <div data-testid="app-component">
      <Router data-testid="react-router">
        {/* extract navbar to a new component */}
        <nav className="flex justify-center m-2 space-x-6">
          <Link to="/" className="p-2 text-gray-800 hover:text-gray-400">Search</Link>
          <Link to="/movies-table" className="p-2 text-gray-800 hover:text-gray-400">Movies Table</Link>
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
