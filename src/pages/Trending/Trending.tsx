import { useEffect, useState } from "react";
import type { IMovie } from "../../types/movie";
import { getTrendingMovies } from "../../services/movieApi";
import MovieGrid from "../../components/MovieGrid/MovieGrid";

const Trending = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const data = await getTrendingMovies();
        setMovies(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  if (loading) {
    return <div className="p-8 text-white">Loading trending movies...</div>;
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-white">Trending Movies 🔥</h1>

      <MovieGrid movies={movies} />
    </div>
  );
};

export default Trending;
