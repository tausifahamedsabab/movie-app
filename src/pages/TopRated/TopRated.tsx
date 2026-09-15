import { useEffect, useState } from "react";
import type { IMovie } from "../../types/movie";
import { getTopRatedMovies } from "../../services/movieApi";
import MovieGrid from "../../components/MovieGrid/MovieGrid";

const TopRated = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        setLoading(true);

        const data = await getTopRatedMovies();

        setMovies(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load top rated movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopRatedMovies();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-white">
        <h1 className="text-3xl font-bold">Loading Top Rated Movies...</h1>
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-400">{error}</div>;
  }

  return (
    <div className="min-h-screen">
      <h1 className="mb-6 text-3xl font-bold text-white">
        Top Rated Movies ⭐
      </h1>

      <MovieGrid movies={movies} />
    </div>
  );
};

export default TopRated;
