import { useEffect, useState } from "react";
import type { IMovie } from "../../types/movie";
import { getPopularMovies } from "../../services/movieApi";
import MovieGrid from "../../components/MovieGrid/MovieGrid";
import Loading from "../../components/Loading/Loading";

const Home = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getPopularMovies();
        setMovies(data);
      } catch {
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <main className="min-h-screen bg-black px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-3xl font-bold">Popular Movies</h1>

        <MovieGrid movies={movies} />
      </div>
    </main>
  );
};

export default Home;
