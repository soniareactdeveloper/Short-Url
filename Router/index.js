const express = require('express');
const apiRoute = require('./api');
const { homePage, loginPage, registerPage } = require('./staticFile');
const validateUser = require('../middleware/AuthValidation');
const renderUrl = require('../Controllers/shorturl/renderUrl');
const UserSchema = require('../Model/UserSchema');
const router = express.Router();

// API route
router.use(process.env.BASE_URL, apiRoute);

// Static pages
router.get("/", validateUser, homePage);
router.get("/login", loginPage);
router.get("/register", registerPage);
router.get("/logout",(req, res) => {
  res.clearCookie('access_token').redirect("/login")
  });
router.get("/dashboard", validateUser, async(req, res) => {
  if(req.user){
    const UserData = await UserSchema.findById(req.user.id).select("-password").populate("shortUrls")
    console.log(UserData)
    res.render("dashboard",{
      urlHistory: UserData,
      loggedUser: req.user,
    })

  }else{
    res.redirect("/login");
  }
  console.log(req.user)
});


router.get("/:shortID", renderUrl);

router.use((req, res) => {
  res.render("error");
});

module.exports = router;
