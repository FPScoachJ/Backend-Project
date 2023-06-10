const express = require("express");
const router = express.Router();
const ejs = require("ejs");
const { user } = require("../../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;
router.use(express.json());

router.post("/createUser", async (req, res) => {
  // Create a new user
  bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
    // Store hash in your password DB.
    const test = await user.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.render("./user/user.ejs", {
      user: test,
    });
  });
});

router.get("/createUser", async (req, res) => {
  res.render("./user/createUser.ejs");
});

router.post("/:id", async (req, res) => {
  const userID = parseInt(req.params.id);

  try {
    const deletedUser = await user.destroy({
      where: { id: userID },
    });

    if (deletedUser === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the user" });
  }
});

router.get("/:id", async (req, res) => {
  res.render("./user/deleteUser.ejs");
});

module.exports = router;
