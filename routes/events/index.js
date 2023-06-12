const express = require("express");
const router = express.Router();
const ejs = require("ejs");

const { events, characters, user } = require("../../models/");

router.use(express.json());

router.post("/createEvents", async (req, res) => {
  if (!req.user) {
    res.redirect("/login");
    return;
  }
  const userID = req.user.id;

  const test = await events.create({
    userId: userID,
    charID: req.body.charID,
    hardcore: req.body.hardcore,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  res.redirect("/events");
});

router.get("/createEvents", async (req, res) => {
  if (!req.user) {
    res.redirect("/login");
    return;
  }
  const userID = req.user.id;

  const userCharacters = await characters.findAll({
    where: {
      accountID: userID
    }
  });

  res.render("./events/createEvents.ejs", { userCharacters });
});

router.put("/events/:id", async (req, res) => {
  const eventId = parseInt(req.params.id);
  const { hardcore, charID, userId } = req.body;

  try {
    const char = await characters.findByPk(charID);
    const event = await events.findByPk(eventId);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    event.set({ ...event, hardcore: char.hardcore, charId: char.id });
    // Update the event attributes
    await event.save();

    res.json(event);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the event" });
  }
});

router.get("/", async (req, res) => {
  try {
    const eventdata = await events.findAll({ include: [characters, user] });
    res.render("./events/events", { eventdata });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/:id", async (req, res) => {
  const eventID = parseInt(req.params.id);

  try {
    const deletedEvent = await events.destroy({
      where: { id: req.body.eventID },
    });

    if (deletedEvent === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.redirect("/events");
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the post" });
  }
});

router.get("/deleteEvents", async (req, res) => {
  res.render("./events/deleteEvents.ejs");
});

module.exports = router;
