import { useEffect, useState } from "react";
import type { IMovie } from "../../types/movie";
import { getUpcomingMovies } from "../../services/movieApi";
import MovieGrid from "../../components/MovieGrid/MovieGrid";

const Upcoming = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getUpcomingMovies();

        setMovies(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load upcoming movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingMovies();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-white">
        <h1 className="text-3xl font-bold">Loading Upcoming Movies...</h1>
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-400">{error}</div>;
  }

  return (
    <div className="min-h-screen">
      <h1 className="mb-6 text-3xl font-bold text-white">Upcoming Movies 🎬</h1>

      {movies.length > 0 ? (
        <MovieGrid movies={movies} />
      ) : (
        <p className="text-gray-400">No upcoming movies found.</p>
      )}
    </div>
  );
};

export default Upcoming;
