import { MovieItem, useMovies } from "../domains/movie";
import { Button } from "../components/button";

export const Movie = () => {
  const { data, isLoading, page, setPage } = useMovies();

  return (
    <div className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 sm:text-center">
          Movies
        </h1>
      </div>
      <div className="flex justify-between max-w-xl mx-auto mb-5">
        <Button
          disabled={page === 1}
          variant="primary"
          onClick={() => setPage(page - 1)}
        >
          Prev
        </Button>
        <Button onClick={() => setPage(page + 1)} variant="primary">
          Next
        </Button>
      </div>
      {data && (
        <div className="grid md:grid-cols-2 gap-x-4 gap-y-8 xl:grid-cols-3 xl:gap-x-6">
          {data.map((movie) => (
            <MovieItem
              key={movie._id}
              movieId={movie._id}
              title={movie.title}
              overview={movie.overview}
              imageUrl={movie.posterUrl}
              releaseDate={movie.releaseDate}
            />
          ))}
        </div>
      )}{" "}
      {isLoading && <div className="p-12 text-center text-3xl">Loading...</div>}
      <div className="flex justify-between max-w-xl mx-auto mt-5">
        <Button
          disabled={page === 1}
          variant="primary"
          onClick={() => setPage(page - 1)}
        >
          Prev
        </Button>
        <Button onClick={() => setPage(page + 1)} variant="primary">
          Next
        </Button>
      </div>
    </div>
  );
};
