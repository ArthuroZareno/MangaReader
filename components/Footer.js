import Image from "next/image";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Footer() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <footer className={`py-8 mt-10 transition duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className="max-w-5xl mx-auto text-center">
        
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Image src="/parables.png" alt="MangaReader Logo" width={150} height={50} priority />
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center space-x-6 text-sm font-medium">
          <a href="/terms" className="hover:opacity-80 transition">Terms of Service</a>
          <a href="/dmca" className="hover:opacity-80 transition">DMCA</a>
          <a href="/contact" className="hover:opacity-80 transition">Contact</a>
          <a href="/sitemap" className="hover:opacity-80 transition">Sitemap</a>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-gray-300 mt-4 px-4">
          ParablesScans does not store any files on our server, we only link to the media which is hosted on third-party services.
          For Educational Porpuses Only 
        </p>

        {/* Copyright */}
        <p className="text-xs text-gray-400 mt-2">
          &copy; {new Date().getFullYear()} ParablesScans.to
        </p>

      </div>
    </footer>
  );
}
