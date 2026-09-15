import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, LogIn, UserPlus, Menu, X } from "lucide-react";

import logo from "../../assets/logo.png";
interface NavbarProps {
  onMenuClick: () => void;
}

function Navbar({ onMenuClick }: NavbarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const navigate = useNavigate();

  const handleSearch = () => {
    const query = searchTerm.trim();

    if (!query) return;

    navigate(`/search?query=${encodeURIComponent(query)}`);
    setMobileSearchOpen(false);
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
        h-[72px]
        w-full
        border-b border-white/[0.06]
        bg-[#09090b]/90
        backdrop-blur-xl
      "
    >
      <div
        className="
          mx-auto
          flex h-full
          max-w-[1600px]
          items-center
          gap-3
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="shrink-0"
          aria-label="Go to home"
        >
          <img
            src={logo}
            alt="Movie App Logo"
            className="
              h-9
              w-auto
              object-contain
              invert
            "
          />
        </button>

        {/* Desktop Search */}
        <div className="hidden max-w-xl flex-1 md:flex">
          <div className="relative flex w-full items-center">
            <Search className="absolute left-4 text-zinc-500" size={17} />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search movies..."
              className="
                w-full
                rounded-xl
                border border-white/[0.07]
                bg-white/[0.04]
                py-2.5
                pl-11
                pr-24
                text-sm
                text-white
                placeholder-zinc-600
                outline-none
                transition

                focus:border-red-500/40
                focus:bg-white/[0.06]
              "
            />

            <button
              onClick={handleSearch}
              className="
                absolute right-1.5
                rounded-lg
                bg-red-600
                px-4 py-2
                text-xs
                font-semibold
                text-white
                transition

                hover:bg-red-500
              "
            >
              Search
            </button>
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="ml-auto hidden items-center gap-2 md:flex">
          <button
            className="
              flex items-center gap-2
              rounded-xl
              px-3 py-2
              text-sm
              text-zinc-400
              transition

              hover:bg-white/[0.05]
              hover:text-white
            "
          >
            <LogIn size={16} />
            Login
          </button>

          <button
            className="
              flex items-center gap-2
              rounded-xl
              bg-red-600
              px-4 py-2.5
              text-sm
              font-semibold
              text-white
              transition

              hover:bg-red-500
            "
          >
            <UserPlus size={16} />
            Sign Up
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="ml-auto flex items-center gap-1 md:hidden">
          {/* Search */}
          <button
            onClick={() => setMobileSearchOpen((current) => !current)}
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-xl
              text-zinc-400
              transition

              hover:bg-white/[0.06]
              hover:text-white
            "
            aria-label="Toggle search"
          >
            {mobileSearchOpen ? <X size={19} /> : <Search size={19} />}
          </button>

          {/* Menu */}
          <button
            onClick={onMenuClick}
            className="
    flex h-10 w-10
    items-center justify-center
    rounded-xl
    text-zinc-400
    transition

    hover:bg-white/[0.06]
    hover:text-white
  "
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Search Panel */}
      {mobileSearchOpen && (
        <div
          className="
            absolute
            left-0
            right-0
            top-[72px]
            border-b
            border-white/[0.06]
            bg-[#09090b]/95
            p-4
            backdrop-blur-xl
            md:hidden
          "
        >
          <div className="relative flex items-center">
            <Search className="absolute left-4 text-zinc-500" size={17} />

            <input
              autoFocus
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search movies..."
              className="
                w-full
                rounded-xl
                border border-white/[0.07]
                bg-white/[0.04]
                py-3
                pl-11
                pr-24
                text-sm
                text-white
                placeholder-zinc-600
                outline-none

                focus:border-red-500/40
              "
            />

            <button
              onClick={handleSearch}
              className="
                absolute right-1.5
                rounded-lg
                bg-red-600
                px-4 py-2.5
                text-xs
                font-semibold
                text-white

                transition
                hover:bg-red-500
              "
            >
              Search
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
