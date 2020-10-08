const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  name: {
    type: String,
    trim: true,
    unique: true
  },
  
  duration: {
    type: Number,
    required: "Duration is required."
  }
});

const Workout = mongoos.model("Workout", WorkoutSchema);

module.exports = Workout;