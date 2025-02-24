const express = require('express');
const apiRoute = require('./api');
const { homePage, loginPage, registerPage } = require('./staticFile');
const { renderUrl, visitHistory } = require('../Controllers/shorturl/renderUrl');
const router = express.Router();

router.use("/api/v1", apiRoute);

router.get("/", homePage);
router.get("/login", loginPage);
router.get("/register", registerPage);

router.get("/:shortID", renderUrl);
router.get("/visithistory/:shortID", visitHistory );
router.use((req,res)=>{
  res.status(404).json({ message: "Page Is Not Found" });
})

module.exports = router;