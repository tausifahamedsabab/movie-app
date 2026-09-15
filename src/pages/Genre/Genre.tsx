import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Clapperboard,
  Drama,
  Laugh,
  Skull,
  Rocket,
  Swords,
} from "lucide-react";

import type { IMovie } from "../../types/movie";
import { getMoviesByGenre } from "../../services/movieApi";
import MovieGrid from "../../components/MovieGrid/MovieGrid";
import Loading from "../../components/Loading/Loading";

const genreInfo: Record<
  string,
  {
    name: string;
    description: string;
    icon: React.ElementType;
  }
> = {
  "28": {
    name: "Action",
    description:
      "Explosive adventures, intense battles and adrenaline-fueled stories.",
    icon: Swords,
  },

  "12": {
    name: "Adventure",
    description:
      "Journey into unforgettable worlds filled with discovery and excitement.",
    icon: Rocket,
  },

  "16": {
    name: "Animation",
    description:
      "Explore imaginative worlds brought to life through animation.",
    icon: Clapperboard,
  },

  "35": {
    name: "Comedy",
    description:
      "Light-hearted stories, unforgettable characters and plenty of laughs.",
    icon: Laugh,
  },

  "80": {
    name: "Crime",
    description:
      "Dive into stories of mystery, investigations, criminals and justice.",
    icon: Drama,
  },

  "18": {
    name: "Drama",
    description:
      "Powerful stories driven by emotion, relationships and unforgettable characters.",
    icon: Drama,
  },

  "27": {
    name: "Horror",
    description:
      "Dark stories, terrifying encounters and nightmares brought to life.",
    icon: Skull,
  },

  "878": {
    name: "Science Fiction",
    description:
      "Explore futuristic worlds, advanced technology and possibilities beyond reality.",
    icon: Rocket,
  },
};

const Genre = () => {
  const { id } = useParams<{ id: string }>();

  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGenreMovies = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError("");

        const data = await getMoviesByGenre(id);

        setMovies(data);
      } catch {
        setError("Failed to load genre movies");
      } finally {
        setLoading(false);
      }
    };

    fetchGenreMovies();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  const currentGenre = genreInfo[id ?? ""] ?? {
    name: "Movies",
    description: "Explore movies from this collection.",
    icon: Clapperboard,
  };

  const Icon = currentGenre.icon;

  return (
    <div className="min-h-screen text-white">
      <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="mb-4 flex items-center gap-3">
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                border
                border-red-500/10
                bg-red-500/10
                text-red-400
              "
            >
              <Icon size={21} />
            </div>

            <span
              className="
                text-[11px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-red-400
              "
            >
              Genre Collection
            </span>
          </div>

          <h1
            className="
              text-3xl
              font-black
              tracking-tight
              text-white
              sm:text-4xl
              lg:text-5xl
            "
          >
            {currentGenre.name}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600 sm:text-base">
            {currentGenre.description}
          </p>
        </div>

        {/* Collection Info */}
        <div className="mb-7 flex flex-wrap items-center gap-3">
          <span
            className="
              rounded-lg
              border
              border-white/[0.06]
              bg-white/[0.03]
              px-3
              py-1.5
              text-xs
              text-zinc-500
            "
          >
            {movies.length} movies
          </span>

          <span className="h-1 w-1 rounded-full bg-zinc-700" />

          <span className="text-xs text-zinc-600">Explore the collection</span>
        </div>

        {/* Movies */}
        <MovieGrid movies={movies} />
      </div>
    </div>
  );
};

export default Genre;
