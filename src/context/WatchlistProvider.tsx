import { useEffect, useState, type ReactNode } from "react";

import { WatchlistContext } from "./WatchlistContext";
import type { IMovie } from "../types/movie";

function getInitialWatchlist(): IMovie[] {
  try {
    const saved = localStorage.getItem("watchlist");

    return saved ? (JSON.parse(saved) as IMovie[]) : [];
  } catch {
    return [];
  }
}

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [watchlist, setWatchlist] = useState<IMovie[]>(getInitialWatchlist);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (movie: IMovie) => {
    setWatchlist((previous) =>
      previous.some((item) => item.id === movie.id)
        ? previous
        : [...previous, movie],
    );
  };

  const removeFromWatchlist = (id: number) => {
    setWatchlist((previous) => previous.filter((movie) => movie.id !== id));
  };

  const isInWatchlist = (id: number) =>
    watchlist.some((movie) => movie.id === id);

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}
