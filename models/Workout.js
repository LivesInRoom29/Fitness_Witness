const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now },
    
  exercises: [
    {
      type: Schema.Types.ObjectId, // type is the id given to each exercise
      ref: "Exercise" // relates the Exercise collection to the Workout collection
    }
  ]
});

const Workout = mongoos.model("Workout", WorkoutSchema);

module.exports = Workout;