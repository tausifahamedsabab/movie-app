import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { IMovie } from "../../types/movie";
import { getPopularMovies, searchMovies } from "../../services/movieApi";
import MovieGrid from "../../components/MovieGrid/MovieGrid";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryFromUrl = searchParams.get("query") || "";

  const [searchTerm, setSearchTerm] = useState(queryFromUrl);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [popularMovies, setPopularMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [popularLoading, setPopularLoading] = useState(true);

  // Load popular movies when Search page opens
  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const data = await getPopularMovies();
        setPopularMovies(data);
      } catch (error) {
        console.error(error);
      } finally {
        setPopularLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  // Search movies
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!queryFromUrl.trim()) {
        setMovies([]);
        return;
      }

      try {
        setLoading(true);

        const data = await searchMovies(queryFromUrl);

        setMovies(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [queryFromUrl]);

  const handleSearch = () => {
    const query = searchTerm.trim();

    if (!query) {
      setSearchParams({});
      return;
    }

    setSearchParams({ query });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen text-white">
      {/* Search Hero */}
      <section className="mb-10 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 via-gray-950 to-red-950/30 p-8 md:p-12">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-red-500">
          MovieHub Search
        </p>

        <h1 className="mb-3 text-4xl font-bold md:text-5xl">
          Find your next movie 🎬
        </h1>

        <p className="mb-8 max-w-2xl text-gray-400">
          Search thousands of movies and discover something worth watching
          tonight.
        </p>

        {/* Search Input */}
        <div className="flex w-full max-w-3xl">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for a movie..."
            className="min-w-0 flex-1 rounded-l-xl border border-gray-700 bg-gray-900 px-5 py-4 text-white outline-none placeholder:text-gray-500 focus:border-red-500"
          />

          <button
            onClick={handleSearch}
            className="rounded-r-xl bg-red-600 px-6 font-semibold transition hover:bg-red-700"
          >
            🔍 Search
          </button>
        </div>
      </section>

      {/* Search Results */}
      {queryFromUrl ? (
        <section>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Search Results</h2>

              <p className="mt-1 text-gray-500">Results for "{queryFromUrl}"</p>
            </div>

            <span className="rounded-full bg-gray-800 px-4 py-2 text-sm text-gray-300">
              {movies.length} movies
            </span>
          </div>

          {loading ? (
            <div className="py-20 text-center">
              <p className="text-lg text-gray-400">Searching movies...</p>
            </div>
          ) : movies.length > 0 ? (
            <MovieGrid movies={movies} />
          ) : (
            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 py-20 text-center">
              <div className="mb-4 text-5xl">😕</div>

              <h2 className="text-2xl font-bold">No movies found</h2>

              <p className="mt-2 text-gray-500">
                Try searching with a different movie title.
              </p>
            </div>
          )}
        </section>
      ) : (
        /* Empty Search State */
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Popular Movies 🔥</h2>

            <p className="mt-1 text-gray-500">
              Not sure what to search? Start with these.
            </p>
          </div>

          {popularLoading ? (
            <div className="py-20 text-center text-gray-400">
              Loading popular movies...
            </div>
          ) : (
            <MovieGrid movies={popularMovies} />
          )}
        </section>
      )}
    </div>
  );
};

export default Search;
