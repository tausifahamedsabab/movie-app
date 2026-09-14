import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  // Handle movie search
  const handleSearch = () => {
    const query = searchTerm.trim();

    if (!query) return;

    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  // Search when the user presses Enter
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-gray-950 border-b border-gray-800">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center gap-8">
        {/* Logo */}
        <a href="/" className="flex-shrink-0">
          <img
            src={logo}
            alt="Movie App Logo"
            className="h-8 w-auto object-contain invert"
          />
        </a>

        {/* Search */}
        <div className="flex flex-1 max-w-xl">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search movies..."
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-l-lg text-white placeholder-gray-500 outline-none focus:border-red-500"
          />

          <button
            onClick={handleSearch}
            className="px-5 bg-red-600 text-white rounded-r-lg hover:bg-red-700 transition"
          >
            Search
          </button>
        </div>

        {/* Authentication Buttons */}
        <div className="flex items-center gap-4 ml-auto">
          <button className="text-white hover:text-red-400 transition">
            Login
          </button>

          <button className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
