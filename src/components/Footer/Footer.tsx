const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* MovieHub */}
          <div>
            <h2 className="mb-3 text-2xl font-bold text-white">🎬 MovieHub</h2>

            <p className="max-w-md text-sm leading-6">
              Discover popular movies, search for your favorite films, and
              explore movie details all in one place.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:text-right">
            <h3 className="mb-3 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <div className="flex flex-col gap-2 text-sm md:items-end">
              <a href="/" className="transition hover:text-white">
                Home
              </a>

              <a href="/search" className="transition hover:text-white">
                Search Movies
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-gray-800 pt-6 text-center text-xs">
          <p>Movie data and images provided by TMDB.</p>

          <p className="mt-1 text-gray-500">
            This project is created for educational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
