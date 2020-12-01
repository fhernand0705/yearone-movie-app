import * as React from 'react';
import { useParams } from 'react-router-dom';
import { getMovie } from '../movieService';
import { 
    FaRegThumbsUp, 
    FaThumbsUp, 
    FaRegThumbsDown, 
    FaThumbsDown } 
from 'react-icons/fa';
//import './style.css';

import ErrorMessage from '../ErrorMessage/component';

const Profile = () => {
    const [movie, setMovie] = React.useState({});
    const [thumbsUp, setThumbsUp] = React.useState(false);
    const [thumbsDown, setThumbsDown] = React.useState(false);
    const [error, setError] = React.useState('');
    
    const { id } = useParams();
    const data = localStorage.getItem(movie.Title);
    const currentMovieCount = JSON.parse(data);

    const styles = {
        outline: "none"
    }

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

        // if (thumbsUp && currentMovieCount) {            
        //     localStorage.setItem(
        //         movie.Title, 
        //         JSON.stringify({up: currentMovieCount['up'] - 1})
        //     ) 
        // } 

        // if (!thumbsUp) {
        //     if (currentMovieCount) {
        //         localStorage.setItem(
        //             movie.Title, 
        //             JSON.stringify({up: currentMovieCount['up'] + 1 })
        //         )
        //     } else {
        //         localStorage.setItem(movie.Title, JSON.stringify({up: 1}))
        //     }
        // }    
    }

    const handleThumbsDown = () => {
        setThumbsDown(down => !down);

        // if (thumbsDown && currentMovieCount) {            
        //     sessionStorage.setItem(movie.Title, currentMovieCount - 1) 
        // } else {
        //     sessionStorage.removeItem(movie.Title)
        // }

        // if (!thumbsDown) {
        //     if (currentMovieCount) {
        //         localStorage.setItem(
        //             movie.Title, 
        //             JSON.stringify({down: currentMovieCount['down'] + 1 })
        //         )
        //     } else {
        //         localStorage.setItem(movie.Title, JSON.stringify({down: 1}))
        //     }
        // }    
    }

    const renderThumbsUp = () => {
        const thumbsUpDefault = <FaRegThumbsUp data-testid="thumbs-up-default" />
        const thumbsUpFilled = <FaThumbsUp data-testid="thumbs-up-filled" />
        
        if (currentMovieCount && !thumbsUp && !thumbsDown) setThumbsUp(true);
        
        return !thumbsUp ? thumbsUpDefault : thumbsUpFilled;
    }

    const renderThumbsDown = () => {
        const thumbsDownDefault = <FaRegThumbsDown 
                                    data-testid="thumbs-down-default"
                                  />
        const thumbsDownFilled = <FaThumbsDown 
                                    data-testid="thumbs-down-filled"
                                  />
        
        if (currentMovieCount && !thumbsDown && !thumbsUp) setThumbsDown(true);
        
        return !thumbsDown ? thumbsDownDefault : thumbsDownFilled;
    }

    const disabled = true; 

    return (
            <div data-testid="profile-component" className="my-32">
                <div data-testid="movie-details" className="flex justify-center my-10">
                    {movie && 
                        <>
                            <img src={movie.Poster} alt={`${movie.Poster}'s poster`} className="rounded-lg mx-5"/>
                            <section className="flex flex-col w-max">
                                <div className="text-indigo-500 text-xl flex my-5 uppercase">
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
