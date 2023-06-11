const express = require("express");
const router = express.Router();
const passport = require("passport");
const ejs = require("ejs");

router.get("/", async (req, res) => {
    res.render("./login/login.ejs");
})


router.post(
  "/password",
  passport.authenticate("local", {
    failureRedirect: "/login?bla",
    //failureMessage: true,
  }),
  function (req, res) {
    res.redirect("/characters");
  }
);

module.exports = router;