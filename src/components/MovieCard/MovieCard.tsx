import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

import type { IMovie } from "../../types/movie";
import { useFavorites } from "../../context/useFavorites";

interface MovieCardProps {
  movie: IMovie;
}

function MovieCard({ movie }: MovieCardProps) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const favorite = isFavorite(movie.id);

  const handleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.jpg";

  const releaseYear = movie.release_date
    ? movie.release_date.slice(0, 4)
    : "N/A";

  return (
    <Link to={`/movie/${movie.id}`} className="group block">
      <article
        className="
          relative overflow-hidden
          rounded-2xl

          border border-white/[0.06]
          bg-[#101014]

          shadow-xl
          shadow-black/20

          transition-all
          duration-300

          hover:-translate-y-1
          hover:border-white/[0.12]
          hover:shadow-2xl
          hover:shadow-black/50
        "
      >
        {/* Poster */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={posterUrl}
            alt={movie.title}
            loading="lazy"
            className="
              h-full w-full
              object-cover

              transition-transform
              duration-500

              group-hover:scale-110
            "
          />

          {/* Dark gradient */}
          <div
            className="
              absolute inset-0
              bg-gradient-to-t
              from-black/80
              via-black/5
              to-transparent

              opacity-70
              transition-opacity

              group-hover:opacity-100
            "
          />

          {/* Favorite */}
          <button
            onClick={handleFavorite}
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
            className="
              absolute right-3 top-3
              z-10

              flex h-9 w-9
              items-center justify-center

              rounded-full

              border border-white/10
              bg-black/55
              backdrop-blur-md

              transition-all
              duration-200

              hover:scale-110
              hover:bg-black/80
            "
          >
            <Heart
              size={17}
              className={favorite ? "fill-red-500 text-red-500" : "text-white"}
            />
          </button>

          {/* Rating */}
          <div
            className="
              absolute
              bottom-3 left-3

              flex items-center gap-1.5

              rounded-lg
              border border-yellow-400/20
              bg-black/60
              px-2.5 py-1.5

              text-xs
              font-semibold
              text-yellow-400

              backdrop-blur-md
            "
          >
            <span>★</span>

            <span>
              {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
            </span>
          </div>

          {/* View label */}
          <div
            className="
              absolute
              bottom-3 right-3

              translate-y-2
              rounded-lg

              bg-white/10
              px-2.5 py-1.5

              text-[10px]
              font-semibold
              uppercase
              tracking-wider
              text-white

              opacity-0
              backdrop-blur-md

              transition-all
              duration-300

              group-hover:translate-y-0
              group-hover:opacity-100
            "
          >
            View
          </div>
        </div>

        {/* Info */}
        <div className="p-3.5">
          <h3
            className="
              truncate

              text-sm
              font-semibold
              text-white

              transition-colors

              group-hover:text-red-400
            "
            title={movie.title}
          >
            {movie.title}
          </h3>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-zinc-600">{releaseYear}</span>

            <span className="text-[10px] uppercase tracking-wider text-zinc-700">
              Movie
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default MovieCard;
