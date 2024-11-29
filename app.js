require("dotenv").config();
const passport = require("passport");
const mainjs = require("./server/routes/index");
const express = require("express");
const expresslayout = require("express-ejs-layouts");
const connectDB = require("./server/config/db");
const session = require("express-session");
const Mongostore = require('connect-mongo'); 
const methodOverride = require("method-override");

const app = express();
const port = 5000 || process.env.PORT;

app.use(session({
  secret: 'mohamed-esssam', // Secret key for session encryption
  resave: false, // Avoid unnecessary session saves
  saveUninitialized: true, // Save uninitialized sessions
  store: Mongostore.create({
    mongoUrl: process.env.mongodburl, // Your MongoDB connection string
    collectionName: 'sessions', // Optional: name for the sessions collection in MongoDB
  }),
  cookie: { 
    secure: false, // Set to true for HTTPS, false for HTTP
    httpOnly: true, // Ensures cookie is sent only over HTTP(S)
    maxAge: 1000 * 60 * 60 * 24, // Session duration (1 day)
  }
}));
app.use(passport.initialize()); 
app.use(passport.session()); 
app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB();

app.use(express.static("public"));

app.use(expresslayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.use("/", mainjs);
app.use("/", require("./server/routes/dashboardroute"));
app.use("/auth", require("./server/routes/auth")); ;

app.get("*", function (req, res) {
  res.status(404).render("404");
});
app.listen(port, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
