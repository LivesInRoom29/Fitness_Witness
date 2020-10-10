const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },

  duration: {
    type: Number,
    required: "Duration is required."
  }
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;