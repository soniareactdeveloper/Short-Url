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

  const existUrl = await ShortUrlSchema.findOneAndUpdate(
    { url }, 
    { $set: { shortID: shortId } }, 
    { new: true } 
  );

  // If URL already exists, return the existing short URL
  if (existUrl) {
    return res.json({
      message: "Short URL already exists",
      longUrl : existUrl.url,
      shortUrl: `https://localhost:8000/${existUrl.shortID}`,
    });
  }
  

  // Save short URL in database
  const shortUrl = new ShortUrlSchema({
    url: url,
    shortID: shortId,
  });

  try {
    await shortUrl.save(); // Save to DB

    // Return the generated short URL
    res.json({
      message: "Short URL generated",
      longUrl: url, 
      shortUrl: `https://localhost:8000/${shortId}`,
    });
  } catch (error) {
    res.status(500).json({ error: "Error saving to the database" });
  }
};

module.exports = makeShortUrl;
