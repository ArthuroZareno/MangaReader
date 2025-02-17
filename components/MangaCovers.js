import { useEffect, useState } from "react";

const MangaCovers = ({ mangaId }) => {
  const [coverUrl, setCoverUrl] = useState("");

  useEffect(() => {
    const fetchCover = async () => {
      try {
        const response = await fetch(`https://api.mangadex.org/cover?manga[]=${mangaId}`);
        const data = await response.json();

        if (data.data.length > 0) {
          const coverFilename = data.data[0].attributes.fileName;
          const originalImageUrl = `https://uploads.mangadex.org/covers/${mangaId}/${coverFilename}`;

          // Use proxy API to fetch images
          const proxiedImageUrl = `/api/proxy?url=${encodeURIComponent(originalImageUrl)}`;
          setCoverUrl(proxiedImageUrl);
        }
      } catch (error) {
        console.error("Error fetching cover:", error);
      }
    };

    fetchCover();
  }, [mangaId]);

  return (
    <div>
      {coverUrl ? (
        <img src={coverUrl} alt="Manga Cover" style={{ width: "200px", height: "300px" }} />
      ) : (
        <p>Loading cover...</p>
      )}
    </div>
  );
};

export default MangaCovers;
