import * as React from 'react';
import { Link } from 'react-router-dom';

const MovieListItem = ({ movie }) => {
    const { Title, Poster, Year, id } = movie; 

    return (
        <ul 
            key={id} 
            className="flex flex-col rounded-lg items-center"
        >
            <li key={id}>
                <img src={Poster} alt={`${Title}'s poster`} className="w-72 rounded-lg"/>
            </li>
            <div className="text-center my-3 w-72">
                <Link to={`/profile/${id}`}>
                    <li key={id} 
                        className="
                        text-base 
                        text-gray-500 
                        hover:text-indigo-500 
                        uppercase"
                    >
                        {Title}
                    </li> 
                </Link> 
                <li key={id} className="text-lg text-gray-600">{Year}</li>
            </div>
        </ul>
    )
}

export default MovieListItem;