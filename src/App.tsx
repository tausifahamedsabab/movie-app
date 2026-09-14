import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";

import Home from "./pages/Home/Home";
import Search from "./components/SearchBar/SearchBar";
import MovieDetails from "./pages/MovieDetails/MovieDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="min-h-screen flex-1">
          <Routes>
            {/* Home page */}
            <Route path="/" element={<Home />} />

            {/* Search page */}
            <Route path="/search" element={<Search />} />

            {/* Movie details page */}
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </main>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
