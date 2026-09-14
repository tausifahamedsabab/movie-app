import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="hidden min-h-screen w-64 shrink-0 bg-gray-950 px-5 py-8 text-gray-400 lg:block">
      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white">🎬 MovieHub</h1>

        <p className="mt-2 text-xs text-gray-500">
          Discover your next favorite movie.
        </p>
      </div>

      {/* Menu */}
      <div>
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Menu
        </h3>

        <nav className="space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition hover:bg-gray-800 hover:text-white"
          >
            🏠
            <span>Home</span>
          </Link>

          <Link
            to="/movies"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition hover:bg-gray-800 hover:text-white"
          >
            🎬
            <span>Movies</span>
          </Link>

          <Link
            to="/trending"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition hover:bg-gray-800 hover:text-white"
          >
            🔥
            <span>Trending</span>
          </Link>

          <Link
            to="/top-rated"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition hover:bg-gray-800 hover:text-white"
          >
            ⭐<span>Top Rated</span>
          </Link>

          <Link
            to="/upcoming"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition hover:bg-gray-800 hover:text-white"
          >
            🆕
            <span>Upcoming</span>
          </Link>

          <Link
            to="/search"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition hover:bg-gray-800 hover:text-white"
          >
            🔎
            <span>Search</span>
          </Link>

          <Link
            to="/watchlist"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition hover:bg-gray-800 hover:text-white"
          >
            ❤️
            <span>My Watchlist</span>
          </Link>
        </nav>
      </div>

      {/* Genres */}
      <div className="mt-10">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Genres
        </h3>

        <nav className="space-y-1">
          <Link
            to="/genre/action"
            className="block rounded-lg px-3 py-2 text-sm transition hover:bg-gray-800 hover:text-white"
          >
            Action
          </Link>

          <Link
            to="/genre/comedy"
            className="block rounded-lg px-3 py-2 text-sm transition hover:bg-gray-800 hover:text-white"
          >
            Comedy
          </Link>

          <Link
            to="/genre/drama"
            className="block rounded-lg px-3 py-2 text-sm transition hover:bg-gray-800 hover:text-white"
          >
            Drama
          </Link>

          <Link
            to="/genre/horror"
            className="block rounded-lg px-3 py-2 text-sm transition hover:bg-gray-800 hover:text-white"
          >
            Horror
          </Link>

          <Link
            to="/genre/romance"
            className="block rounded-lg px-3 py-2 text-sm transition hover:bg-gray-800 hover:text-white"
          >
            Romance
          </Link>

          <Link
            to="/genre/scifi"
            className="block rounded-lg px-3 py-2 text-sm transition hover:bg-gray-800 hover:text-white"
          >
            Sci-Fi
          </Link>

          <Link
            to="/genre/thriller"
            className="block rounded-lg px-3 py-2 text-sm transition hover:bg-gray-800 hover:text-white"
          >
            Thriller
          </Link>

          <Link
            to="/genre/animation"
            className="block rounded-lg px-3 py-2 text-sm transition hover:bg-gray-800 hover:text-white"
          >
            Animation
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
