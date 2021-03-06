import * as React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const MovieListItem = ({ movie }) => {
    const { Title, Poster, Year, imdbID: id } = movie; 

    return (
        <div data-testid="list-item-component" className="container w-min">
            <li key={id} >
                <img 
                    src={Poster} 
                    alt={`${Title}'s poster`} 
                    className="w-44 md:w-64 rounded-lg"
                />
            </li>
            <div className="text-center my-3 w-44 md:w-64">
                <Link to={`/profile/${id}`}>
                    <li key={id} 
                        className="
                        text-xs
                        md:text-base 
                        text-gray-500 
                        hover:text-indigo-500 
                        uppercase"
                    >
                        {Title}
                    </li> 
                </Link> 
                <li key={id} className="text-sm md:text-lg text-gray-600">{Year}</li>
            </div>
        </div>    
    )
}

MovieListItem.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string,
        Poster: PropTypes.string,
        Year: PropTypes.string,
        imdbID: PropTypes.string
    }).isRequired
}

export default MovieListItem;