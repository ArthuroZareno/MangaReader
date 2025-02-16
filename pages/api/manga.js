export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.mangadex.org/manga?limit=30&order[followedCount]=desc&includes[]=cover_art", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch MangaDex API: ${response.status}`);
    }

    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
    res.status(200).json(data);
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
