import * as React from 'react';
import { getMovies } from '../movieService';

import MovieListItem from './MovieListItem/component';
import MovieSearchForm from './MovieSearchForm/component'
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
            <MovieSearchForm 
                handleSubmit={handleSubmit} 
                inputValue={inputValue} 
                setInputValue={setInputValue}
            />

            <div data-testid="movies-container" className="grid grid-cols-3 gap-4 m-5">
                {movies && !error && movies.map(renderMovieListItem)}
            </div>

            {error && <ErrorMessage error={error}/> }
        </div>
    )
}

export default MovieList; 

