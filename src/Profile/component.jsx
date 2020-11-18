import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovie } from '../services/apiService';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';

const Profile = () => {
    const [movie, setMovie] = useState({})
    const [thumbsUp, setThumbsUp] = useState(false)
    const [counter, setCounter] = useState(0)
    // define state for network errors
    const { id } = useParams();

    useEffect(() => {
        let isMounted = true; 
        const fetchMovie = async () => {
            const { data } = await getMovie(id);
            if (isMounted) setMovie(data);

            return null; 
        }

        fetchMovie()

        return () => isMounted = false; 
    }, [id])

    const handleThumbsUp = () => {
        setThumbsUp(up => !up);

        if (counter) setCounter(counter => counter - 1)
            else setCounter(counter => counter + 1)
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
        
        return !thumbsUp ? thumbsUpClear : thumbsUpFilled;
    }

    return (
            <div data-testid="profile-component">
                <div data-testid="movie-details">
                    {movie && 
                        <>  
                            <span>{renderThumbsUp()}</span>
                            <div data-testid="counter">{counter}</div>
                            <div>{movie.Title}</div>
                            <div>{movie.Year}</div>
                        </>
                    }
                </div>
            </div>
        )
}

export default Profile; 
