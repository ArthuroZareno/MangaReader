import axios from "axios";

export default async function handler(req, res) {
  try {
    const { query } = req;
    const response = await axios.get(
      `https://api.mangadex.org/manga?limit=${query.limit || 30}&order[followedCount]=desc&includes[]=cover_art`
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching data from MangaDex:", error);
    res.status(500).json({ error: "Failed to fetch manga data" });
  }
}
