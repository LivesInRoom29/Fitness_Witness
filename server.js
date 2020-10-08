// import required modules
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

// set the port to used process.env or port 3000 if that's not available.
const PORT = process.env.PORT || 3000;

//const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use the public folder to serve HTML, CSS, and front end JS
app.use(express.static("public"));

// setup connection to the db using mongoose
// if deployed, use that db, otherwise use the local db
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitnessdb", { useNewUrlParser: true });

// Start the server
app.listen(PORT, () => console.info(`Listening on PORT: ${PORT}`));