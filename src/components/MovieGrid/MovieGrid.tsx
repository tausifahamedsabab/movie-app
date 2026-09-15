import type { IMovie } from "../../types/movie";
import MovieCard from "../MovieCard/MovieCard";

interface MovieGridProps {
  movies: IMovie[];
}

const MovieGrid = ({ movies }: MovieGridProps) => {
  if (movies.length === 0) {
    return (
      <div
        className="
          flex min-h-[300px]
          items-center
          justify-center

          rounded-2xl
          border border-white/[0.06]
          bg-white/[0.02]
        "
      >
        <div className="text-center">
          <div className="mb-3 text-4xl">🎬</div>

          <p className="text-sm font-medium text-zinc-400">No movies found</p>

          <p className="mt-1 text-xs text-zinc-700">
            Try searching for something else.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-2
        gap-4

        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
        xl:grid-cols-6

        2xl:grid-cols-7
      "
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;
