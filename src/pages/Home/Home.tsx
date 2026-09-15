import { useEffect, useState } from "react";
import type { IMovie } from "../../types/movie";
import { getPopularMovies } from "../../services/movieApi";
import MovieGrid from "../../components/MovieGrid/MovieGrid";
import FeaturedHero from "../../components/FeaturedHero/FeaturedHero";
import Loading from "../../components/Loading/Loading";

const Home = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getPopularMovies(1);
        setMovies(data);
      } catch {
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleSeeMore = async () => {
    try {
      setLoadingMore(true);

      const nextPage = page + 1;

      const data = await getPopularMovies(nextPage);

      setMovies((previousMovies) => [...previousMovies, ...data]);

      setPage(nextPage);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingMore(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <h2 className="text-red-400">{error}</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
        {/* Hero */}
        {<FeaturedHero movies={movies} />}

        {/* Popular Movies Header */}
        <div className="mb-7 flex items-end justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-5 w-1 rounded-full bg-red-500" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">
                Discover
              </span>
            </div>

            <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
              Popular Movies
            </h2>

            <p className="mt-1 text-sm text-zinc-600">
              Showing {movies.length} movies
            </p>
          </div>
        </div>

        {/* Movie Grid */}
        <MovieGrid movies={movies} />

        {/* Load More */}
        <div className="flex justify-center py-14">
          <button
            onClick={handleSeeMore}
            disabled={loadingMore}
            className="
              rounded-xl
              border
              border-white/[0.08]

              bg-white/[0.04]

              px-8
              py-3

              text-sm
              font-semibold
              text-white

              transition

              hover:border-red-500/30
              hover:bg-red-500/10
              hover:text-red-400

              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {loadingMore ? "Loading..." : "Load More Movies"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
