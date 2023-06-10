const express = require("express");
const router = express.Router();
const ejs = require("ejs");
const {user} = require("../../models");
router.use(express.json());

router.post("/createUser", async (req, res) => {
  // Create a new user
  const test = await user.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  console.log("Justin's auto-generated ID:", test.id);
  res.render("./user/user.ejs", {
    user: test ,
  });
});

router.delete("/:id", async (req, res) => {
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
module.exports = router;
