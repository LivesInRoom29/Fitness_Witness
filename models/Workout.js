const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now },

  exercises: [
    {
      type: {
        type: String,
        trim: true,
        required: [true, "Exercise type is required."]
      },

      name: {
        type: String,
        trim: true,
        required: [true, "Exercise name is required."],
        //validation not working
        validate: {
          validator: function (v) {
            if (v === "") {
              return false;
            } else {
              return true;
            }
          }
        }
      },

      duration: {
        type: Number,
        required: [true, "Duration is required."]
      },

      distance: {
        type: Number,
      },

      weight: {
        type: Number,
      },

      sets: {
        type: Number,
      },

      reps: {
        type: Number,
      },

    }
  ],
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;