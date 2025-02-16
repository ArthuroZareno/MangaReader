import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar from "../../components/navbar";

export default function Chapter() {
  const router = useRouter();
  const { id } = router.query;
  const [pages, setPages] = useState([]);
  const [chapterNumber, setChapterNumber] = useState(null);
  const [prevChapter, setPrevChapter] = useState(null);
  const [nextChapter, setNextChapter] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchChapterPages = async () => {
      try {
        const res = await axios.get(`https://api.mangadex.org/at-home/server/${id}`);
        const baseUrl = res.data.baseUrl;
        const hash = res.data.chapter.hash;
        const pageArray = res.data.chapter.data.map((page) => `${baseUrl}/data/${hash}/${page}`);
        setPages(pageArray);

        const chapterRes = await axios.get(`https://api.mangadex.org/chapter/${id}`);
        const chapterData = chapterRes.data.data;
        setChapterNumber(chapterData.attributes.chapter);

        const mangaId = chapterData.relationships.find((rel) => rel.type === "manga").id;

        const chaptersRes = await axios.get(`https://api.mangadex.org/manga/${mangaId}/feed?translatedLanguage[]=en`);
        const sortedChapters = chaptersRes.data.data.sort(
          (a, b) => parseFloat(a.attributes.chapter) - parseFloat(b.attributes.chapter)
        );

        const currentIndex = sortedChapters.findIndex((chap) => chap.id === id);
        setPrevChapter(sortedChapters[currentIndex - 1]?.id || null);
        setNextChapter(sortedChapters[currentIndex + 1]?.id || null);
      } catch (error) {
        console.error("Error fetching chapter pages:", error);
      }
    };

    fetchChapterPages();
  }, [id]);

  if (pages.length === 0) return <p className="text-center mt-10 dark:text-white">Loading...</p>;

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center">Chapter {chapterNumber}</h1>

        <div className="flex flex-col items-center gap-4 mt-6">
          {pages.map((page, index) => (
            <Image key={index} src={page} alt={`Page ${index + 1}`} className="max-w-full rounded-lg shadow-md" />
          ))}
        </div>

        <div className="flex justify-between mt-6">
          {prevChapter ? (
            <a href={`/chapter/${prevChapter}`} className="bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600">
              ← Previous Chapter
            </a>
          ) : (
            <div></div>
          )}

          {nextChapter ? (
            <a href={`/chapter/${nextChapter}`} className="bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600">
              Next Chapter →
            </a>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
