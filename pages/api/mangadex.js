export default async function handler(req, res) {
    const limit = req.query.limit || 10;
    const apiUrl = `https://api.mangadex.org/manga?limit=${limit}`;
  
    try {
      const response = await fetch(apiUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) throw new Error("Failed to fetch data from MangaDex");
  
      const data = await response.json();
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Error fetching manga data", error: error.message });
    }
  }
  