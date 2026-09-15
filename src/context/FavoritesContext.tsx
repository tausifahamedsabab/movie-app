import { createContext } from "react";
import type { IMovie } from "../types/movie";

export interface FavoritesContextType {
  favorites: IMovie[];
  addToFavorites: (movie: IMovie) => void;
  removeFromFavorites: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);
