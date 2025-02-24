const ShortUrlSchema = require("../../Model/ShortUrlSchema");

const renderUrl = async (req, res) => {
    const shortID = req.params.shortID;
    
    const existUrl = await ShortUrlSchema.findOne({
       shortID });

    if (!existUrl) {
      return res.status(404).json({ error: "Short URL not found" });
    }

   res.redirect(existUrl.url);  
};

module.exports = renderUrl;
