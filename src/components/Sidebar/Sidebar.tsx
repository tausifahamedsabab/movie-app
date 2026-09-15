import { NavLink } from "react-router-dom";
import {
  Home,
  Search,
  Flame,
  Star,
  CalendarDays,
  Heart,
  X,
  ChevronRight,
} from "lucide-react";

import { useFavorites } from "../../context/useFavorites";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    name: "Home",
    path: "/",
    icon: Home,
  },
  {
    name: "Search",
    path: "/search",
    icon: Search,
  },
  {
    name: "Trending",
    path: "/trending",
    icon: Flame,
  },
  {
    name: "Top Rated",
    path: "/top-rated",
    icon: Star,
  },
  {
    name: "Upcoming",
    path: "/upcoming",
    icon: CalendarDays,
  },
  {
    name: "Favorites",
    path: "/favorites",
    icon: Heart,
  },
];

const genres = [
  { name: "Action", id: 28 },
  { name: "Adventure", id: 12 },
  { name: "Animation", id: 16 },
  { name: "Comedy", id: 35 },
  { name: "Crime", id: 80 },
  { name: "Drama", id: 18 },
  { name: "Horror", id: 27 },
  { name: "Sci-Fi", id: 878 },
];

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { favorites } = useFavorites();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <button
          onClick={onClose}
          className="
            fixed inset-0
            top-[72px]
            z-30
            bg-black/70
            backdrop-blur-sm
            lg:hidden
          "
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-[72px] z-40

          h-[calc(100vh-72px)]
          w-64

          border-r border-white/[0.06]

          bg-[#0a0a0e]/95
          backdrop-blur-xl

          transition-transform duration-300

          lg:translate-x-0

          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex h-full flex-col overflow-y-auto px-4 py-6">
          {/* Mobile Header */}
          <div className="mb-7 flex items-center justify-between lg:hidden">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-600">
                Navigation
              </p>

              <h2 className="mt-1 text-lg font-bold text-white">MovieHub</h2>
            </div>

            <button
              onClick={onClose}
              className="
                flex h-9 w-9 items-center justify-center
                rounded-lg
                text-zinc-500
                transition
                hover:bg-white/[0.06]
                hover:text-white
              "
              aria-label="Close menu"
            >
              <X size={19} />
            </button>
          </div>

          {/* Browse */}
          <div>
            <p
              className="
                mb-3 px-3
                text-[10px]
                font-bold
                uppercase
                tracking-[0.22em]
                text-zinc-600
              "
            >
              Browse
            </p>

            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/"}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `
                      group relative
                      flex items-center gap-3

                      rounded-xl
                      px-3 py-3

                      text-sm font-medium

                      transition-all duration-200

                      ${
                        isActive
                          ? `
                            bg-gradient-to-r
                            from-red-600/20
                            to-red-600/[0.03]

                            text-white

                            before:absolute
                            before:left-0
                            before:top-1/2
                            before:h-7
                            before:w-0.5
                            before:-translate-y-1/2
                            before:rounded-full
                            before:bg-red-500

                            shadow-lg
                            shadow-red-950/10
                          `
                          : `
                            text-zinc-500

                            hover:bg-white/[0.04]
                            hover:text-zinc-200
                          `
                      }
                      `
                    }
                  >
                    <Icon
                      size={18}
                      className="
                        shrink-0
                        transition
                        group-hover:scale-105
                      "
                    />

                    <span className="flex-1">{item.name}</span>

                    {item.name === "Favorites" && favorites.length > 0 && (
                      <span
                        className="
                            flex h-5 min-w-5
                            items-center justify-center

                            rounded-full
                            bg-red-500/15
                            px-1.5

                            text-[10px]
                            font-bold
                            text-red-400

                            ring-1
                            ring-red-500/20
                          "
                      >
                        {favorites.length}
                      </span>
                    )}

                    <ChevronRight
                      size={14}
                      className="
                        opacity-0
                        -translate-x-1
                        text-zinc-600

                        transition

                        group-hover:translate-x-0
                        group-hover:opacity-100
                      "
                    />
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Divider */}
          <div className="my-7 h-px bg-white/[0.06]" />

          {/* Genres */}
          <div>
            <p
              className="
                mb-3 px-3
                text-[10px]
                font-bold
                uppercase
                tracking-[0.22em]
                text-zinc-600
              "
            >
              Genres
            </p>

            <nav className="space-y-0.5">
              {genres.map((genre) => (
                <NavLink
                  key={genre.id}
                  to={`/genre/${genre.id}`}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `
                    flex items-center
                    rounded-lg
                    px-3 py-2.5

                    text-sm

                    transition

                    ${
                      isActive
                        ? "bg-white/[0.06] text-red-400"
                        : "text-zinc-600 hover:bg-white/[0.035] hover:text-zinc-300"
                    }
                    `
                  }
                >
                  <span className="mr-2 text-zinc-700">•</span>
                  {genre.name}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Bottom Card */}
          <div className="mt-auto pt-8">
            <div
              className="
                relative overflow-hidden

                rounded-2xl
                border border-white/[0.07]

                bg-gradient-to-br
                from-red-950/20
                via-white/[0.025]
                to-transparent

                p-4
              "
            >
              <div
                className="
                  absolute -right-8 -top-8
                  h-24 w-24
                  rounded-full
                  bg-red-600/10
                  blur-2xl
                "
              />

              <div className="relative">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-lg">🎬</span>

                  <p className="text-sm font-bold text-white">MovieHub</p>
                </div>

                <p className="text-xs leading-5 text-zinc-600">
                  Discover movies, explore genres and save your favorites.
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
