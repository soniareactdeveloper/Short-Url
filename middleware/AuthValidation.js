const jwt = require("jsonwebtoken");

const validateUser = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(token);
  
};

module.exports = validateUser;
