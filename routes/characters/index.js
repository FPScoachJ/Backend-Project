const express = require("express");
const router = express.Router();
const ejs = require("ejs");
const { user, characters } = require("../../models");
router.use(express.json());

router.post("/createCharacter", async (req, res) => {
  // Create a new user
  const test = await characters.create({
    accountID: req.body.accountID,
    class: req.body.class,
    hardcore: req.body.hardcore,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  console.log("Justin's auto-generated ID:", test.id);
  res.render("./user/user.ejs", {
    characters: test,
  });
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

module.exports = router;
