import { useState } from 'react'
import { useQuery, useMutation } from "react-query";
import { getMovieComments, getMovieDetails, getMovies, createMovieComment, deleteMovieComment } from "../movie.service";

export const useMovies = () => {
    const [page, setPage] = useState(1);

    const query = useQuery(["movies", page], () => getMovies(page), {
        staleTime: 300000
    })

    return {
        ...query,
        page,
        setPage
    };
};

export const useMovieDetails = (movieId) => {
    return useQuery(["movieDetails", movieId], () => getMovieDetails(movieId), {
        staleTime: 300000
    })
}

export const useMovieComments = (movieId) => {
    return useQuery(["movieComments", movieId], () => getMovieComments(movieId), {
        refetchInterval: 1000
    })
}

export const useDeleteMovieCommentMutation = () => {
    return useMutation(({commentId, token}) => deleteMovieComment(commentId, token))
}

export const useCreateMovieComment = () => {
    return useMutation(({data, token}) => {
        data.rating = +data.rating
        createMovieComment(data, token)
    })
}