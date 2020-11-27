import * as React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { getMovies } from '../movieService';

import MovieListItem from './MovieListItem/component';
import ErrorMessage from '../ErrorMessage/component';

const MovieList = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [inputValue, setInputValue] = React.useState('');
    const [movies, setMovies] = React.useState([]);
    const [error, setError] = React.useState('');

    React.useEffect(() => {
        let isMounted = true;

        const fetchMovies = async () => {
            try {
                const storedMovies = localStorage.getItem("storedMovies");
                
                if (storedMovies && !searchQuery) {
                    setMovies(JSON.parse(storedMovies));
                } else {
                    if (isMounted && searchQuery) {
                        const { data } = await getMovies(searchQuery);
                        setMovies(data.Search); 

                        if (data.Search) {
                            localStorage.setItem(
                                "storedMovies", JSON.stringify(data.Search)
                            );
                        } 
                    } 
                }
                
                return null;
            } catch (err) {
                if (err) setError(err.message);
            }    
        }   
        
        fetchMovies(isMounted);

        return () => isMounted = false; 

    }, [searchQuery])


    const handleSubmit = (e) => {
        e.preventDefault();
        
        setSearchQuery(inputValue);
        setInputValue('');
    }

    const renderMovieListItem = (movie) => {
        return <MovieListItem movie={movie} />
    }

    return (
        <div data-testid="movie-list-component" className="my-28">
            <form 
                onSubmit={handleSubmit} 
                data-testid="form" 
                className="flex justify-center my-12"
            >
                <AiOutlineSearch className="text-2xl my-1 text-gray-400" />
                <input 
                    type="text" 
                    value={inputValue} 
                    data-testid="input-field"
                    onChange={(e) => setInputValue(e.target.value)}
                    className="
                        border 
                        border-opacity-5 
                        shadow-md 
                        rounded-lg mx-2 
                        border-opacity-25 
                        p-1 
                        w-60"
                    placeholder="Search movies..."
                />
                <button 
                    type="submit" 
                    data-testid="submit-button" 
                    className="
                        bg-indigo-500 
                        rounded-lg 
                        p-2 
                        text-gray-200 
                        hover:bg-indigo-700"
                >
                    Search
                </button>
            </form>
            <div data-testid="movies-container" className="grid grid-cols-3 gap-4 m-5">
                {movies && !error && movies.map(renderMovieListItem)}
            </div>

            {error && <ErrorMessage error={error}/> }
        </div>
    )
}

export default MovieList; 

