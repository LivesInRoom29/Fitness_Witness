const express = require("express");
const db = require("../models");

const router = express.Router();

router.get("/workouts", (req, res) => {
  db.Workout.find({})
    // populate the workout with the associated exercises using the ids that were added when the exercise was created
    // .populate("exercises")
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/workouts", ({ body }, res) => {
  console.log("random string");
  db.Workout.create(body)
    .then((data) => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
    });
});

// ** Need to change to change other things in order to use this
// seed data is not set up this way.
// router.put("/workouts/:id", ({ body, params }, res) => {
//   console.log("body: ", body);
//   console.log("params: ", params);
//   // create new exercise
//   // link that to the workout by adding it's id to the array in the exercises field
//   db.Exercise.create(body)
//     .then(({ _id }) => db.Workout.findOneAndUpdate(params, { $push: { exercises: _id } }, { new: true }))
//     .then(dbWorkout => {
//       res.json(dbWorkout);
//     })
//     .catch(err => {
//       res.json(err);
//     })
// });

router.put("/workouts/:id", ({ body, params }, res) => {
    console.log("body: ", body);
    console.log("params: ", params);
    db.Workout.findByIdAndUpdate(params, body, { new: true })
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      })
  });

module.exports = router;