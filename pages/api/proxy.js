export default async function handler(req, res) {
    try {
      const { limit, order, includes } = req.query;
  
      const apiUrl = `https://api.mangadex.org/manga?limit=${limit}&order[followedCount]=${order}&includes[]=${includes}`;
  
      const response = await fetch(apiUrl, {
        headers: { "Content-Type": "application/json" },
      });
  
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("API Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  