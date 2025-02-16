// pages/api/proxy.js
import axios from 'axios';

export default async function handler(req, res) {
    try {
        const response = await axios.get('https://api.mangadex.org/manga', {
            params: req.query, // Forward query parameters
            headers: {
                'Content-Type': 'application/json',
            }
        });

        res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
}
