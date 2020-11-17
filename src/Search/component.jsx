import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiKey } from '../apiKey';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        let isMounted = true;

        const fetchMovie = async () => {
            try {
                    const { data } = await axios.get(
                        `http://www.omdbapi.com/?s=${searchQuery}&apikey=${apiKey}&page=1`
                    )
                    
                    if (isMounted) setMovies(data.Search)
                    
                    return null;
            } catch (err) {
                if (err) setError(err.message)
            }    
        }
        
        fetchMovie();

        return () => isMounted = false; 

    }, [searchQuery])

    const handleSubmit = (e) => {
        e.preventDefault()

        setSearchQuery(inputValue)
        setInputValue('')
    }

    return (
        <div data-testid="search-component">
            <form onSubmit={handleSubmit} data-testid="form">
                <input 
                    type="text" 
                    value={inputValue} 
                    data-testid="input-field"
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit" data-testid="submit-button">
                    Search
                </button>
            </form>
           
            <div data-testid="movies-container">
                {movies && movies.map(({ Title }) => 
                   <li key={Title}>{Title}</li> 

                )}
            </div>
            {error && <div data-testid="error-message">{error}</div>}
        </div>
    )
}

export default Search; 

