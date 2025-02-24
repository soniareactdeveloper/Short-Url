const ShortUrlSchema = require("../../Model/ShortUrlSchema");

const renderUrl = async (req, res) => {
  const shortID = req.params.shortID;
  const existUrl = await ShortUrlSchema.findOneAndUpdate(
    { shortID },
    { $push: { visitHistory: { clickedAt: new Date() } } },
    { new: true }
  );

  if (!existUrl) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  return res.redirect(existUrl.url);
};

const visitHistory = async (req, res) => {
  const shortID = req.params.shortID;
  const existUrl = await ShortUrlSchema.findOne({ shortID });

  if (!existUrl) {
    return res.status(404).json({ error: "ID NOT FOUND" });
  }

  return res.json(existUrl.visitHistory);
};

module.exports = { renderUrl, visitHistory };
