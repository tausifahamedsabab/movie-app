import { Link } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import { useFavorites } from "../../context/useFavorites";

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="p-6 text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Favorites ❤️</h1>

        <p className="mt-2 text-gray-400">
          {favorites.length > 0
            ? `${favorites.length} movie${
                favorites.length > 1 ? "s" : ""
              } saved`
            : "Your favorite movies will appear here."}
        </p>
      </div>

      {/* Empty State */}
      {favorites.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
          <div className="text-6xl mb-4">💔</div>

          <h2 className="text-2xl font-semibold">No Favorites Yet</h2>

          <p className="mt-2 text-gray-400">Start adding movies you love!</p>

          <Link
            to="/"
            className="mt-6 rounded-lg bg-red-600 px-6 py-3
                       font-semibold transition hover:bg-red-700"
          >
            Explore Movies
          </Link>
        </div>
      ) : (
        /* Favorite Movies */
        <div
          className="grid grid-cols-2 gap-5
                     sm:grid-cols-3
                     md:grid-cols-4
                     lg:grid-cols-5"
        >
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
