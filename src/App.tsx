import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Search from "./components/SearchBar/SearchBar";
import MovieDetails from "./pages/MovieDetails/MovieDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Home page */}
        <Route path="/" element={<Home />} />

        {/* Search page */}
        <Route path="/search" element={<Search />} />

        {/* Movie details page */}
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
