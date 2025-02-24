const express = require('express');
const apiRoute = require('./api');
const renderUrl = require('../Controllers/shorturl/renderUrl');
const { homePage, loginPage, registerPage } = require('./staticFile');
const router = express.Router();

router.use("/api/v1", apiRoute);

router.get("/", homePage);
router.get("/login", loginPage);
router.get("/register", registerPage);

router.get("/:shortID", renderUrl);
router.use((req,res)=>{
  res.status(404).json({ message: "Page Is Not Found" });
})

module.exports = router;