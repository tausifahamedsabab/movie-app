import { useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import type { IMovie } from "../../types/movie";

interface MoviesProps {
  movies: IMovie[];
}

function Movies({ movies }: MoviesProps) {
  const [selectedGenre, setSelectedGenre] = useState("All");

  const genres = [
    { name: "All", id: 0 },
    { name: "Action", id: 28 },
    { name: "Comedy", id: 35 },
    { name: "Drama", id: 18 },
    { name: "Horror", id: 27 },
    { name: "Sci-Fi", id: 878 },
  ];

  const selectedGenreId = genres.find(
    (genre) => genre.name === selectedGenre,
  )?.id;

  const filteredMovies =
    selectedGenre === "All"
      ? movies
      : movies.filter((movie) =>
          movie.genre_ids?.includes(selectedGenreId ?? 0),
        );

  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      {/* Title */}
      <h2 className="text-3xl font-bold text-white mb-6">Popular Movies</h2>

      {/* Genre Buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => setSelectedGenre(genre.name)}
            className={`px-4 py-2 rounded-lg transition ${
              selectedGenre === genre.name
                ? "bg-red-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* More Movies */}
      <div className="flex justify-center mt-8">
        <button className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition">
          More Movies
        </button>
      </div>
    </section>
  );
}

export default Movies;
