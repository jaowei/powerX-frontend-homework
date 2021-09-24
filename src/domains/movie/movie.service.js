import { fetchJson } from '../../lib/fetch-json'
import { BASE_URL } from "../../const";

export const getMovies = (page) => 
    fetchJson(`${BASE_URL}/movie?page=${page}&limit=6`);

export const getMovieDetails = (movieId) => 
    fetchJson(`${BASE_URL}/movie/movie/${movieId}`);

export const getMovieComments = (movieId) => 
    fetchJson(`${BASE_URL}/movie/movie/${movieId}/comment`);

export const createMovieComment = (data, token) => {
    return (fetch(`${BASE_URL}/movie/comment`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    }))
}

export const deleteMovieComment = (commentId, token) => 
    fetch(`${BASE_URL}/movie/comment/${commentId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });