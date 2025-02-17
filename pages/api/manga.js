export default async function handler(req, res) {
    const { id } = req.query;
  
    if (!id) {
      return res.status(400).json({ error: "Missing manga ID" });
    }
  
    try {
      const response = await fetch(`https://api.mangadex.org/manga/${id}?includes[]=cover_art`);
      const data = await response.json();
      res.setHeader("Access-Control-Allow-Origin", "*"); // Allows frontend to access this API
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch manga details" });
    }
  }
  