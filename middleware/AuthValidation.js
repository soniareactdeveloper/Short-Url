const jwt = require("jsonwebtoken");

const validateUser = (req, res, next) => {
  const token = req.cookies.access_token;
   if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    var decoded = jwt.verify(token, process.env.JWT_KEY);

    if (decoded.data) {
      req.user = decoded.data;
      next();
    } else {
      return res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = validateUser;
