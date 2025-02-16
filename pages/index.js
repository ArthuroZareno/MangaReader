import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ThemeContext } from "../context/ThemeContext";
import Footer from "../components/Footer";
import Image from 'next/image';


export default function Home() {
  const [mangaList, setMangaList] = useState([]);
  const [featuredManga, setFeaturedManga] = useState([]);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    const fetchManga = async () => {
      try {
        console.log("Fetching manga from /api/proxy...");
        const res = await axios.get("/api/proxy", {
          params: {
            limit: 30,
            "order[followedCount]": "desc",
            "includes[]": "cover_art",
          },
        });

        console.log("Manga data received:", res.data);
        setMangaList(res.data.data);
        setFeaturedManga(res.data.data.slice(0, 6));
      } catch (error) {
        console.error("Error fetching manga:", error);
      }
    };

    fetchManga();
  }, []);

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
              ? `https://uploads.mangadex.org/covers/${manga.id}/${coverArt.attributes.fileName}.512.jpg`
              : "/placeholder.jpg";

            return (
              <Link key={manga.id} href={`/manga/${manga.id}`} className="block p-2">
                <Image
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
              ? `https://uploads.mangadex.org/covers/${manga.id}/${coverArt.attributes.fileName}.256.jpg`
              : "/placeholder.jpg";

            return (
              <Link key={manga.id} href={`/manga/${manga.id}`} className={`block shadow rounded-lg p-2 hover:scale-105 transition ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                <Image src={coverUrl} alt={manga.attributes.title.en} className="rounded-md w-full h-52 object-cover" />
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
