import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMovies } from '../movieService';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [movies, setMovies] = useState([]);
    const [localMovies, setLocalMovies] = useState([])
    const [error, setError] = useState('');

    useEffect(() => {
        let isMounted = true;

        const fetchMovies = async () => {
            try {
                const storedMovies = localStorage.getItem("storedMovies");
                
                if (storedMovies && !searchQuery) {
                    setMovies(JSON.parse(storedMovies))
                } else {
                    if (isMounted) {
                        const { data } = await getMovies(searchQuery)
                        localStorage.setItem("storedMovies", JSON.stringify(data.Search))
                        setMovies(data.Search)  
                    } 
                }
                
                return null;
            } catch (err) {
                if (err) setError(err.message)
            }    
        }   
        
        fetchMovies();
        renderLocalCount();

        return () => isMounted = false; 

    }, [searchQuery])


    const handleSubmit = (e) => {
        e.preventDefault()

        setSearchQuery(inputValue)
        setInputValue('')
    }

    function renderLocalCount() {
        let i = 0;
        const movieTitles = [];

        while (i < localStorage.length) {
            movieTitles.push({
                title: localStorage.key(i),
                count: localStorage.getItem(localStorage.key(i))
            })
            i++
        }

        setLocalMovies(movieTitles)
    }
    
    const renderCount = () => {
        return (
            localMovies.filter(movie => {
                return movie.count > 0
            }).map(movie => <li>{movie.title}: {movie.count}</li>)
        )
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
            <div>
                {renderCount()}
            </div>
            
            <div data-testid="movies-container">
                {movies && movies.map(({ Title, Year, imdbID: id }, i) => 
                    <ul key={id}>
                        <Link to={`/profile/${id}`}>
                            <li key={id}>{Title}</li> 
                        </Link> 
                        <li key={id}>{Year}</li>
                    </ul>
                )}
            </div>
            
            {error && <div data-testid="error-message">{error}</div>}
        </div>
    )
}

export default Search; 

