const express = require("express");
const router = express.Router();
const ejs = require("ejs");


const { events,characters } = require("../../models/");

router.use(express.json());

router.post("/createEvents", async (req, res) => {
  const test = await events.create({
    userId: req.body.userID,
    charID: req.body.charID,
    hardcore: req.body.hardcore,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  res.render("./user/user.ejs", {
    events: test,
  });
   
});

router.get("/createEvents", async (req, res) => {
  res.render("./events/createEvents.ejs");
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
    event.set({ ...event, hardcore:char.hardcore,charId:char.id });
    // Update the event attributes  
    await event.save();

    res.json(event);
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ error: "An error occurred while updating the event" });
  }
});

router.get("/", async (req, res) => {
  try {
    const eventdata = await events.findAll();
    res.render("./events/events", { eventdata });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  const eventID = parseInt(req.params.id);

  try {
    const deletedEvent = await events.destroy({
      where: { id: eventID },
    });

    if (deletedEvent === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the post" });
  }
});


module.exports = router;
