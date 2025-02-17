export default async function handler(req, res) {
    try {
      const response = await fetch("https://api.mangadex.org/manga?limit=10", {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch manga data");
      }
  
      const data = await response.json();
      res.status(200).json(data);
      res.setHeader("Access-Control-Allow-Origin", "*");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  