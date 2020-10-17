const express = require("express");
const db = require("../models");

const router = express.Router();

// Get all workouts
router.get("/workouts", (req, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// Get all workouts within a given range
router.get("/workouts/range", (req, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
})

// Create a new workout
router.post("/workouts", ({ body }, res) => {
  db.Workout.create(body)
    .then((data) => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
    });
});

// to add exercise to array (update workout)
router.put("/workouts/:id", ({ body, params }, res) => {
    // body is the object with exercise data; need to add this to the exercises array in current Workout
    db.Workout.findByIdAndUpdate({ _id : params.id }, { $push: { exercises: body }}, { new: true })
      .then(dbWorkout => {
        console.log("dbWorkout: ", dbWorkout);
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      })
});

module.exports = router;