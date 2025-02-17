export default async function handler(req, res) {
    const { id, filename } = req.query;
    
    if (!id || !filename) {
      return res.status(400).json({ error: "Missing parameters" });
    }
  
    try {
      const coverUrl = `https://uploads.mangadex.org/covers/${id}/${filename}`;
      const response = await fetch(coverUrl);
      const imageBuffer = await response.arrayBuffer();
  
      res.setHeader("Content-Type", "image/jpeg");
      res.setHeader("Cache-Control", "public, max-age=86400"); // Cache for 1 day
      res.status(200).send(Buffer.from(imageBuffer));
    } catch (error) {
      console.error("Error fetching cover image:", error);
      res.status(500).json({ error: "Failed to fetch cover" });
    }
  }
  