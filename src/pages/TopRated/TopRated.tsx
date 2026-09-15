import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import type { IMovie } from "../../types/movie";
import { getTopRatedMovies } from "../../services/movieApi";
import MovieGrid from "../../components/MovieGrid/MovieGrid";
import Loading from "../../components/Loading/Loading";

const TopRated = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const data = await getTopRatedMovies();
        setMovies(data);
      } catch {
        setError("Failed to load top rated movies");
      } finally {
        setLoading(false);
      }
    };

    fetchTopRatedMovies();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="mb-3 flex items-center gap-2">
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-yellow-500/10
                text-yellow-400
              "
            >
              <Star size={19} fill="currentColor" />
            </div>

            <span
              className="
                text-[11px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-yellow-400
              "
            >
              Highly Rated
            </span>
          </div>

          <h1
            className="
              text-3xl
              font-black
              tracking-tight
              text-white

              sm:text-4xl
            "
          >
            Top Rated Movies
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-600">
            Explore movies with some of the highest audience ratings.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-7 flex items-center gap-3">
          <span
            className="
              rounded-lg
              border
              border-white/[0.06]
              bg-white/[0.03]
              px-3
              py-1.5
              text-xs
              text-zinc-500
            "
          >
            {movies.length} movies
          </span>

          <span className="h-1 w-1 rounded-full bg-zinc-700" />

          <span className="flex items-center gap-1.5 text-xs text-zinc-600">
            <Star size={13} />
            Highest rated
          </span>
        </div>

        {/* Movie Grid */}
        <MovieGrid movies={movies} />
      </div>
    </div>
  );
};

export default TopRated;
