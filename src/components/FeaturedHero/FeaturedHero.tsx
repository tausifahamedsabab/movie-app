import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Play,
  Star,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { IMovie } from "../../types/movie";

interface FeaturedHeroProps {
  movies: IMovie[];
}

const FeaturedHero = ({ movies }: FeaturedHeroProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const featuredMovies = movies.slice(0, 5);

  useEffect(() => {
    if (featuredMovies.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((current) =>
        current === featuredMovies.length - 1 ? 0 : current + 1,
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [featuredMovies.length]);

  if (!featuredMovies.length) {
    return null;
  }

  const movie = featuredMovies[activeIndex];

  const backdrop = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : movie.poster_path
      ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
      : "";

  const releaseYear = movie.release_date
    ? movie.release_date.slice(0, 4)
    : "N/A";

  const previousMovie = () => {
    setActiveIndex((current) =>
      current === 0 ? featuredMovies.length - 1 : current - 1,
    );
  };

  const nextMovie = () => {
    setActiveIndex((current) =>
      current === featuredMovies.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <section className="relative mb-12 overflow-hidden rounded-3xl border border-white/[0.06] bg-[#0d0d11] shadow-2xl">
      {/* Background */}
      <div className="absolute inset-0">
        {backdrop && (
          <img
            key={movie.id}
            src={backdrop}
            alt=""
            className="
              h-full
              w-full
              object-cover
              object-center
              opacity-40
              transition-opacity
              duration-700
            "
          />
        )}

        {/* Left cinematic gradient */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-[#07070a]
            via-[#07070a]/90
            to-[#07070a]/20
          "
        />

        {/* Bottom gradient */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#07070a]
            via-[#07070a]/30
            to-transparent
          "
        />

        {/* Extra darkness */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div
        className="
          relative
          flex
          min-h-[520px]
          items-end
          px-6
          py-10

          sm:px-10
          sm:py-14

          lg:min-h-[600px]
          lg:px-14
          lg:py-16
        "
      >
        <div
          key={movie.id}
          className="
            max-w-2xl
            animate-[fadeIn_0.7s_ease-in-out]
          "
        >
          {/* Label */}
          <div className="mb-5 flex items-center gap-2">
            <span className="h-1 w-8 rounded-full bg-red-500" />

            <span
              className="
                text-[11px]
                font-bold
                uppercase
                tracking-[0.3em]
                text-red-400
              "
            >
              Featured Movie
            </span>
          </div>

          {/* Title */}
          <h1
            className="
              max-w-3xl
              text-4xl
              font-black
              leading-[0.95]
              tracking-tight
              text-white

              sm:text-5xl
              lg:text-7xl
            "
          >
            {movie.title}
          </h1>

          {/* Metadata */}
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
            <span
              className="
                flex
                items-center
                gap-1.5
                rounded-lg
                bg-yellow-400/10
                px-3
                py-1.5
                font-semibold
                text-yellow-400
              "
            >
              <Star size={15} fill="currentColor" />

              {movie.vote_average.toFixed(1)}
            </span>

            <span className="flex items-center gap-1.5 text-zinc-400">
              <CalendarDays size={15} />

              {releaseYear}
            </span>

            <span className="h-1 w-1 rounded-full bg-zinc-600" />

            <span className="text-zinc-500">Movie</span>
          </div>

          {/* Description */}
          <p
            className="
              mt-6
              line-clamp-3
              max-w-xl
              text-sm
              leading-7
              text-zinc-300

              sm:text-base
            "
          >
            {movie.overview ||
              "Discover this movie and explore all of its details."}
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={`/movie/${movie.id}`}
              className="
                group
                flex
                items-center
                gap-2
                rounded-xl
                bg-red-600
                px-5
                py-3
                text-sm
                font-bold
                text-white
                shadow-lg
                shadow-red-600/20
                transition
                hover:-translate-y-0.5
                hover:bg-red-500
              "
            >
              <Play
                size={17}
                fill="currentColor"
                className="transition group-hover:scale-110"
              />
              View Movie
            </Link>

            <Link
              to={`/movie/${movie.id}`}
              className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-white/10
                bg-white/[0.06]
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                backdrop-blur-md
                transition
                hover:bg-white/[0.12]
              "
            >
              Movie Details
            </Link>
          </div>
        </div>
      </div>

      {/* Previous / Next */}
      {featuredMovies.length > 1 && (
        <div className="absolute bottom-8 right-6 flex items-center gap-2 sm:right-10">
          <button
            onClick={previousMovie}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-black/30
              text-white
              backdrop-blur-md
              transition
              hover:bg-white/10
            "
            aria-label="Previous featured movie"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={nextMovie}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-black/30
              text-white
              backdrop-blur-md
              transition
              hover:bg-white/10
            "
            aria-label="Next featured movie"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* Indicators */}
      {featuredMovies.length > 1 && (
        <div
          className="
            absolute
            bottom-10
            left-6
            flex
            items-center
            gap-1.5

            sm:left-10
          "
        >
          {featuredMovies.map((featuredMovie, index) => (
            <button
              key={featuredMovie.id}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${featuredMovie.title}`}
              className={`
                h-1.5
                rounded-full
                transition-all
                duration-300

                ${
                  activeIndex === index
                    ? "w-8 bg-red-500"
                    : "w-2 bg-white/30 hover:bg-white/60"
                }
              `}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedHero;
