import { createContext } from "react";
import type { IMovie } from "../types/movie";

interface WatchlistContextType {
  watchlist: IMovie[];
  addToWatchlist: (movie: IMovie) => void;
  removeFromWatchlist: (id: number) => void;
  isInWatchlist: (id: number) => boolean;
}

export const WatchlistContext = createContext<WatchlistContextType | undefined>(
  undefined,
);
