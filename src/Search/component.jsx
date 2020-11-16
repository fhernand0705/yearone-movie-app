import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiKey } from '../apiKey';

const Search = () => {
    const [query, setQuery] = useState('');
    const [movie, setMovie] = useState('');

    useEffect(() => {
        // use try/catch block
        let isMounted = true;
        const fetchMovie = async () => {
            const response = await axios.get(`http://www.omdbapi.com/?t=${query}&apikey=${apiKey}`)
            
            if (isMounted) setMovie(response.data.Title)
            
            return null;
        }
        
        handleSubmit(fetchMovie)
        
        return () => isMounted = false; 

    }, [query])

    const handleSubmit = (fetchMovie) => fetchMovie()

    return (
        <div data-testid="search-component">
            <input 
                type="text" 
                value={query} 
                data-testid="input-field"
                onChange={(e) => setQuery(e.target.value)}
            />
            <button 
                data-testid="submit-button"
                onClick={() => handleSubmit()}
                >
                Search
            </button>
            <div data-testid="movie-title">{movie}</div>
        </div>
    )
}

export default Search; 

