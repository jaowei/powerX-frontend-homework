import { MovieDetails } from "../domains/movie"
import { useParams } from "react-router-dom";

export const MovieDetailsPage = () => {
    const params = useParams()

    return <MovieDetails movieId={params.movieId} />;
}