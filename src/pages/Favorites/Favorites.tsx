import { Heart, Film, Sparkles } from "lucide-react";

import { useFavorites } from "../../context/useFavorites";
import MovieGrid from "../../components/MovieGrid/MovieGrid";

const Favorites = () => {
  const { favorites } = useFavorites();

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
              <Heart size={21} fill="currentColor" />
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
              Your Collection
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
            My Favorites
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-600 sm:text-base">
            Keep all the movies you love in one place.
          </p>
        </div>

        {/* Favorites exist */}
        {favorites.length > 0 && (
          <>
            {/* Collection Stats */}
            <div className="mb-7 flex flex-wrap items-center gap-3">
              <span
                className="
                  flex
                  items-center
                  gap-2

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
                <Heart size={13} fill="currentColor" />
                {favorites.length} {favorites.length === 1 ? "movie" : "movies"}
              </span>

              <span className="h-1 w-1 rounded-full bg-zinc-700" />

              <span className="flex items-center gap-1.5 text-xs text-zinc-600">
                <Sparkles size={13} />
                Your personal collection
              </span>
            </div>

            {/* Movies */}
            <MovieGrid movies={favorites} />
          </>
        )}

        {/* Empty State */}
        {favorites.length === 0 && (
          <div
            className="
              relative
              flex
              min-h-[420px]
              flex-col
              items-center
              justify-center

              overflow-hidden
              rounded-3xl

              border
              border-white/[0.06]

              bg-white/[0.02]

              px-6
              text-center
            "
          >
            {/* Glow */}
            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2

                h-56
                w-56

                -translate-x-1/2
                -translate-y-1/2

                rounded-full
                bg-red-600/[0.06]

                blur-[90px]
              "
            />

            {/* Icon */}
            <div
              className="
                relative
                mb-6

                flex
                h-20
                w-20

                items-center
                justify-center

                rounded-2xl

                border
                border-white/[0.06]

                bg-white/[0.04]

                text-zinc-600
              "
            >
              <Heart size={34} />
            </div>

            {/* Text */}
            <h2
              className="
                relative
                text-2xl
                font-black
                text-white
              "
            >
              Your collection is empty
            </h2>

            <p
              className="
                relative
                mt-3
                max-w-md

                text-sm
                leading-7
                text-zinc-600
              "
            >
              You haven't added any movies to your favorites yet. Explore movies
              and tap the heart icon to save them here.
            </p>

            {/* Decorative Film */}
            <div className="relative mt-8 flex items-center gap-2 text-xs text-zinc-700">
              <Film size={14} />

              <span>Start building your collection</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
