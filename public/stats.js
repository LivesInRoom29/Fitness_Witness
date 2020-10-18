// get all workout data from back-end
fetch("/api/workouts/range")
  .then(response => {
    return response.json();
  })
  .then(data => {
    // Use the past 7 days of workouts populate the charts
    populateChart(data.splice(-7));
  });


API.getWorkoutsInRange()

// Colors for charts
function generatePalette() {
  const arr = [
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600",
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600"
  ]

  return arr;
}

function populateChart(data) {
  console.log("data: ", data);
  // an array of
  let dateLabels = dates(data);
  let durations = duration(data);
  let pounds = calculateTotalWeight(data);
  const colors = generatePalette();
  // object containing all the exercises with their total durations
  const exerciseDurations = exerciseDurationTotals(data);
  const eachExercise = Object.keys(exerciseDurations);
  const totalDurationOfEachExerise = Object.values(exerciseDurations);

  //Object containing all the exercises with their total pounds
  const maxPounds = exerciseMaxPounds(data);
  const maxPoundsByExercise = Object.values(maxPounds);

  let line = document.querySelector("#canvas").getContext("2d");
  let bar = document.querySelector("#canvas2").getContext("2d");
  let pie = document.querySelector("#canvas3").getContext("2d");
  let pie2 = document.querySelector("#canvas4").getContext("2d");

  let lineChart = new Chart(line, {
    type: "line",
    data: {
      labels: dateLabels,
      datasets: [
        {
          label: "Workout Duration In Minutes",
          backgroundColor: "red",
          borderColor: "red",
          data: durations,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      mainAspectRatio: false,
      title: {
        display: true,
        text: "Workout Duration for the Past 7 Workouts",
        fontSize: 20
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },

          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            }
          }
        ]
      }
    }
  });

  let barChart = new Chart(bar, {
    type: "bar",
    data: {
      labels: dateLabels,
      datasets: [
        {
          label: "Pounds",
          data: pounds,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      mainAspectRatio: false,
      title: {
        display: true,
        text: "Pounds Lifted During the Past 7 Workouts",
        fontSize: 20
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });

  let pieChart = new Chart(pie, {
    type: "pie",
    data: {
      labels: eachExercise,
      datasets: [
        {
          label: "Excercises Performed - By Duration",
          backgroundColor: colors,
          data: totalDurationOfEachExerise
        }
      ]
    },
    options: {
      responsive: true,
      mainAspectRatio: false,
      title: {
        display: true,
        text: "Excercises Performed - By Duration",
        fontSize: 20
      }
    }
  });

  let donutChart = new Chart(pie2, {
    type: "doughnut",
    data: {
      labels: eachExercise,
      datasets: [
        {
          label: "Excercises Performed - By Pounds",
          backgroundColor: colors,
          data: maxPoundsByExercise
        }
      ]
    },
    options: {
      responsive: true,
      mainAspectRatio: false,
      title: {
        display: true,
        text: "Excercises Performed - Max Weight",
        fontSize: 20
      }
    }
  });
};

// Add up the duration of individual exercises within a workout to get total duration per workout
function duration(data) {
  let durations = [];

  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      durations.push(exercise.duration);
    });
  });

  return durations;
};

// Format the workout dates in 01/01/2020 format to use as labels in bar and line graphs
function dates(data) {
  let dates = [];
  data.forEach(workout =>{
    dates.push(moment(new Date(workout.day)).format("L"));
  });
  return dates;
};

// Create an array that has the total weight for each workout
function calculateTotalWeight(data) {
  let total = [];

  data.forEach(workout => {
    let workoutTotal = 0;
    workout.exercises.forEach(exercise => {
      if (exercise.weight) {
        workoutTotal += exercise.weight
      }
    });
    total.push(workoutTotal);
  });
  console.log("totals: ", total);
  return total;
};

// Create an object that contains all unique exercise names with their total duration
const exerciseDurationTotals = (data) => {
  // create an object for exercises
  let exerciseDurations = {}

  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      // capitalize the first letter of each word in the exercise name
      exerciseName = titleCase(exercise.name);

      //check to see if the exercise is in the array already
      if (exerciseName in exerciseDurations) {
        // if it is, add to the duration
        exerciseDurations[exerciseName] += exercise.duration;
      } else {
        // if it's not, create a new key for that exercise with the duration of that exercise
        exerciseDurations[exerciseName] = exercise.duration;
      }
    });
  });

  return exerciseDurations;
};

// Create an object that contains all unique exercise names with their max weight lifted
const exerciseMaxPounds = (data) => {
  let exercisePounds = {}

  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      // capitalize the first letter of each word in the exercise name
      exerciseName = titleCase(exercise.name);

      //check to see if the exercise is in the array already
      if (exerciseName in exercisePounds) {
        // if it is, check to see if weight is more; if it is, change the weight to the new value
        if (exercisePounds[exerciseName] < exercise.weight) {
          exercisePounds[exerciseName] = exercise.weight;
        }
      } else {
        // if it's not, create a new key for that exercise with the weight used for that exercise
        exercisePounds[exerciseName] = exercise.weight;
      }
    });
  });

  return exercisePounds;
}

// Utility functions:

// To capitalize a string
const capitalize = (string) => {
  // Concatinate the capitalized first letter with the rest of the string
  if (typeof string !== 'string' || string === "") {
    return "";
  } else {
    return string[0].toUpperCase() + string.slice(1);
  }
};

// To capitalize the first letter of each word in a string
const titleCase = (string) => {
  return string.split(" ").map(word => {
    if (word === "") {
      return ""
    } else {
      return capitalize(word);
    }
  }).join(" ");
};
