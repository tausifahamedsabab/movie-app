import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search as SearchIcon, Film, Sparkles } from "lucide-react";

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
        setError("");
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await searchMovies(query);

        setMovies(data);
      } catch (err) {
        console.error(err);
        setError("Failed to search movies.");
        setMovies([]);
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
      <div className="min-h-screen text-white">
        <div className="mx-auto flex min-h-[60vh] max-w-[1600px] items-center justify-center px-5">
          <div className="text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/10 bg-red-500/10 text-red-400">
              <SearchIcon size={27} />
            </div>

            <h2 className="text-xl font-bold text-white">
              Something went wrong
            </h2>

            <p className="mt-2 text-sm text-red-400">{error}</p>
          </div>
        </div>
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
                flex h-11 w-11
                items-center justify-center
                rounded-xl
                border border-red-500/10
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
                  lg:text-5xl
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
                  lg:text-5xl
                "
              >
                Search Movies
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-600 sm:text-base">
                Find movies, explore their details, and build your personal
                collection.
              </p>
            </>
          )}
        </div>

        {/* Empty search */}
        {!query && (
          <div
            className="
              relative
              flex min-h-[420px]
              flex-col
              items-center
              justify-center
              overflow-hidden
              rounded-3xl
              border border-white/[0.06]
              bg-white/[0.02]
              px-6
              text-center
            "
          >
            {/* Glow */}
            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                h-64
                w-64
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-red-600/[0.06]
                blur-[100px]
              "
            />

            <div
              className="
                relative
                mb-6
                flex h-20 w-20
                items-center justify-center
                rounded-2xl
                border border-white/[0.06]
                bg-white/[0.04]
                text-red-400
              "
            >
              <SearchIcon size={34} />
            </div>

            <h2 className="relative text-2xl font-black text-white">
              What are you looking for?
            </h2>

            <p className="relative mt-3 max-w-md text-sm leading-7 text-zinc-600">
              Search for a movie using the search bar above and discover your
              next favorite film.
            </p>

            <div className="relative mt-7 flex items-center gap-2 text-xs text-zinc-700">
              <Sparkles size={14} />
              <span>Try searching for a movie title</span>
            </div>
          </div>
        )}

        {/* Results */}
        {query && movies.length > 0 && (
          <>
            <div className="mb-7 flex flex-wrap items-center gap-3">
              <span
                className="
                  flex items-center gap-2
                  rounded-lg
                  border border-white/[0.06]
                  bg-white/[0.03]
                  px-3 py-1.5
                  text-xs
                  text-zinc-400
                "
              >
                <Film size={13} />
                {movies.length} {movies.length === 1 ? "movie" : "movies"}
              </span>

              <span className="h-1 w-1 rounded-full bg-zinc-700" />

              <span className="text-xs text-zinc-600">
                Matching your search
              </span>
            </div>

            <MovieGrid movies={movies} />
          </>
        )}

        {/* No results */}
        {query && movies.length === 0 && (
          <div
            className="
              relative
              flex min-h-[420px]
              flex-col
              items-center
              justify-center
              overflow-hidden
              rounded-3xl
              border border-white/[0.06]
              bg-white/[0.02]
              px-6
              text-center
            "
          >
            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                h-56
                w-56
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-white/[0.02]
                blur-[80px]
              "
            />

            <div
              className="
                relative
                mb-6
                flex h-20 w-20
                items-center justify-center
                rounded-2xl
                border border-white/[0.06]
                bg-white/[0.04]
                text-zinc-600
              "
            >
              <Film size={34} />
            </div>

            <h2 className="relative text-2xl font-black text-white">
              No movies found
            </h2>

            <p className="relative mt-3 max-w-md text-sm leading-7 text-zinc-600">
              We couldn't find any movies matching{" "}
              <span className="font-semibold text-zinc-400">"{query}"</span>.
            </p>

            <p className="relative mt-2 text-xs text-zinc-700">
              Try a different movie title.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
