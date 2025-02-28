const ShortUrlSchema = require("../../Model/ShortUrlSchema");

const renderUrl = async (req, res) => {
  const shortID = req.params.shortID;

  try {
    const existUrl = await ShortUrlSchema.findOneAndUpdate(
      { shortID },
      { $push: { visitHistory: { clickedAt: new Date() } } },
      { new: true }
    );

    if (!existUrl) {
      return res.render("error", {
        error: "Oops! The page you are looking for doesn't exist."
      });
    }

    return res.redirect(existUrl.url);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred while redirecting." });
  }
};

const visitHistory = async (req, res) => {
  const shortID = req.params.shortID;

  try {
    const existUrl = await ShortUrlSchema.findOne({ shortID });

    if (!existUrl) {
      return res.status(404).json({ error: "ID NOT FOUND" });
    }

    return res.json(existUrl.visitHistory);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred while fetching visit history." });
  }
};

module.exports = { renderUrl, visitHistory };
