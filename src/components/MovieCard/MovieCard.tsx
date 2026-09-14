import { Link } from "react-router-dom";
import type { IMovie } from "../../types/movie";

interface MovieCardProps {
  movie: IMovie;
}

function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div
        className="bg-gray-900 rounded-lg overflow-hidden
                      hover:scale-105 transition duration-300 cursor-pointer"
      >
        <img
  src={
    movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "/placeholder.jpg"
  }
  alt={movie.title}
  className="w-full h-80 object-cover"
/>

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
