import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovie } from '../services/apiService';

const Profile = () => {
    const [movie, setMovie] = useState({})
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

    return (
        <div data-testid="profile-component">
            <div data-testid="movie-details">
                {movie && 
                    <>
                        <div>{movie.Title}</div>
                        <div>{movie.Year}</div>
                    </>
                }
            </div>
        </div>
    )
}

export default Profile; 
