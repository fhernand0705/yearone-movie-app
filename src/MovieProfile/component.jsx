import * as React from 'react';
import { useParams } from 'react-router-dom';
import { getMovie } from '../movieService';
import { 
    FaRegThumbsUp, 
    FaThumbsUp, 
    FaRegThumbsDown, 
    FaThumbsDown } 
from 'react-icons/fa';

import ErrorMessage from '../ErrorMessage/component';

const Profile = () => {
    const [movie, setMovie] = React.useState({});
    const [thumbsUp, setThumbsUp] = React.useState(false);
    const [thumbsDown, setThumbsDown] = React.useState(false);
    const [thumbsUpCount, setThumbsUpCount] = React.useState(0);
    const [thumbsDownCount, setThumbsDownCount] = React.useState(0);
    const [error, setError] = React.useState('');
    
    const { id } = useParams();
    const styles = { outline: "none" }

    React.useEffect(() => {
        let isMounted = true; 
        const fetchMovie = async () => {
            try {
                const { data } = await getMovie(id);
                const localMovie = JSON.parse(localStorage.getItem('movie'));
                
                if (isMounted) {
                    if (localMovie && localMovie.imdbID === data.imdbID) {
                        setMovie(localMovie)
                        storeLocalMovieThumbsCount(localMovie.Title) 
                    } else {
                        setMovie(data);
                        localStorage.setItem('movie', JSON.stringify(data));
                        storeLocalMovieThumbsCount(data.Title)
                    }
                } 
                
                return null;

            } catch(err) {
                if (err) setError(err.message)
            } 
        }

        fetchMovie();

        return () => isMounted = false; 
    }, [id])

    const storeLocalMovieThumbsCount = (movieTitle) => {
        let localMovieCounts = JSON.parse(
            localStorage.getItem(movieTitle)
        )

        if (localMovieCounts) {
            setThumbsDownCount(localMovieCounts.down)
            setThumbsUpCount(localMovieCounts.up)
        }
    }

    const currentMovieCount = JSON.parse(localStorage.getItem(movie.Title));
    
    const storeNewMovieThumbsCount = (thumbs, setThumbsCount, direction) => {
        if (thumbs && currentMovieCount) {            
            localStorage.setItem(
                movie.Title, 
                JSON.stringify({...currentMovieCount, [direction]: currentMovieCount[direction] - 1})
            )
            setThumbsCount(count => count - 1) 
        } 

        if (!thumbs) {
            if (currentMovieCount) {
                localStorage.setItem(
                    movie.Title, 
                    JSON.stringify({
                        ...currentMovieCount, 
                        [direction]: (currentMovieCount[direction] || 0) + 1 
                    })
                )
                setThumbsCount(count => count + 1) 
            } else {
                localStorage.setItem(movie.Title, JSON.stringify({ [direction]: 1 }))
            }
        }
    }

    const handleThumbsUp = () => {
        setThumbsUp(up => !up);
        storeNewMovieThumbsCount(thumbsUp, setThumbsUpCount, "up")    
    }

    const handleThumbsDown = () => {
        setThumbsDown(down => !down);
        storeNewMovieThumbsCount(thumbsDown, setThumbsDownCount, "down")    
    }

    const renderThumbsUp = () => {
        const thumbsUpDefault = <FaRegThumbsUp data-testid="thumbs-up-default" />
        const thumbsUpFilled = <FaThumbsUp data-testid="thumbs-up-filled" />
        
        if (thumbsUpCount > 0 && !thumbsUp) setThumbsUp(true);
        
        return !thumbsUp ? thumbsUpDefault : thumbsUpFilled;
    }

    const renderThumbsDown = () => {
        const thumbsDownDefault = <FaRegThumbsDown data-testid="thumbs-down-default" />
        const thumbsDownFilled = <FaThumbsDown data-testid="thumbs-down-filled" />
        
        if (thumbsDownCount > 0 && !thumbsDown) setThumbsDown(true);
        
        return !thumbsDown ? thumbsDownDefault : thumbsDownFilled;
    }

    const disabled = true; 

    return (
            <div data-testid="profile-component" className="my-32">
                <div data-testid="movie-details" className="flex justify-center my-10">
                    {movie && !error &&
                        <>
                            <img 
                                src={movie.Poster} 
                                alt={`${movie.Poster}'s poster`} 
                                className="rounded-lg mx-5"
                            />
                            <section className="flex flex-col w-max">
                                <div className="
                                    text-indigo-500 
                                    text-xl 
                                    flex 
                                    my-5 
                                    uppercase"
                                >
                                    {movie.Title} 
                                    <button 
                                        type="button" 
                                        data-testid="thumbs-up-button"
                                        className="mx-5 my-1 text-lg" 
                                        style={styles}
                                        disabled={thumbsDown && disabled} 
                                        onClick={() => handleThumbsUp()}
                                    >
                                        {renderThumbsUp()}
                                    </button>
                                    <button 
                                        type="button" 
                                        data-testid="thumbs-down-button"
                                        className="mx-5 my-1 text-lg"
                                        style={styles} 
                                        disabled={thumbsUp && disabled} 
                                        onClick={() => handleThumbsDown()}
                                    >
                                        {renderThumbsDown()}
                                    </button>
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
