import * as React from 'react';
import { BsArrowBarLeft } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';

const MoviesTable = () => {
    const [storedMovies, setStoredMovies] = React.useState([]);
    const history = useHistory();

    const styles = { outline: "none" };

    React.useEffect(() => {
        getStoredMovies();
    }, [])

    const getStoredMovies = () => {
        let i = 0;
        let localKey; 
        let count; 
        const movies = [];

        while (i < localStorage.length) {
            localKey = localStorage.key(i);
            count = JSON.parse(localStorage.getItem(localKey));

            if ((localKey !== "storedMovies" && localKey !== "movie") && count) {
                movies.push({
                    title: localKey,
                    up: count.up || 0,
                    down: count.down || 0
                })
            }
            i++
        }

        setStoredMovies(movies)
    }

    const renderMovies = () => {
        return (
            storedMovies
                .filter(({up, down}) => {
                    return up > 0 || down > 0;
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
                                    {movie.up}
                            </td>
                            <td className="
                                text-gray-600 
                                border-4 
                                border-indigo-800 
                                border-opacity-50 
                                text-center">
                                    {movie.down}
                            </td>
                        </tr>
                    )        
                })
            )
    }

    return (
        <>
            <button 
                data-testid="back-button"
                style={styles}
                className="flex text-xl text-gray-500 mt-32 mx-10 hover:text-indigo-500" 
                onClick={() => history.goBack() }
            >
                <BsArrowBarLeft />    
                <span className="text-lg">Back</span>
            </button>

            {storedMovies.length ?
                <div 
                    data-testid="movies-table-component" 
                    className="flex flex-col items-center mt-8"
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
                                <th className="
                                    text-gray-700 
                                    border-4 
                                    border-indigo-800 
                                    border-opacity-75"
                                >
                                    Thumbs Down Count
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderMovies()}
                        </tbody>
                    </table>    
                </div> 
            : 
            <div 
                data-testid="no-data-message" 
                className="text-center text-lg my-36 text-gray-600"
            >
                Movie data is currently not available...
            </div>
        }
        </> 
    )
}

export default MoviesTable; 