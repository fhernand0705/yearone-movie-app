import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiKey } from '../apiKey';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [inputValue, setInputValue] = useState('')
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // use try/catch block
        let isMounted = true;
        const fetchMovie = async () => {
            const response = await axios.get(
                `http://www.omdbapi.com/?s=${searchQuery}&apikey=${apiKey}&page=1`
            )
            
            if (isMounted) setMovies(response.data.Search)
            
            return null;
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
                <button data-testid="submit-button">
                    Search
                </button>
            </form>
           
            <div data-testid="movie-title">
                {movies && movies.map(({Title, imdbID: id}) => 
                   <li key={id}>{Title}</li> 
                )}
            </div>
        </div>
    )
}

export default Search; 

