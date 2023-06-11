const express = require("express");
const router = express.Router();
const ejs = require("ejs");
const { user, characters } = require("../../models");
router.use(express.json());

router.post("/createCharacter", async (req, res) => {
  // Create a new user
  const test = await characters.create({
    accountID: req.user.id,
    class: req.body.class,
    hardcore: req.body.hardcore,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  res.render("./user/user.ejs", {
    characters: test,
  });
});

router.get("/createCharacter", async (req, res) => {
  if(!req.user)
  {
    res.redirect("/login");
  }
  res.render("./characters/createCharacter.ejs")
});

router.get("/:userId/", async (req, res) => {
  const userId = parseInt(req.params.userId);
  console.log(userId);
  try {
    const userCharacters = await characters.findAll({
      where: {
        accountID: userId,
      },
    });
    res.send(userCharacters);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving user characters" });
  }
});

router.delete("/:id", async (req, res) => {
  const characterID = parseInt(req.params.id);

  try {
    const deletedChar = await characters.destroy({
      where: { id: characterID },
    });

    if (deletedChar === 0) {
      return res.status(404).json({ error: "Character not found" });
    }

    res.json({ message: "Character deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the character" });
  }
});

router.get("/", async (req, res) => {
  try {
    console.log(req.user);
    const userCharacterData = await characters.findAll({
      where: {
        accountID: req.user.id,
      },
    }); 
    res.render("./characters/characters", { userCharacterData });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
