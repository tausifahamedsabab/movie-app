import { Link } from "react-router-dom";
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

  return (
    <Link to={`/movie/${movie.id}`}>
      <div
        className="relative bg-gray-900 rounded-lg overflow-hidden
                   hover:scale-105 transition duration-300 cursor-pointer"
      >
        {/* Favorite Button */}
        <button
          onClick={handleFavorite}
          className="absolute right-3 top-3 z-10
                     w-10 h-10 rounded-full
                     bg-black/60 backdrop-blur-sm
                     flex items-center justify-center
                     text-xl
                     hover:scale-110 transition"
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          {favorite ? "❤️" : "🤍"}
        </button>

        {/* Movie Poster */}
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/placeholder.jpg"
          }
          alt={movie.title}
          className="w-full h-80 object-cover"
        />

        {/* Movie Info */}
        <div className="p-3">
          <h3 className="text-white font-semibold truncate">{movie.title}</h3>

          <div className="flex justify-between mt-2 text-sm">
            <span className="text-yellow-400">⭐ {movie.vote_average}</span>

            <span className="text-gray-400">{movie.release_date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
