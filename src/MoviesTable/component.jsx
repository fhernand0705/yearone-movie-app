import * as React from 'react';

const MoviesTable = () => {
    const [storedMovies, setStoredMovies] = React.useState([])

    React.useEffect(() => getStoredMovies(), [storedMovies])

    const getStoredMovies = () => {
        let i = 0;
        const movies = [];

        while (i < localStorage.length) {
            movies.push({
                title: localStorage.key(i),
                count: localStorage.getItem(localStorage.key(i))
            })
            i++
        }
        setStoredMovies(movies)
    }

    const renderMovies = () => {
        return (
            storedMovies.filter(movie => {
                return movie.count > 0
            }).map(movie => <div>{movie.title}: {movie.count}</div>)
        )
    }

    return (
        <div data-testid="movies-table-component">{renderMovies()}</div>
    )
}

export default MoviesTable; 