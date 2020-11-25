import * as React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FiAlertCircle } from 'react-icons/fi';
import { getMovies } from '../movieService';

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
                    if (isMounted) {
                        const { data } = await getMovies(searchQuery);
                        localStorage.setItem(
                            "storedMovies", JSON.stringify(data.Search)
                        );
                        setMovies(data.Search);  
                    } 
                }
                
                return null;
            } catch (err) {
                if (err) setError(err.message);
            }    
        }   
        
        fetchMovies();

        return () => isMounted = false; 

    }, [searchQuery])


    const handleSubmit = (e) => {
        e.preventDefault();
        
        setSearchQuery(inputValue);
        setInputValue('');
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
                {/* extract movie details to new component */}
                {movies && !error && movies.map(({ Title, Year, imdbID: id, Poster }, i) => 
                    <ul 
                        key={id} 
                        className="
                            flex 
                            flex-col 
                            rounded-lg 
                            items-center"
                    >
                        <li>
                            <img 
                                src={Poster} 
                                alt={`${Title}'s poster`} 
                                className="w-72 rounded-lg"
                            />
                        </li>
                        <div className="text-center my-3 w-72">
                            <Link to={`/profile/${id}`}>
                                <li 
                                    key={id} 
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
                )}
            </div>
            {error && 
                <div data-testid="error-message-container" className="flex justifty-center my-20">
                    <div className="
                        flex 
                        text-red-400 
                        text-xl 
                        bg-red-200 
                        border-solid 
                        border-4 
                        border-red-500 
                        border-opacity-25 
                        rounded-lg 
                        space-x-1 
                        p-4">
                        <span><FiAlertCircle /></span>
                        <span>{`${error}. Try again later!`}</span>
                    </div>
                </div>
            }
        </div>
    )
}

export default MovieList; 

