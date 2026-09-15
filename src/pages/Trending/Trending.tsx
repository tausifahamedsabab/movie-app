import { useEffect, useState } from "react";
import { Flame } from "lucide-react";
import type { IMovie } from "../../types/movie";
import { getTrendingMovies } from "../../services/movieApi";
import MovieGrid from "../../components/MovieGrid/MovieGrid";
import Loading from "../../components/Loading/Loading";

const Trending = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const data = await getTrendingMovies();
        setMovies(data);
      } catch {
        setError("Failed to load trending movies");
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
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
                bg-orange-500/10
                text-orange-400
              "
            >
              <Flame size={19} />
            </div>

            <span
              className="
                text-[11px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-orange-400
              "
            >
              What's Hot
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
            Trending Movies
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-600">
            Discover the movies everyone is talking about right now.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-7 flex items-center gap-3">
          <span className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-500">
            {movies.length} movies
          </span>

          <span className="h-1 w-1 rounded-full bg-zinc-700" />

          <span className="text-xs text-zinc-600">Updated regularly</span>
        </div>

        {/* Movies */}
        <MovieGrid movies={movies} />
      </div>
    </div>
  );
};

export default Trending;
