const jwt = require("jsonwebtoken");

const validateUser = (req, res, next) => {
  try {
  const token = req.cookies;

  if (token.access_token) {
      jwt.verify(token.access_token, process.env.JWT_KEY, function(err, decoded) {
        if (err) {
          req.user = null;
          next();
        }
        if (decoded.data) {
          req.user = decoded.data;
          next();
        }
      });
    } else {
      req.user = null;
      next();
    }
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = validateUser;
