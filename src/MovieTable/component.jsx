import * as React from 'react';

const MoviesTable = () => {
    const [storedMovies, setStoredMovies] = React.useState([])

    React.useEffect(() => {
        getStoredMovies();
    }, [])

    const getStoredMovies = () => {
        let i = 0;
        let localKey; 
        const movies = [];

        while (i < localStorage.length) {
            localKey = localStorage.key(i)

            if (localKey !== "storedMovies") {
                movies.push({
                    title: localKey,
                    count: localStorage.getItem(localKey)
                })
            }
            i++
        }
        setStoredMovies(movies)
    }

    const renderMovies = () => {
        return (
            storedMovies
                .filter(({count}) => {
                return count > 0
                })
                .map(movie => {
                    return (
                        <tr>
                            <td className="
                                text-gray-600 
                                border-4 
                                border-indigo-800 
                                border-opacity-50 
                                p-1">
                                    {movie.title}
                            </td>
                            <td className="
                                text-gray-600 
                                border-4 
                                border-indigo-800 
                                border-opacity-50 
                                text-center">
                                    {movie.count}
                            </td>
                        </tr>
                    )        
                })
            )
    }

    return (
        <>
        {storedMovies.length ?
            <div 
                data-testid="movies-table-component" 
                className="flex justify-center my-36"
            >
                <table className="
                    border-4 
                    border-indigo-800 
                    border-opacity-25 
                    shadow-2xl"
                >
                        <thead className="bg-indigo-200">
                            <tr>
                                <th className="
                                    text-gray-700 
                                    border-4 
                                    border-indigo-800 
                                    border-opacity-75 
                                    text-left 
                                    p-1"
                                >
                                    Movie Title
                                </th>
                                <th className="
                                    text-gray-700 
                                    border-4 
                                    border-indigo-800 
                                    border-opacity-75"
                                >
                                    Thumbs Up Count
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderMovies()}
                        </tbody>
                    </table>    
            </div> 
        : 
        <div className="text-center text-lg my-36 text-gray-600">
            Movie data is currently not available...
        </div>
      }
        </> 
    )
}

export default MoviesTable; 