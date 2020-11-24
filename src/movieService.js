import axios from 'axios'; 
import { apiKey } from './apiKey';

export const getMovies = (query) => {
    return axios.get(`http://www.omdbapii.com/?s=${query}&apikey=${apiKey}&page=1`)
}

export const getMovie = (id) => {
    return axios.get(`http://www.omdbapi.com/?i=${id}&apikey=${apiKey}`)
}