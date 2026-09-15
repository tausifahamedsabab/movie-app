import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Genre from "./pages/Genre/Genre";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import MovieDetails from "./pages/MovieDetails/MovieDetails";

import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import Trending from "./pages/Trending/Trending";
import TopRated from "./pages/TopRated/TopRated";
import Upcoming from "./pages/Upcoming/Upcoming";
import Favorites from "./pages/Favorites/Favorites";

const App = () => {
  return (
    <div className="min-h-screen bg-[#07070a] text-white">
      {/* Navbar */}
      <Navbar />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="min-h-screen lg:ml-64">
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
  );
};

export default App;
