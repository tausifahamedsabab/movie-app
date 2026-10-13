import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Bookmark,
  CalendarDays,
  Clock3,
  Heart,
  Play,
  Star,
  X,
} from "lucide-react";

import { useWatchlist } from "../../context/useWatchlist";

import { getMovieDetails, getMovieTrailer } from "../../services/movieApi";

import type { IMovieDetails } from "../../types/movie";
import loadingImage from "../../assets/loading.png";
import { useFavorites } from "../../context/useFavorites";

function MovieDetails() {
  const { id } = useParams<{ id: string }>();

  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  const [movie, setMovie] = useState<IMovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerLoading, setTrailerLoading] = useState(false);

  const favorite = movie ? isFavorite(movie.id) : false;
  const watchlisted = movie ? isInWatchlist(movie.id) : false;

  const handleWatchlist = () => {
    if (!movie) return;

    if (watchlisted) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        genre_ids: movie.genres?.map((genre) => genre.id) ?? [],
      });
    }
  };

  /* ============================= */
  /* FETCH MOVIE */
  /* ============================= */

  // এখান থেকে তোমার আগের useEffect রাখবে।
  // এরপর আগের handleFavorite ও handleWatchTrailer রাখবে।
  // Loading, Error এবং return JSX-ও আগের মতো রাখবে।

  /* ============================= */
  /* FETCH MOVIE */
  /* ============================= */

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

  /* ============================= */
  /* FAVORITE */
  /* ============================= */

  const handleFavorite = () => {
    if (!movie) return;

    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        genre_ids: movie.genres?.map((genre) => genre.id) ?? [],
      });
    }
  };

  /* ============================= */
  /* TRAILER */
  /* ============================= */

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

  /* ============================= */
  /* LOADING */
  /* ============================= */

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#07070a]">
        <img
          src={loadingImage}
          alt="Loading"
          className="h-screen w-full object-contain"
        />
      </main>
    );
  }

  /* ============================= */
  /* ERROR */
  /* ============================= */

  if (error || !movie) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#07070a] px-5 text-white">
        <div
          className="
            mb-5 flex h-20 w-20
            items-center justify-center
            rounded-2xl
            border border-white/[0.08]
            bg-white/[0.03]
            text-4xl
          "
        >
          🎬
        </div>

        <p className="mb-6 text-center text-lg text-red-400">
          {error || "Movie not found."}
        </p>

        <Link
          to="/"
          className="
            inline-flex items-center gap-2
            rounded-xl
            bg-red-600
            px-6 py-3
            text-sm font-semibold
            text-white
            shadow-lg shadow-red-950/30
            transition
            hover:bg-red-500
            active:scale-95
          "
        >
          <ArrowLeft size={17} />
          Back Home
        </Link>
      </main>
    );
  }

  /* ============================= */
  /* DATA */
  /* ============================= */

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
    <main className="min-h-screen bg-[#07070a] text-white">
      {/* ======================================= */}
      {/* HERO */}
      {/* ======================================= */}

      <section className="relative min-h-[720px] overflow-hidden">
        {/* Backdrop */}
        {backdropUrl && (
          <>
            <img
              src={backdropUrl}
              alt=""
              className="
                absolute inset-0
                h-full w-full
                scale-105
                object-cover
                opacity-45
              "
            />

            {/* Blur */}
            <div className="absolute inset-0 backdrop-blur-[2px]" />

            {/* Left gradient */}
            <div
              className="
                absolute inset-0
                bg-gradient-to-r
                from-[#07070a]
                via-[#07070a]/95
                to-[#07070a]/30
              "
            />

            {/* Bottom gradient */}
            <div
              className="
                absolute inset-0
                bg-gradient-to-t
                from-[#07070a]
                via-[#07070a]/30
                to-[#07070a]/50
              "
            />

            {/* Top gradient */}
            <div
              className="
                absolute inset-0
                bg-gradient-to-b
                from-[#07070a]/60
                via-transparent
                to-transparent
              "
            />

            {/* Red glow */}
            <div
              className="
                absolute
                -left-40
                top-40
                h-96
                w-96
                rounded-full
                bg-red-600/10
                blur-[120px]
              "
            />
          </>
        )}

        {/* Content */}
        <div
          className="
            relative z-10
            mx-auto
            max-w-[1600px]
            px-5
            pb-16
            pt-8
            sm:px-8
            lg:px-12
            lg:pb-24
            lg:pt-12
          "
        >
          {/* Back */}
          <Link
            to="/"
            className="
              mb-10
              inline-flex
              items-center
              gap-2
              rounded-lg
              px-2
              py-1
              text-sm
              font-medium
              text-zinc-400
              transition
              hover:bg-white/[0.04]
              hover:text-white
            "
          >
            <ArrowLeft size={18} />
            Back to Movies
          </Link>

          {/* Main */}
          <div
            className="
              grid
              items-center
              gap-10
              lg:grid-cols-[300px_1fr]
              lg:gap-14
              xl:grid-cols-[340px_1fr]
            "
          >
            {/* ================================= */}
            {/* POSTER */}
            {/* ================================= */}

            <div className="flex justify-center lg:block">
              {posterUrl ? (
                <div className="group relative">
                  {/* Glow */}
                  <div
                    className="
                      absolute
                      -inset-3
                      rounded-[28px]
                      bg-red-600/15
                      opacity-70
                      blur-2xl
                      transition
                      duration-500
                      group-hover:opacity-100
                    "
                  />

                  <img
                    src={posterUrl}
                    alt={movie.title}
                    className="
                      relative
                      w-[240px]
                      rounded-2xl
                      border
                      border-white/[0.12]
                      object-cover
                      shadow-2xl
                      shadow-black/80
                      transition
                      duration-500
                      group-hover:-translate-y-1
                      group-hover:scale-[1.015]
                      sm:w-[280px]
                      lg:w-full
                    "
                  />

                  {/* Poster bottom gradient */}
                  <div
                    className="
                      pointer-events-none
                      absolute inset-x-0 bottom-0
                      h-24
                      rounded-b-2xl
                      bg-gradient-to-t
                      from-black/40
                      to-transparent
                    "
                  />
                </div>
              ) : (
                <div
                  className="
                    flex
                    h-[420px]
                    w-[280px]
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-white/[0.08]
                    bg-white/[0.03]
                    text-sm
                    text-zinc-600
                  "
                >
                  No Poster Available
                </div>
              )}
            </div>

            {/* ================================= */}
            {/* DETAILS */}
            {/* ================================= */}

            <div className="max-w-4xl">
              {/* Label */}
              <div className="mb-4 flex items-center gap-2">
                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-red-500
                    shadow-lg
                    shadow-red-500/60
                  "
                />

                <span
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.25em]
                    text-red-400
                  "
                >
                  Movie Details
                </span>
              </div>

              {/* Title */}
              <h1
                className="
                  max-w-5xl
                  text-4xl
                  font-black
                  leading-[1.02]
                  tracking-tight
                  sm:text-5xl
                  lg:text-6xl
                  xl:text-7xl
                "
              >
                {movie.title}
              </h1>

              {/* Tagline */}
              {movie.tagline && (
                <p
                  className="
                    mt-5
                    max-w-2xl
                    text-base
                    italic
                    leading-7
                    text-zinc-500
                    sm:text-lg
                  "
                >
                  “{movie.tagline}”
                </p>
              )}

              {/* Meta */}
              <div className="mt-7 flex flex-wrap items-center gap-2.5">
                {/* Rating */}
                <div
                  className="
                    flex items-center gap-2
                    rounded-xl
                    border border-yellow-500/20
                    bg-yellow-500/[0.06]
                    px-4 py-2.5
                  "
                >
                  <Star size={18} className="fill-yellow-400 text-yellow-400" />

                  <div>
                    <p className="text-sm font-bold text-yellow-400">
                      {movie.vote_average.toFixed(1)}
                    </p>

                    <p className="text-[10px] text-zinc-600">Rating</p>
                  </div>
                </div>

                {/* Year */}
                <div
                  className="
                    flex items-center gap-2
                    rounded-xl
                    border border-white/[0.07]
                    bg-white/[0.04]
                    px-4 py-3
                    text-sm text-zinc-300
                  "
                >
                  <CalendarDays size={16} className="text-zinc-500" />
                  {releaseYear}
                </div>

                {/* Runtime */}
                <div
                  className="
                    flex items-center gap-2
                    rounded-xl
                    border border-white/[0.07]
                    bg-white/[0.04]
                    px-4 py-3
                    text-sm text-zinc-300
                  "
                >
                  <Clock3 size={16} className="text-zinc-500" />
                  {runtimeText}
                </div>
              </div>

              {/* Genres */}
              <div className="mt-6 flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="
                      rounded-full
                      border border-red-500/15
                      bg-red-500/[0.07]
                      px-3.5
                      py-1.5
                      text-xs
                      font-medium
                      text-red-300
                      transition
                      hover:border-red-500/30
                      hover:bg-red-500/15
                    "
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Overview */}
              <div className="mt-8">
                <h2 className="mb-3 text-xl font-bold">Overview</h2>

                <p
                  className="
                    max-w-3xl
                    text-sm
                    leading-7
                    text-zinc-400
                    sm:text-base
                    sm:leading-8
                  "
                >
                  {movie.overview || "No overview available."}
                </p>
              </div>

              {/* ================================= */}
              {/* ACTION BUTTONS */}
              {/* ================================= */}

              <div className="mt-8 flex flex-wrap gap-3">
                {/* Trailer */}
                <button
                  type="button"
                  onClick={handleWatchTrailer}
                  disabled={trailerLoading}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-red-600
                    px-6
                    py-3
                    text-sm
                    font-bold
                    text-white
                    shadow-lg
                    shadow-red-950/30
                    transition
                    hover:bg-red-500
                    hover:shadow-red-900/40
                    active:scale-95
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  <Play size={17} className="fill-current" />

                  {trailerLoading ? "Loading Trailer..." : "Watch Trailer"}
                </button>
                {/* Favorite */}
                <button
                  type="button"
                  onClick={handleFavorite}
                  className={`
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    px-6
                    py-3
                    text-sm
                    font-semibold
                    backdrop-blur-md
                    transition
                    active:scale-95

                    ${
                      favorite
                        ? `
                          border-red-500/30
                          bg-red-500/10
                          text-red-400
                          hover:bg-red-500/15
                        `
                        : `
                          border-white/[0.1]
                          bg-white/[0.05]
                          text-zinc-300
                          hover:bg-white/[0.09]
                          hover:text-white
                        `
                    }
                  `}
                >
                  <Heart size={17} fill={favorite ? "currentColor" : "none"} />

                  {favorite ? "Remove from Favorites" : "Add to Favorites"}
                </button>
                ```tsx
                {/* Watchlist */}
                <button
                  type="button"
                  onClick={handleWatchlist}
                  className={`
    inline-flex items-center gap-2
    rounded-xl border px-6 py-3
    text-sm font-semibold
    backdrop-blur-md transition active:scale-95
    ${
      watchlisted
        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/15"
        : "border-white/[0.1] bg-white/[0.05] text-zinc-300 hover:bg-white/[0.09] hover:text-white"
    }
  `}
                >
                  <Bookmark
                    size={17}
                    fill={watchlisted ? "currentColor" : "none"}
                  />
                  {watchlisted ? "Remove from Watchlist" : "Add to Watchlist"}
                </button>
                ```
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================= */}
      {/* MOVIE INFORMATION */}
      {/* ======================================= */}

      <section className="relative px-5 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-7">
            <p
              className="
                mb-2
                text-[10px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-red-400
              "
            >
              Details
            </p>

            <h2 className="text-2xl font-black sm:text-3xl">
              Movie Information
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <InfoCard
              label="Release Date"
              value={movie.release_date || "N/A"}
            />

            <InfoCard label="Runtime" value={runtimeText} />

            <InfoCard
              label="Vote Count"
              value={movie.vote_count.toLocaleString()}
            />

            <InfoCard label="Popularity" value={movie.popularity.toFixed(0)} />

            <InfoCard
              label="Original Language"
              value={
                movie.original_language
                  ? movie.original_language.toUpperCase()
                  : "N/A"
              }
            />

            <InfoCard label="Status" value={movie.status || "N/A"} />
          </div>
        </div>
      </section>

      {/* ======================================= */}
      {/* TRAILER MODAL */}
      {/* ======================================= */}

      {showTrailer && trailerKey && (
        <div
          className="
            fixed inset-0 z-[100]
            flex items-center justify-center
            bg-black/90
            p-4
            backdrop-blur-md
          "
          onClick={() => setShowTrailer(false)}
        >
          <div
            className="
              relative
              w-full
              max-w-6xl
              overflow-hidden
              rounded-2xl
              border border-white/[0.1]
              bg-black
              shadow-2xl
              shadow-black
            "
            onClick={(event) => event.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowTrailer(false)}
              className="
                absolute
                right-3
                top-3
                z-10
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                bg-black/70
                text-white
                backdrop-blur-md
                transition
                hover:bg-white/10
                active:scale-95
              "
              aria-label="Close trailer"
            >
              <X size={19} />
            </button>

            {/* YouTube */}
            <div className="aspect-video">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                title={`${movie.title} Trailer`}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* ================================= */
/* INFO CARD */
/* ================================= */

interface InfoCardProps {
  label: string;
  value: string;
}

const InfoCard = ({ label, value }: InfoCardProps) => {
  return (
    <div
      className="
        group
        rounded-2xl
        border
        border-white/[0.06]
        bg-white/[0.025]
        p-5
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:border-white/[0.1]
        hover:bg-white/[0.04]
      "
    >
      <p
        className="
          mb-2
          text-[10px]
          font-bold
          uppercase
          tracking-[0.18em]
          text-zinc-600
        "
      >
        {label}
      </p>

      <p
        className="
          text-lg
          font-semibold
          text-zinc-200
          transition
          group-hover:text-white
        "
      >
        {value}
      </p>
    </div>
  );
};

export default MovieDetails;
