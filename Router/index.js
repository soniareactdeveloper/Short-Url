const express = require('express');
const apiRoute = require('./api');
const renderUrl = require('../Controllers/shorturl/renderUrl');
const router = express.Router();

router.use("/api/v1", apiRoute);

router.get("/:shortID", renderUrl);

router.get("/",(req,res) => {
  res.render("home");
});

router.use((req,res)=>{
  res.status(404).json({ message: "Page Is Not Found" });
})

module.exports = router;