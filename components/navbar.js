import { useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext";
import { FaSearch } from "react-icons/fa";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [ setSearchResults] = useState([]);
  const { darkMode } = useContext(ThemeContext);
  const router = useRouter();

  // Handle Search Input
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const res = await axios.get(
        `https://api.mangadex.org/manga?title=${query}&limit=5&includes[]=cover_art`
      );
      setSearchResults(res.data.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <nav
      className={`py-3 px-5 flex justify-between items-center transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Logo */}
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
        Manga Reader
      </h1>

      {/* Search Bar */}
      <div className="relative flex items-center gap-4">
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            placeholder="Search manga..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-3 py-2 rounded-md w-48 md:w-64 text-black"
          />
          <button
            type="submit"
            className="ml-2 px-3 py-2 bg-white-500 rounded-md hover:bg-white-600"
          >
            <FaSearch size={20} />
          </button>
        </form>

      </div>
    </nav>
  );
}
