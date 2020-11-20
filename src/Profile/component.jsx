import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getMovie } from '../movieService';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';

const Profile = () => {
    const [movie, setMovie] = useState({})
    const [thumbsUp, setThumbsUp] = useState(false)
    const [error, setError] = useState('')
    const { id } = useParams();
    const history = useHistory()
    const currentMovieUpCount = +localStorage.getItem(movie.Title)

    useEffect(() => {
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

        fetchMovie()

        return () => isMounted = false; 
    }, [id])


    const handleThumbsUp = () => {
        setThumbsUp(up => !up);

        if (thumbsUp) {            
            if (currentMovieUpCount) {
                localStorage.setItem(movie.Title, currentMovieUpCount - 1)
            } 
        } 

        if (!thumbsUp) {
            if (currentMovieUpCount) {
                localStorage.setItem(movie.Title, currentMovieUpCount + 1)
            } else {
                localStorage.setItem(movie.Title, +"1")
            }
        }    
    }

    const renderCount = () => {
        const localCount = localStorage.getItem(movie.Title)
        return localCount ? <div>{movie.Title}: {localCount}</div> : 0;
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
        
        if (currentMovieUpCount && !thumbsUp) {
            setThumbsUp(true)
        }
        
        return !thumbsUp ? thumbsUpClear : thumbsUpFilled;
    }

    return (
            <div data-testid="profile-component">
                <button onClick={() => history.push('/')}>Back</button>
                <div data-testid="movie-details">
                    {movie && 
                        <>  
                            <span>{renderThumbsUp()}</span>
                            <div data-testid="count">{thumbsUp ? renderCount() : null}</div>
                        
                            <div>{movie.Title}</div>
                            <div>{movie.Year}</div>
                        </>
                    }
                </div>
                {error && <div data-testid="error-message">{error}</div>}
            </div>
        )
}

export default Profile; 
