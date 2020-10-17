const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now },

  // exercises: [
  //   {
  //     type: Schema.Types.ObjectId, // type is the id given to each exercise
  //     ref: "Exercise" // relates the Exercise collection to the Workout collection
  //   }
  // ],

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

  // totalDistance: {
  //   type: Number,
  //   default: 0
  // },

  // totalDuration: {
  //   type: Number,
  //   default: 0
  // },

  // totalWeight: {
  //   type: Number,
  //   default: 0
  // },

  // totalSets: {
  //   type: Number,
  //   default: 0
  // },

  // totalReps: {
  //   type: Number,
  //   default: 0
  // }

});

WorkoutSchema.methods.setTotalDuration = function() {
  this.exercises.forEach(exercise => {
    this.totalDuration += exercise.duration;
  });

  return this.totalDuration;
};

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;