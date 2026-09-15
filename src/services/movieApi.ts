import type { IMovie, IMovieDetails } from "../types/movie";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Popular Movies
export const getPopularMovies = async (page: number = 1): Promise<IMovie[]> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await response.json();

  return data.results;
};

// Trending Movies
export const getTrendingMovies = async (): Promise<IMovie[]> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch trending movies");
  }

  const data = await response.json();

  return data.results;
};

// Top Rated Movies
export const getTopRatedMovies = async (): Promise<IMovie[]> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch top rated movies");
  }

  const data = await response.json();

  return data.results;
};

// Upcoming Movies
export const getUpcomingMovies = async (): Promise<IMovie[]> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch upcoming movies");
  }

  const data = await response.json();

  return data.results;
};

// Search Movies
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

// Movie Details
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

// Movies by Genre
export const getMoviesByGenre = async (genreId: string): Promise<IMovie[]> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch genre movies");
  }

  const data = await response.json();

  return data.results;
};
export interface IMovieVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export const getMovieTrailer = async (
  movieId: string,
): Promise<IMovieVideo | null> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie trailer");
  }

  const data: { results: IMovieVideo[] } = await response.json();

  const trailer =
    data.results.find(
      (video) =>
        video.site === "YouTube" &&
        video.type === "Trailer" &&
        video.official === true,
    ) ??
    data.results.find(
      (video) => video.site === "YouTube" && video.type === "Trailer",
    ) ??
    data.results.find(
      (video) => video.site === "YouTube" && video.type === "Teaser",
    );

  return trailer ?? null;
};
