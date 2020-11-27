import * as React from 'react';
import { useParams } from 'react-router-dom';
import { getMovie } from '../movieService';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';

import ErrorMessage from '../ErrorMessage/component';

const Profile = () => {
    const [movie, setMovie] = React.useState({});
    const [thumbsUp, setThumbsUp] = React.useState(false);
    const [error, setError] = React.useState('');
    
    const { id } = useParams();
    const currentMovieUpCount = +localStorage.getItem(movie.Title);

    React.useEffect(() => {
        let isMounted = true; 
        const fetchMovie = async () => {
            try {
                const { data } = await getMovie(id);
                if (isMounted) setMovie(data);
    
                return null;
            } catch(err) {
                if (err) setError(err.message)
            } 
        }

        fetchMovie();

        return () => isMounted = false; 
    }, [id])

    const handleThumbsUp = () => {
        setThumbsUp(up => !up);

        if (thumbsUp && currentMovieUpCount) {            
            localStorage.setItem(movie.Title, currentMovieUpCount - 1) 
        } else {
            localStorage.removeItem(movie.Title)
        }

        if (!thumbsUp) {
            if (currentMovieUpCount) {
                localStorage.setItem(movie.Title, currentMovieUpCount + 1)
            } else {
                localStorage.setItem(movie.Title, +"1")
            }
        }    
    }

    const renderThumbsUp = () => {
        const thumbsUpClear = <FaRegThumbsUp 
                                    data-testid="thumbs-up-clear"
                                    onClick={() => handleThumbsUp()}    
                              />
        const thumbsUpFilled = <FaThumbsUp 
                                    data-testid="thumbs-up-filled"
                                    onClick={() => handleThumbsUp()}    
                               />
        
        if (currentMovieUpCount && !thumbsUp) setThumbsUp(true);
        
        return !thumbsUp ? thumbsUpClear : thumbsUpFilled;
    }

    return (
            <div data-testid="profile-component" className="my-32">
                <div data-testid="movie-details" className="flex justify-center my-10">
                    {movie && 
                        <>
                            <img src={movie.Poster} alt={`${movie.Poster}'s poster`} className="rounded-lg mx-5"/>
                            <section className="flex flex-col w-max">
                                <div className="text-indigo-500 text-xl flex my-5 uppercase">
                                    {movie.Title} 
                                    <span className="mx-5 my-1 text-lg">
                                        {renderThumbsUp()}
                                    </span>
                                </div>
                                <div className="text-gray-600 leading-relaxed">
                                    <div>{movie.Director}</div>
                                    <div>{movie.Year}</div>
                                    <div>{movie.Genre}</div>
                                    <div>{`imdbRating: ${movie.imdbRating}`}</div>
                                    <div className="w-80 max-w-7xl my-5">{movie.Plot}</div>
                                </div>
                            </section>
                        </>
                    }
                </div>
                {error && <ErrorMessage error={error} />}
            </div>
        )
}

export default Profile; 
