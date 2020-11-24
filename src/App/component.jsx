import React from 'react';
import { Route, Switch, BrowserRouter as Router, Link } from 'react-router-dom';
import './style.css'; 
import { AiOutlineSearch } from 'react-icons/ai';
import { BiData } from 'react-icons/bi';

import Search from '../Search/component';
import MovieProfile from '../MovieProfile/component';
import MoviesTable from '../MoviesTable/component'

function App() {
  return (
    <div data-testid="app-component" className="bg-gray-50 h-screen">
      <Router data-testid="react-router">
        {/* extract navbar to a new component */}
        <nav className="nav-container h-28 flex justify-center space-x-6 absolute top-0 left-0 w-full">
          <Link to="/" className="p-2 text-gray-500 hover:text-indigo-400 h-10 flex">
            <AiOutlineSearch />
            Search Movies
          </Link>
          <Link to="/movies-table" className="flex p-2 text-gray-500 hover:text-indigo-400 h-10">
            <BiData />
            Movies Data Table
          </Link>
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
