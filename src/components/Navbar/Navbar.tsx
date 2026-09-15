import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, LogIn, UserPlus } from "lucide-react";

import logo from "../../assets/logo.png";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
    const query = searchTerm.trim();

    if (!query) return;

    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav
      className="
        sticky top-0 z-50
        w-full
        border-b border-white/[0.06]
        bg-[#08080b]/85
        backdrop-blur-xl
      "
    >
      <div className="mx-auto flex h-[72px] max-w-[1600px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="
            group flex shrink-0 items-center
            rounded-xl
            px-1
            transition
          "
        >
          <img
            src={logo}
            alt="Movie App Logo"
            className="
              h-9 w-auto object-contain
              transition duration-300
              group-hover:scale-105
            "
          />
        </button>

        {/* Search */}
        <div className="mx-auto flex w-full max-w-2xl">
          <div className="relative flex w-full">
            <Search
              size={19}
              className="
                pointer-events-none
                absolute left-4 top-1/2
                -translate-y-1/2
                text-zinc-500
              "
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search movies, actors, genres..."
              className="
                h-11 w-full
                rounded-xl
                border border-white/[0.08]
                bg-white/[0.04]
                pl-11 pr-4
                text-sm text-white
                placeholder:text-zinc-600
                outline-none
                transition

                focus:border-red-500/50
                focus:bg-white/[0.06]
                focus:ring-2
                focus:ring-red-500/10
              "
            />

            <button
              onClick={handleSearch}
              className="
                absolute right-1.5 top-1/2
                -translate-y-1/2

                rounded-lg
                bg-red-600
                px-4 py-2

                text-sm font-semibold text-white

                shadow-lg shadow-red-950/30

                transition duration-200
                hover:bg-red-500
                active:scale-95
              "
            >
              Search
            </button>
          </div>
        </div>

        {/* Auth */}
        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          <button
            className="
              flex items-center gap-2
              rounded-xl
              px-4 py-2.5
              text-sm font-medium
              text-zinc-400

              transition

              hover:bg-white/[0.05]
              hover:text-white
            "
          >
            <LogIn size={17} />
            Login
          </button>

          <button
            className="
              flex items-center gap-2
              rounded-xl
              border border-red-500/20
              bg-red-600
              px-4 py-2.5

              text-sm font-semibold
              text-white

              shadow-lg
              shadow-red-950/20

              transition duration-200
              hover:bg-red-500
              hover:shadow-red-900/30
              active:scale-95
            "
          >
            <UserPlus size={17} />
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
