export default async function handler(req, res) {
  const { id, filename } = req.query;

  if (!id || !filename) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  try {
    const coverUrl = `https://uploads.mangadex.org/covers/${id}/${filename}`;
    const response = await fetch(coverUrl);

    // 🔹 If image not found (404), return placeholder
    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Cover not found: ${coverUrl}, serving placeholder.`);
        return res.redirect(302, "/placeholder.jpg"); // Redirect to a local placeholder
      }
      throw new Error(`Failed to fetch image, status: ${response.status}`);
    }

    // 🔹 Convert the image to a buffer
    const imageBuffer = await response.arrayBuffer();

    res.setHeader("Content-Type", "image/jpeg");
    res.setHeader("Cache-Control", "public, max-age=86400"); // Cache for 1 day
    res.status(200).send(Buffer.from(imageBuffer));
  } catch (error) {
    console.error("Error fetching cover image:", error);
    res.status(500).json({ error: "Failed to fetch cover image" });
  }
}
