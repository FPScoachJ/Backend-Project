const express = require("express");
const app = express();
const PORT = 3001;
const characters = require("./routes/characters");
const user = require("./routes/user");
const events = require("./routes/events");

app.set("views", "./views");
// Set the view engine to EJS
app.set('view engine', 'ejs');
// Serve static files from the 'public' folder
app.use(express.static('public'));

app.use("/characters", characters);
app.use("/user", user);
app.use("/events", events);
app.listen(PORT, console.log(`listening on port ${PORT}`));
app.get("/", (req, res) => {
  const message = "Wanna play?";
  res.render("index", { message });
});