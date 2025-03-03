const express = require('express');
const apiRoute = require('./api');
const { homePage, loginPage, registerPage } = require('./staticFile');
const validateUser = require('../middleware/AuthValidation');
const renderUrl = require('../Controllers/shorturl/renderUrl');
const router = express.Router();

// API route
router.use(process.env.BASE_URL, apiRoute);

// Static pages
router.get("/", homePage);
router.get("/login", loginPage);
router.get("/register", registerPage);
router.get("/dashboard", validateUser, (req, res) => {
 res.send(req.user)
  console.log(req.user)
});


router.get("/:shortID", renderUrl);

router.use((req, res) => {
  res.render("error");
});

module.exports = router;
