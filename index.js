const express = require("express");
const app = express();
const PORT = 3001;
const path = require("path");
const characters = require("./routes/characters");
const user = require("./routes/user");
const login = require("./routes/login");
const events = require("./routes/events");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const db = require("./models");

passport.use(new LocalStrategy(async function verify(username, password, cb) {
  const users = await db.user.findAll({
    where: {
      email: username,
    },
  });

  if (users.length != 1) {
    return cb(null, false, { message: "Incorrect username or password." });
  }
  // Load hash from your password DB.
  bcrypt.compare(password, users[0].password, function (err, result) {
    // result == true
    if (result){
     return cb(null, users[0])
    } else{
      return cb(null, false, { message: "Incorrect username or password." });
    }
  });
}));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (userID, done) {
  const user = await db.user.findByPk(userID);
  done(null, user);
});

app.set("views", path.join(__dirname, "views"));
// Set the view engine to EJS
app.set('view engine', 'ejs');
// Serve static files from the 'public' folder
app.use(express.static('public'));
app.use(express.static("/views/partials"));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());




app.use("/characters", characters);
app.use("/user", user);
app.use("/events", events);
app.use("/login", login);
app.listen(PORT, console.log(`listening on port ${PORT}`));
app.get("/", (req, res) => {
  const message = "Wanna play?";
  res.render("index", { message });
});
