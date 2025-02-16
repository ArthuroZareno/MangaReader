import { useEffect, useState, useContext } from "react";
import Navbar from "../components/navbar";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ThemeContext } from "../context/ThemeContext";
import Footer from "../components/Footer";

export default function Home() {
  const [mangaList, setMangaList] = useState([]);
  const [featuredManga, setFeaturedManga] = useState([]);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    fetchManga();
  }, []);

  // Fetch Manga Data from Next.js API
  const fetchManga = async () => {
    try {
      const response = await fetch("/api/mangadex?limit=10");
      const data = await response.json();
      if (data && data.data) {
        setMangaList(data.data);
        setFeaturedManga(data.data.slice(0, 5)); // Take first 5 for featured
      }
    } catch (error) {
      console.error("Error fetching manga data:", error);
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <Navbar />

      {/* Featured Manga Carousel */}
      <div className="container mx-auto px-3 mt-4">
        <h2 className="text-xl font-bold mb-3">Featured Manga</h2>
        <Slider {...settings} className="max-w-full mx-auto">
          {featuredManga.map((manga) => {
            const coverArt = manga.relationships.find((rel) => rel.type === "cover_art");
            const coverUrl = coverArt
              ? `/api/mangaCover?imageUrl=${encodeURIComponent(
                  `https://uploads.mangadex.org/covers/${manga.id}/${coverArt.attributes.fileName}`
                )}`
              : "/placeholder.jpg";

            return (
              <Link key={manga.id} href={`/manga/${manga.id}`} className="block p-2">
                <img
                  src={coverUrl}
                  alt={manga.attributes.title.en}
                  className="rounded-lg shadow-md w-full h-64 object-cover"
                />
                <h3 className="text-sm text-center font-medium mt-1">
                  {manga.attributes.title.en}
                </h3>
              </Link>
            );
          })}
        </Slider>
      </div>

      {/* Popular Manga Grid */}
      <div className="container mx-auto px-3 mt-5">
        <h2 className="text-xl font-bold mb-3">Popular Manga</h2>
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {mangaList.map((manga) => {
            const coverArt = manga.relationships.find((rel) => rel.type === "cover_art");
            const coverUrl = coverArt
              ? `/api/mangaCover?imageUrl=${encodeURIComponent(
                  `https://uploads.mangadex.org/covers/${manga.id}/${coverArt.attributes.fileName}`
                )}`
              : "/placeholder.jpg";

            return (
              <Link key={manga.id} href={`/manga/${manga.id}`} className={`block shadow rounded-lg p-2 hover:scale-105 transition ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                <img src={coverUrl} alt={manga.attributes.title.en} className="rounded-md w-full h-52 object-cover" />
                <h3 className="text-xs font-medium mt-1 text-center">
                  {manga.attributes.title.en}
                </h3>
              </Link>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}
