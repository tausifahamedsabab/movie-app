import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieDetails, getMovieTrailer } from "../../services/movieApi";
import type { IMovieDetails } from "../../types/movie";
import loadingImage from "../../assets/loading.png";

function MovieDetails() {
  const { id } = useParams<{ id: string }>();

  const [movie, setMovie] = useState<IMovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Trailer states
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerLoading, setTrailerLoading] = useState(false);

  // Fetch movie details
  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) {
        setError("Movie ID not found.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  // Fetch and open trailer
  const handleWatchTrailer = async () => {
    if (!id) return;

    try {
      setTrailerLoading(true);

      const trailer = await getMovieTrailer(id);

      if (!trailer) {
        alert("Trailer not available for this movie.");
        return;
      }

      setTrailerKey(trailer.key);
      setShowTrailer(true);
    } catch (err) {
      console.error(err);
      alert("Failed to load trailer.");
    } finally {
      setTrailerLoading(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <main className="h-screen w-screen bg-black flex items-center justify-center overflow-hidden">
        <img
          src={loadingImage}
          alt="Loading"
          className="w-screen h-screen object-contain"
        />
      </main>
    );
  }

  // Error
  if (error || !movie) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-5 px-5">
        <div className="text-6xl">🎬</div>

        <p className="text-red-400 text-xl text-center">
          {error || "Movie not found."}
        </p>

        <Link
          to="/"
          className="px-6 py-3 bg-red-600 rounded-lg hover:bg-red-700 transition"
        >
          ← Back Home
        </Link>
      </main>
    );
  }

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const releaseYear = movie.release_date
    ? movie.release_date.slice(0, 4)
    : "N/A";

  const runtimeHours = movie.runtime ? Math.floor(movie.runtime / 60) : 0;

  const runtimeMinutes = movie.runtime ? movie.runtime % 60 : 0;

  const runtimeText = movie.runtime
    ? `${runtimeHours}h ${runtimeMinutes}m`
    : "N/A";

  return (
    <main className="min-h-screen bg-black text-white">
      {/* ================= HERO ================= */}
      <section className="relative min-h-[750px] overflow-hidden">
        {/* Backdrop */}
        {backdropUrl && (
          <>
            <img
              src={backdropUrl}
              alt=""
              className="absolute inset-0 w-full h-full object-cover scale-105 blur-sm"
            />

            <div className="absolute inset-0 bg-black/60" />

            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/40" />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
          </>
        )}

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-10 md:py-16">
          {/* Back */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition mb-10"
          >
            <span className="text-xl">←</span>
            Back to Movies
          </Link>

          <div className="grid lg:grid-cols-[320px_1fr] gap-10 lg:gap-14 items-center">
            {/* Poster */}
            <div className="flex justify-center lg:block">
              {posterUrl ? (
                <img
                  src={posterUrl}
                  alt={movie.title}
                  className="
                    w-[240px]
                    sm:w-[280px]
                    lg:w-full
                    rounded-2xl
                    shadow-2xl
                    shadow-black
                    hover:scale-[1.02]
                    transition
                    duration-500
                  "
                />
              ) : (
                <div className="w-[280px] h-[420px] bg-gray-900 rounded-2xl flex items-center justify-center text-gray-500">
                  No Poster Available
                </div>
              )}
            </div>

            {/* Details */}
            <div className="max-w-4xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-5">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="text-gray-400 italic text-lg sm:text-xl mb-7">
                  "{movie.tagline}"
                </p>
              )}

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-3 mb-7">
                <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 px-4 py-2 rounded-lg">
                  <span className="text-yellow-400 text-xl">★</span>

                  <div>
                    <p className="font-bold text-yellow-400">
                      {movie.vote_average.toFixed(1)}
                    </p>

                    <p className="text-xs text-gray-500">Rating</p>
                  </div>
                </div>

                <span className="px-4 py-2 bg-white/10 rounded-lg">
                  📅 {releaseYear}
                </span>

                <span className="px-4 py-2 bg-white/10 rounded-lg">
                  ⏱️ {runtimeText}
                </span>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-8">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="
                      px-4
                      py-1.5
                      rounded-full
                      bg-red-600/20
                      border
                      border-red-500/30
                      text-red-300
                      text-sm
                      hover:bg-red-600
                      hover:text-white
                      transition
                    "
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Overview */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-3">Overview</h2>

                <p className="text-gray-300 leading-8 text-base sm:text-lg max-w-3xl">
                  {movie.overview || "No overview available."}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4">
                {/* Trailer */}
                <button
                  type="button"
                  onClick={handleWatchTrailer}
                  disabled={trailerLoading}
                  className="
                    px-6
                    py-3
                    bg-red-600
                    hover:bg-red-700
                    disabled:bg-red-900
                    disabled:cursor-not-allowed
                    rounded-lg
                    font-semibold
                    transition
                    hover:scale-105
                  "
                >
                  {trailerLoading ? "Loading Trailer..." : "▶ Watch Trailer"}
                </button>

                {/* Favorite - functionality next */}
                <button
                  type="button"
                  className="
                    px-6
                    py-3
                    bg-white/10
                    hover:bg-white/20
                    border
                    border-white/10
                    rounded-lg
                    font-semibold
                    transition
                  "
                >
                  ♡ Add to Favorites
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MOVIE INFORMATION ================= */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8">
          Movie Information
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
            <p className="text-gray-500 text-sm mb-2">Release Date</p>
            <p className="text-lg font-semibold">
              {movie.release_date || "N/A"}
            </p>
          </div>

          <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
            <p className="text-gray-500 text-sm mb-2">Runtime</p>
            <p className="text-lg font-semibold">{runtimeText}</p>
          </div>

          <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
            <p className="text-gray-500 text-sm mb-2">Vote Count</p>
            <p className="text-lg font-semibold">
              {movie.vote_count.toLocaleString()}
            </p>
          </div>

          <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
            <p className="text-gray-500 text-sm mb-2">Popularity</p>
            <p className="text-lg font-semibold">
              {movie.popularity.toFixed(0)}
            </p>
          </div>

          <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
            <p className="text-gray-500 text-sm mb-2">Original Language</p>
            <p className="text-lg font-semibold uppercase">
              {movie.original_language || "N/A"}
            </p>
          </div>

          <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
            <p className="text-gray-500 text-sm mb-2">Status</p>
            <p className="text-lg font-semibold">{movie.status || "N/A"}</p>
          </div>
        </div>
      </section>

      {/* ================= TRAILER MODAL ================= */}
      {showTrailer && trailerKey && (
        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/90
            backdrop-blur-sm
            flex
            items-center
            justify-center
            p-4
          "
          onClick={() => setShowTrailer(false)}
        >
          <div
            className="
              relative
              w-full
              max-w-5xl
              aspect-video
              bg-black
              rounded-xl
              overflow-hidden
              shadow-2xl
            "
            onClick={(event) => event.stopPropagation()}
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setShowTrailer(false)}
              className="
                absolute
                top-3
                right-3
                z-10
                w-10
                h-10
                rounded-full
                bg-black/80
                text-white
                text-xl
                hover:bg-red-600
                transition
              "
            >
              ✕
            </button>

            {/* YouTube */}
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title={`${movie.title} Trailer`}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </main>
  );
}

export default MovieDetails;
