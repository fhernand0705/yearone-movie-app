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
                const localMovie = JSON.parse(localStorage.getItem('movie'))
                const localMovieCounts = JSON.parse(
                    localStorage.getItem(localMovie.Title)
                )
                
                if (isMounted) {
                    if (localMovie) {
                        setMovie(localMovie);
                      
                        if (localMovieCounts) {
                            setThumbsUpCount(localMovieCounts.up)
                            setThumbsDownCount(localMovieCounts.down)
                        }

                    } else {
                        setMovie(data);
                        localStorage.setItem('movie', JSON.stringify(data));
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

    const currentMovieCount = JSON.parse(localStorage.getItem(movie.Title));
    
    // extract handleThumbsUp/down implementation into a separate function 
    const handleThumbsUp = () => {
        setThumbsUp(up => !up);

        if (thumbsUp && currentMovieCount) {            
            localStorage.setItem(
                movie.Title, 
                JSON.stringify({...currentMovieCount, up: currentMovieCount['up'] - 1})
            )
            setThumbsUpCount(upCount => upCount - 1) 
        } 

        if (!thumbsUp) {
            if (currentMovieCount) {
                localStorage.setItem(
                    movie.Title, 
                    JSON.stringify({
                        ...currentMovieCount, 
                        up: (currentMovieCount['up'] || 0) + 1 
                    })
                )
                setThumbsUpCount(upCount => upCount + 1) 
            } else {
                localStorage.setItem(movie.Title, JSON.stringify({ up: 1 }))
            }
        }    
    }

    const handleThumbsDown = () => {
        setThumbsDown(down => !down);

        if (thumbsDown && currentMovieCount) {            
            localStorage.setItem(
                movie.Title, 
                JSON.stringify({
                    ...currentMovieCount, down: currentMovieCount['down'] - 1
                })
            )
            setThumbsDownCount(downCount => downCount - 1); 
        } 

        if (!thumbsDown) {
            if (currentMovieCount) {
                localStorage.setItem(
                    movie.Title, 
                    JSON.stringify({
                        ...currentMovieCount, 
                        down: (currentMovieCount['down'] || 0) + 1 
                    })
                )
                setThumbsDownCount(downCount => downCount + 1);
            } else {
                localStorage.setItem(movie.Title, JSON.stringify({ down: 1 }))
            }
        }    
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
                    {movie && 
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
                                        className="mx-5 my-1 text-lg" 
                                        style={styles}
                                        disabled={thumbsDown && disabled} 
                                        onClick={() => handleThumbsUp()}
                                    >
                                        {renderThumbsUp()}
                                    </button>
                                    <button 
                                        type="button" 
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
