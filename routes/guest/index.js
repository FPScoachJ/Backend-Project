const express = require("express");
const router = express.Router();
const ejs = require("ejs");
const { user, characters } = require("../../models");
router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const userCharacterData = await characters.findAll({});
    res.render("./characters/characters", { userCharacterData });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
