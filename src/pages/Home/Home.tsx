import { useEffect, useState } from "react";
import type { IMovie } from "../../types/movie";
import { getPopularMovies } from "../../services/movieApi";
import MovieGrid from "../../components/MovieGrid/MovieGrid";
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
    return <h2 className="p-6 text-red-400">{error}</h2>;
  }

  return (
    <main className="min-h-screen bg-black px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Popular Movies</h1>

            <p className="mt-1 text-sm text-gray-500">
              Showing {movies.length} movies
            </p>
          </div>
        </div>

        <MovieGrid movies={movies} />

        {/* See More */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleSeeMore}
            disabled={loadingMore}
            className="rounded-xl bg-red-600 px-8 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loadingMore ? "Loading..." : "See More"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
