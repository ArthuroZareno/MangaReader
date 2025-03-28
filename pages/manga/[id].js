import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar from "../../components/navbar";
import Image from "next/image";

export default function MangaDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [manga, setManga] = useState(null);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    if (!id) return;

    const fetchMangaDetails = async () => {
      try {
        // ✅ Fetch Manga Details
        const mangaRes = await axios.get(`/api/manga?id=${id}`);
        if (!mangaRes.data.data) {
          console.error("Manga data is missing!");
          return;
        }
        setManga(mangaRes.data.data);

        // ✅ Fetch Chapters and Sort
        const chaptersRes = await axios.get(
          `https://api.mangadex.org/manga/${id}/feed?limit=50&translatedLanguage[]=en`
        );
        if (chaptersRes.data.data) {
          const sortedChapters = chaptersRes.data.data
            .filter((ch) => ch.attributes.chapter) // Remove undefined chapters
            .sort((a, b) => parseFloat(a.attributes.chapter) - parseFloat(b.attributes.chapter));
          setChapters(sortedChapters);
        }
      } catch (error) {
        console.error("Error fetching manga details:", error);
      }
    };

    fetchMangaDetails();
  }, [id]);

  // ✅ Show loading until manga data is available
  if (!manga || !manga.attributes) {
    return <p className="text-center mt-10 dark:text-white">Loading...</p>;
  }

  // ✅ Fix Cover Image URL
  const coverArt = manga.relationships?.find((rel) => rel.type === "cover_art");
  const coverUrl = coverArt?.attributes?.fileName
    ? `https://uploads.mangadex.org/covers/${manga.id}/${coverArt.attributes.fileName}.256.jpg`
    : "/placeholder.jpg";

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="grid md:grid-cols-3 gap-6">
          {/* ✅ Manga Cover */}
          <div>
            <Image 
              src={coverUrl} 
              alt="Manga Cover" 
              width={250} 
              height={350} 
              className="rounded-lg shadow-md" 
            />
          </div>

          {/* ✅ Manga Info (Check for Title) */}
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold">
              {manga.attributes.title?.en || manga.attributes.title?.ja || "Unknown Title"}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {manga.attributes.description?.en || "No description available."}
            </p>
            <p className="mt-2 font-semibold">Status: {manga.attributes.status || "Unknown"}</p>

            {/* ✅ Genres */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Genres</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {manga.attributes.tags?.map((tag) => (
                  <span key={tag.id} className="bg-gray-300 dark:bg-gray-700 px-3 py-1 rounded-full text-sm">
                    {tag.attributes.name.en}
                  </span>
                )) || "No genres available."}
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Chapters List */}
        <h2 className="text-2xl font-semibold mt-6">Chapters</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {chapters.length > 0 ? (
            chapters.map((chapter) => (
              <a
                key={chapter.id}
                href={`/chapter/${chapter.id}`}
                className="bg-white dark:bg-gray-800 shadow-md p-4 rounded-lg hover:shadow-xl transition duration-300 flex justify-between items-center"
              >
                <span>Chapter {chapter.attributes.chapter || "?"}</span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  {new Date(chapter.attributes.updatedAt).toLocaleDateString()}
                </span>
              </a>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No chapters available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
