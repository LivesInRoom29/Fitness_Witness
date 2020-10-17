// import required modules
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const dotenv = require('env').config();

//const seeder = require("./seeders/seed.js");

// routes
const workouts = require("./routes/workouts");

// set the port to used process.env or port 3000 if that's not available.
const PORT = process.env.PORT || 3000;

const db = require("./models");

// create express app and configure middleware
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//BODY PARSER (do i need this AND lines 15-16?)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use the public folder to serve HTML, CSS, and front end JS
app.use(express.static("public"));

// all html routes
const htmlRoutes = require("./routes/html-routes");
// const { db } = require("./models/Workout");
app.use("", htmlRoutes);

// api routes
app.use("/api", workouts);

// logger middleware... what does this do exactly?
app.use(logger("dev"));

// setup connection to the db using mongoose
// if deployed, use that db, otherwise use the local db
//mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitnessdb", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.connect(process.env.MONODB_URI || process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

// Set up handlebars
app.engine("hbs", exphbs({extname: "hbs", deafultLayout: "main"}));
app.set("view engine", "hbs");

// create a workout collection, by default the day will be today, no exercises yet
// db.Workout.create({})
//   .then(dbWorkout => {
//     console.log("workout: ", dbWorkout);
//   })
//   .catch(({ message }) => {
//     console.log(message);
//   })

// Start the server
app.listen(PORT, () => console.info(`Listening on PORT: ${PORT}`));