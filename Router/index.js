const express = require('express')
const router = express.Router();

router.use("/api/v1", (req, res) => {
  res.json({ message: "API v1 is running" });
})

router.use((req,res)=>{
  res.status(404).json({ message: "Page Is Not Found" });
})

module.exports = router;