export default async function handler(req, res) {
    const { imageUrl } = req.query;
  
    if (!imageUrl) return res.status(400).json({ message: "Image URL is required" });
  
    try {
      const response = await fetch(imageUrl);
      const imageBuffer = await response.arrayBuffer();
  
      res.setHeader("Content-Type", response.headers.get("Content-Type"));
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(200).send(Buffer.from(imageBuffer));
    } catch (error) {
      res.status(500).json({ message: "Error fetching manga cover", error: error.message });
    }
  }
  