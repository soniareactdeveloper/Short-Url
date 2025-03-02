const express = require('express');
const apiRoute = require('./api');
const { homePage, loginPage, registerPage } = require('./staticFile');
const { renderUrl, visitHistory } = require('../Controllers/shorturl/renderUrl');
const validateUser = require('../middleware/AuthValidation');
const router = express.Router();

// API route
router.use(process.env.BASE_URL, apiRoute);

// Static pages
router.get("/", homePage);
router.get("/login", loginPage);
router.get("/register", registerPage);
router.get("/dashboard", validateUser, (req, res) => {
  res.send("dashboard")
});


router.get("/:shortID", renderUrl);
router.get("/visithistory/:shortID", visitHistory);

router.use((req, res) => {
  res.render("error");
});

module.exports = router;
