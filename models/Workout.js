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
      name: {
        type: String,
        trim: true,
      },

      duration: {
        type: Number,
        required: "Duration is required."
      }
    }
  ],

  totalDistance: {
    type: Number,
    default: 0
  },

  totalDuration: {
    type: Number,
    default: 0
  },

  totalWeight: {
    type: Number,
    default: 0
  },

  totalSets: {
    type: Number,
    default: 0
  },

  totalReps: {
    type: Number,
    default: 0
  }

});

// UserSchema.methods.setTotalDistance = function() {

// }

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;