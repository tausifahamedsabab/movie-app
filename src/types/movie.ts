export interface IMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

// Movie details returned by TMDB
export interface IMovieDetails extends IMovie {
  genres: {
    id: number;
    name: string;
  }[];
  runtime: number | null;
  tagline: string | null;
}
