import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Genre from "./pages/Genre/Genre";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import Trending from "./pages/Trending/Trending";
import TopRated from "./pages/TopRated/TopRated";
import Upcoming from "./pages/Upcoming/Upcoming";
import Favorites from "./pages/Favorites/Favorites";
import MovieDetails from "./pages/MovieDetails/MovieDetails";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#07070a]">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content + Footer */}
      <div className="lg:ml-64">
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/genre/:id" element={<Genre />} />
            <Route path="/search" element={<Search />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/top-rated" element={<TopRated />} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;
