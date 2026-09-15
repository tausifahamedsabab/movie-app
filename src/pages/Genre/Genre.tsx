import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { IMovie } from "../../types/movie";
import { getMoviesByGenre } from "../../services/movieApi";
import MovieGrid from "../../components/MovieGrid/MovieGrid";

const genreNames: Record<string, string> = {
  "28": "Action",
  "12": "Adventure",
  "16": "Animation",
  "35": "Comedy",
  "80": "Crime",
  "18": "Drama",
  "27": "Horror",
  "878": "Science Fiction",
};

const Genre = () => {
  const { id } = useParams();

  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(true);

  const genreName = id ? genreNames[id] : "Movies";

  useEffect(() => {
    const fetchGenreMovies = async () => {
      if (!id) return;

      try {
        setLoading(true);

        const data = await getMoviesByGenre(id);

        setMovies(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenreMovies();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 text-white">
        <h1 className="text-2xl font-bold">Loading {genreName} movies...</h1>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-white">
        {genreName} Movies 🎬
      </h1>

      <MovieGrid movies={movies} />
    </div>
  );
};

export default Genre;
