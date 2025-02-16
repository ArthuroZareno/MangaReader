export default async function handler(req, res) {
    try {
      // Ensure it's a GET request
      if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
      }
  
      // Extract query parameters
      const { limit = 30, order, includes } = req.query;
  
      // Construct the API URL dynamically
      const apiUrl = `https://api.mangadex.org/manga?limit=${limit}&order[followedCount]=desc&includes[]=cover_art`;
  
      console.log("Forwarding request to:", apiUrl);
  
      // Fetch data from MangaDex API
      const response = await fetch(apiUrl, {
        headers: { "Content-Type": "application/json" },
      });
  
      // If the API response is not OK, return the error
      if (!response.ok) {
        console.error(`MangaDex API Error: ${response.status}`);
        return res.status(response.status).json({ error: "Failed to fetch manga data" });
      }
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("Server Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  