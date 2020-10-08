// Central sending place for all routes

const express = require("express");

const workoutRoutes = require("./workouts");

const AppRouter = express.Router();

AppRouter.use("/workouts");