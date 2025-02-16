import "../styles/global.css";
import { ThemeProvider, ThemeContext } from "../context/ThemeContext";
import { useContext, useEffect } from "react";
import { FaFacebook, FaInstagram, FaMoon, FaSun } from "react-icons/fa";
import Image from "next/image";

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AppContent>
        <Component {...pageProps} />
      </AppContent>
    </ThemeProvider>
  );
}

function AppContent({ children }) {
  const { darkMode } = useContext(ThemeContext);

  // Set dark mode on <html> tag for global effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <Navbar />
      {children}
    </div>
  );
}

// Navbar Component
function Navbar() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className={`flex items-center justify-between p-4 md:px-8 shadow-md transition-all duration-300 
      ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>

      {/* Logo */}
      <div className="flex items-center">
        <Image src="/parables.png" alt="MangaReader Logo" width={60} height={60} priority />
        <h1 className="text-2xl font-bold cursor-pointer">Parables Scans</h1>
      </div>

      {/* Social Icons - Shown only on medium screens and up */}
      <div className="hidden md:flex items-center space-x-4">
        <span className="font-medium">Follow me on:</span>
        <a href="https://www.facebook.com/johnarthuro.zareno.3" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 hover:text-blue-500">
          <FaFacebook size={20} />
        </a>
        <a href="https://www.instagram.com/arthurrzrn/" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 hover:text-pink-500">
          <FaInstagram size={20} />
        </a>
      </div>

      <button onClick={toggleTheme} className="flex items-center space-x-2 hover:opacity-80">
        {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
        <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
      </button>
    </nav>
  );
}