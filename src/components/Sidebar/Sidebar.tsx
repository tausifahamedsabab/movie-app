import { NavLink } from "react-router-dom";
import {
  Home,
  Search,
  Flame,
  Star,
  CalendarDays,
  Heart,
  X,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { useFavorites } from "../../context/useFavorites";

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

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  // Favorites থেকে saved movies নিচ্ছি
  const { favorites } = useFavorites();

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-[76px] left-4 z-40 rounded-lg border border-gray-800 bg-gray-950 p-2 text-white shadow-lg hover:bg-gray-900 lg:hidden"
      >
        <Menu size={22} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64
          border-r border-gray-800 bg-[#0d0d10]
          transition-transform duration-300
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex h-full flex-col overflow-y-auto px-4 py-6">
          {/* Mobile Close */}
          <div className="mb-6 flex items-center justify-between lg:hidden">
            <span className="text-lg font-bold text-white">Menu</span>

            <button
              onClick={() => setOpen(false)}
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Main Menu */}
          <div>
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-gray-500">
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
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `
                      flex items-center gap-3 rounded-xl px-3 py-3
                      text-sm font-medium transition-all duration-200
                      ${
                        isActive
                          ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                          : "text-gray-400 hover:bg-gray-800/70 hover:text-white"
                      }
                      `
                    }
                  >
                    <Icon size={19} />

                    {/* Menu Name */}
                    <span className="flex-1">{item.name}</span>

                    {/* Favorites Count */}
                    {item.name === "Favorites" && favorites.length > 0 && (
                      <span
                        className="flex h-5 min-w-5 items-center
                                     justify-center rounded-full
                                     bg-red-500 px-1.5 text-[11px]
                                     font-bold text-white"
                      >
                        {favorites.length}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-gray-800" />

          {/* Genres */}
          <div>
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-gray-500">
              Genres
            </p>

            <nav className="space-y-1">
              {genres.map((genre) => (
                <NavLink
                  key={genre.id}
                  to={`/genre/${genre.id}`}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `
                    block rounded-lg px-3 py-2.5 text-sm transition
                    ${
                      isActive
                        ? "bg-gray-800 text-red-400"
                        : "text-gray-500 hover:bg-gray-800/50 hover:text-gray-200"
                    }
                    `
                  }
                >
                  {genre.name}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Bottom */}
          <div className="mt-auto pt-8">
            <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
              <p className="text-sm font-semibold text-white">MovieHub</p>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Discover movies, explore genres and save your favorites.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
