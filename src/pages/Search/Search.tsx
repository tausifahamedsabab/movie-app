import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search as SearchIcon, Film } from "lucide-react";

import type { IMovie } from "../../types/movie";
import { searchMovies } from "../../services/movieApi";
import MovieGrid from "../../components/MovieGrid/MovieGrid";
import Loading from "../../components/Loading/Loading";

const Search = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query")?.trim() ?? "";

  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setMovies([]);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await searchMovies(query);

        setMovies(data);
      } catch {
        setError("Failed to search movies");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

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
          <div className="mb-4 flex items-center gap-3">
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                border
                border-red-500/10
                bg-red-500/10
                text-red-400
              "
            >
              <SearchIcon size={21} />
            </div>

            <span
              className="
                text-[11px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-red-400
              "
            >
              Movie Search
            </span>
          </div>

          {query ? (
            <>
              <h1
                className="
                  text-3xl
                  font-black
                  tracking-tight
                  text-white
                  sm:text-4xl
                "
              >
                Search Results
              </h1>

              <p className="mt-3 text-sm text-zinc-600 sm:text-base">
                Showing results for{" "}
                <span className="font-semibold text-zinc-300">"{query}"</span>
              </p>
            </>
          ) : (
            <>
              <h1
                className="
                  text-3xl
                  font-black
                  tracking-tight
                  text-white
                  sm:text-4xl
                "
              >
                Search Movies
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-600 sm:text-base">
                Search for your favorite movies using the search bar above.
              </p>
            </>
          )}
        </div>

        {/* No query */}
        {!query && (
          <div
            className="
              flex
              min-h-[350px]
              flex-col
              items-center
              justify-center

              rounded-3xl
              border
              border-white/[0.06]
              bg-white/[0.02]

              px-6
              text-center
            "
          >
            <div
              className="
                mb-5
                flex
                h-16
                w-16
                items-center
                justify-center

                rounded-2xl
                bg-red-500/10
                text-red-400
              "
            >
              <SearchIcon size={28} />
            </div>

            <h2 className="text-xl font-bold text-white">
              What are you looking for?
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-zinc-600">
              Enter a movie name in the search bar to discover movies and
              explore their details.
            </p>
          </div>
        )}

        {/* Results */}
        {query && movies.length > 0 && (
          <>
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
                {movies.length} results
              </span>

              <span className="h-1 w-1 rounded-full bg-zinc-700" />

              <span className="text-xs text-zinc-600">
                Movies matching your search
              </span>
            </div>

            <MovieGrid movies={movies} />
          </>
        )}

        {/* No results */}
        {query && movies.length === 0 && (
          <div
            className="
              flex
              min-h-[350px]
              flex-col
              items-center
              justify-center

              rounded-3xl
              border
              border-white/[0.06]
              bg-white/[0.02]

              px-6
              text-center
            "
          >
            <div
              className="
                mb-5
                flex
                h-16
                w-16
                items-center
                justify-center

                rounded-2xl
                bg-white/[0.04]
                text-zinc-600
              "
            >
              <Film size={28} />
            </div>

            <h2 className="text-xl font-bold text-white">No movies found</h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-zinc-600">
              We couldn't find any movies matching{" "}
              <span className="text-zinc-400">"{query}"</span>. Try searching
              with a different title.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
