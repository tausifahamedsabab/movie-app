import type { IMovie, IMovieDetails } from "../types/movie";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const getPopularMovies = async (): Promise<IMovie[]> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await response.json();

  return data.results;
};

export const searchMovies = async (query: string): Promise<IMovie[]> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
  );

  if (!response.ok) {
    throw new Error("Failed to search movies");
  }

  const data = await response.json();

  return data.results;
};

// Fetch detailed information for a single movie
export const getMovieDetails = async (id: string): Promise<IMovieDetails> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }

  const data = await response.json();

  return data;
};
