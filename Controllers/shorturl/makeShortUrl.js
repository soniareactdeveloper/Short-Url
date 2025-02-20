const generateShortId = require("../../Helper/generateShortId");
const isUrlValid = require("../../Helper/isUrlValid");
const ShortUrlSchema = require("../../Model/ShortUrlSchema");

const makeShortUrl = async (req, res) => {
  const { url } = req.body;

  // Check if URL is provided
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  // Validate URL format
  if (!isUrlValid(url)) {
    return res.status(400).json({ error: "Invalid URL format" });
  }

  // Generate short ID
  const shortId = generateShortId(url);

  // Save short URL in database
  const shortUrl = new ShortUrlSchema({
    url: url,
    shortId: shortId,
  });

  try {
    await shortUrl.save(); // Save to DB

    // Return the generated short URL
    res.json({
      message: "Short URL generated",
      shortUrl: `https://localhost:8000/${shortId}`,
    });
  } catch (error) {
    res.status(500).json({ error: "Error saving to the database" });
  }
};

module.exports = makeShortUrl;
