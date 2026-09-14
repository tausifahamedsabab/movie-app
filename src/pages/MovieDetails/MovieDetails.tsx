import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieDetails } from "../../services/movieApi";
import type { IMovieDetails } from "../../types/movie";
import loadingImage from "../../assets/loading.png";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState<IMovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch movie details when the movie ID changes
  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError("");

        const data = await getMovieDetails(id);

        setMovie(data);
      } catch {
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  // Show loading image while movie details are loading
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

  // Show error state
  if (error || !movie) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <p className="text-red-400 text-xl">{error || "Movie not found."}</p>

        <Link
          to="/"
          className="px-5 py-2 bg-red-600 rounded-lg hover:bg-red-700"
        >
          Back Home
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

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-[600px] overflow-hidden">
        {/* Backdrop Image */}
        {backdropUrl && (
          <img
            src={backdropUrl}
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
        )}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

        {/* Movie Information */}
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-block mb-8 text-gray-300 hover:text-white"
          >
            ← Back to Movies
          </Link>

          <div className="grid md:grid-cols-[280px_1fr] gap-10 items-center">
            {/* Poster */}
            <div>
              {posterUrl ? (
                <img
                  src={posterUrl}
                  alt={movie.title}
                  className="w-full rounded-xl shadow-2xl"
                />
              ) : (
                <div className="h-[420px] bg-gray-800 rounded-xl flex items-center justify-center">
                  No Poster
                </div>
              )}
            </div>

            {/* Details */}
            <div className="max-w-3xl">
              {/* Movie Title */}
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {movie.title}
              </h1>

              {/* Tagline */}
              {movie.tagline && (
                <p className="text-gray-400 italic text-lg mb-6">
                  {movie.tagline}
                </p>
              )}

              {/* Movie Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="text-yellow-400 font-semibold">
                  ⭐ {movie.vote_average.toFixed(1)}
                </span>

                <span className="text-gray-300">
                  {movie.release_date?.slice(0, 4)}
                </span>

                {movie.runtime && (
                  <span className="text-gray-300">{movie.runtime} min</span>
                )}
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-8">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-red-600/80 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Overview */}
              <h2 className="text-2xl font-bold mb-3">Overview</h2>

              <p className="text-gray-300 leading-8 text-lg">
                {movie.overview || "No overview available."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default MovieDetails;
