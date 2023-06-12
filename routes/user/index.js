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
    res.redirect("/login");
  });
});

router.get("/createUser", async (req, res) => {
  res.render("./user/createUser.ejs");
});

router.post("/deleteUser", async (req, res) => {
  if (!req.user) {
    res.redirect("/login");
    return;
  }
  const userID = req.user.id;

  try {
    const deletedUser = await user.destroy({
      where: { id: userID },
    });

    if (deletedUser === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/login");
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the user" });
  }
});

router.get("/updateUser/", async (req, res) => {
  if (!req.user) {
    res.redirect("/login");
    return;
  }
  const userID = req.user.id;

  try {
    const userToUpdate = await user.findByPk(userID);

    if (!userToUpdate) {
      return res.status(404).json({ error: "User not found" });
    }

    res.render("./user/user.ejs", {
      user: userToUpdate,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the user" });
  }
});

router.post("/updateUser", async (req, res) => {
  if (!req.user) {
    res.redirect("/login");
    return;
  }
  const userID = await req.user.id;
  const { name, email, password } = req.body;
  try {
    const userToUpdate = await user.findByPk(userID);
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      userToUpdate.set({ name: name, email: email, password: hash });
      await userToUpdate.save();
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the user" });
  }
  res.redirect("/user/updateUser");
});

module.exports = router;
