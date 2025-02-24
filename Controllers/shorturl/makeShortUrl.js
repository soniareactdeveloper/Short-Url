const generateShortId = require("../../Helper/generateShortId");
const isUrlValid = require("../../Helper/isUrlValid");
const ShortUrlSchema = require("../../Model/ShortUrlSchema");

const makeShortUrl = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.render("home",{
      error: "URL is required",
    })
  }

  // Validate URL format
  if (!isUrlValid(url)) {
    return res.render("home",{
      error: "URL is invalid",
    })
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
    return res.render("home",{
      message: "Short URL generated",
      longUrl: existUrl.url,
      shortUrl: `http://localhost:8000/${shortId}`,
    })
  }
  

  // Save short URL in database
  const shortUrl = new ShortUrlSchema({
    url: url,
    shortID: shortId,
  });

  try {
    await shortUrl.save(); 

    // Return the generated short URL
    res.render("home",{
      message: "Short URL generated",
      longUrl: url,
      shortUrl: `http://localhost:8000/${shortId}`,
    })
  } catch (error) {
    res.status(500).json({ error: "Error saving to the database" });
  }
};

module.exports = makeShortUrl;
