import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../services/movieApi";
import type { IMovie } from "../../types/movie";
import MovieCard from "../MovieCard/MovieCard";

function Search() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query") || "";

  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query.trim()) {
        setMovies([]);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const results = await searchMovies(query);

        setMovies(results);
      } catch {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-7xl mx-auto px-6 py-10">
        {/* Search Title */}
        <h1 className="text-3xl font-bold mb-8">Search Results</h1>

        {query && (
          <p className="text-gray-400 mb-8">
            Results for: <span className="text-white">{query}</span>
          </p>
        )}

        {/* Loading */}
        {loading && (
          <p className="text-center text-xl py-10">Searching movies... ⏳</p>
        )}

        {/* Error */}
        {error && <p className="text-center text-red-400 py-10">{error}</p>}

        {/* No Results */}
        {!loading && !error && query && movies.length === 0 && (
          <p className="text-center text-gray-400 py-10">No movies found.</p>
        )}

        {/* Movie Grid */}
        {!loading && movies.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Search;
