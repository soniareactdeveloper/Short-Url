const generateShortId = require("../../Helper/generateShortId");
const isUrlValid = require("../../Helper/isUrlValid");
const ShortUrlSchema = require("../../Model/ShortUrlSchema");
const UserSchema = require("../../Model/UserSchema");

const makeShortUrl = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.render("home", {
      error: "URL is required",
    });
  }

  // Validate URL format
  if (!isUrlValid(url)) {
    return res.render("home", {
      error: "URL is invalid",
    });
  }

  // Generate short ID
  const shortId = generateShortId(url);

  if (req.user) {
    try {
      // Check if URL already exists and update if it does
      let existUrl = await ShortUrlSchema.findOneAndUpdate(
        { url },
        { $set: { shortID: shortId } },
        { new: true }
      );

      // If URL already exists, push the existing URL to the user's shortUrls array if not already there
      if (existUrl) {
        await UserSchema.findByIdAndUpdate(req.user.id, {
          $addToSet: { shortUrls: existUrl._id }
        });

        return res.render("home", {
          message: "Short URL Updated",
          longUrl: existUrl.url,
          shortUrl: `http://localhost:8000/${shortId}`,
          loggedUser: req.user,
        });
      
      }

      // Save new short URL in the database
      const shortUrl = new ShortUrlSchema({
        url: url,
        shortID: shortId,
        isAuth: true
      });

      await shortUrl.save();

      // Add the new short URL to the user's shortUrls array using $addToSet
      await UserSchema.findByIdAndUpdate(req.user.id, {
        $addToSet: { shortUrls: shortUrl._id }
      });

      // Return the generated short URL
      res.render("home", {
        message: "Short URL generated",
        longUrl: url,
        shortUrl: `http://localhost:8000/${shortId}`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error saving to the database" });
    }
  } else {
    try {
      const existUrl = await ShortUrlSchema.findOneAndUpdate(
        { url },
        { $set: { shortID: shortId } },
        { new: true }
      );

      // If URL already exists, return the existing short URL
      if (existUrl) {
        return res.render("home", {
          message: "Short URL Updated",
          longUrl: existUrl.url,
          shortUrl: `http://localhost:8000/${shortId}`,
        });
      }

      // Save short URL in database
      const shortUrl = new ShortUrlSchema({
        url: url,
        shortID: shortId,
      });

      await shortUrl.save();

      // Return the generated short URL
      res.render("home", {
        message: "Short URL generated",
        longUrl: url,
        shortUrl: `http://localhost:8000/${shortId}`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error saving to the database" });
    }
  }
};

module.exports = makeShortUrl;