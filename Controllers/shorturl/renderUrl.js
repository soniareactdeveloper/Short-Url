const ShortUrlSchema = require("../../Model/ShortUrlSchema");

const renderUrl = async (req, res) => {
  const shortID = req.params.shortID;

  try {
    const existUrl = await ShortUrlSchema.findOne({ shortID });

    if (!existUrl) {
      return res.render("error", {
        error: "Oops! The page you are looking for doesn't exist."
      });
    }

    if(existUrl.isAuth){
      const url =  await ShortUrlSchema.findOneAndUpdate(existUrl._id,  { $push: { visitHistory: { clickedAt: new Date() } } },
      { new: true })
      res.redirect(url.url);
    }else {
      res.redirect(existUrl.url);     
    }


  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred while redirecting." });
  }
};
module.exports = renderUrl;
