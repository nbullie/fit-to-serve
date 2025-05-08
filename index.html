const workoutPool = {
  illinois: [
    "Pushups - 3 sets of 20",
    "1.5 mile run",
    "Plank - 60 seconds",
    "Bodyweight squats - 3 sets of 25",
    "Stair sprints - 5 rounds",
    "Dead hangs - 30 seconds",
    "Mountain climbers - 3 sets of 30",
    "Jump squats - 3 sets of 15"
  ],
  lapd: [
    "300m sprint repeats",
    "Pushups - max reps",
    "Sit-ups - 3 sets of 25",
    "1.5 mile timed run",
    "Burpees - 3 sets of 15",
    "Plank with shoulder taps - 60 seconds",
    "Jump rope - 2 minutes",
    "High knees - 3 sets of 45 seconds"
  ],
  nypd: [
    "Barrier jump practice",
    "Pushups - 3 sets of 15",
    "Arm endurance holds",
    "Simulated pursuit run",
    "Tire flips (or alt object) - 5 rounds",
    "Agility ladder drills - 4 rounds",
    "Wall sits - 90 seconds",
    "Broad jumps - 3 sets of 5"
  ],
  colorado: [
    "Pushups - 2 minutes max reps",
    "Sit-ups - 2 minutes max reps",
    "300m sprint under 65 seconds",
    "1.5 mile run under 15:30",
    "Lunges - 3 sets of 20",
    "Bear crawls - 30 seconds",
    "Box jumps or step-ups - 3 sets of 12",
    "Burpees - 3 sets of 20"
  ]
};

function getRandomExercises(pool, count = 4) {
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateWorkout() {
  const test = document.getElementById("test-select").value;
  const output = document.getElementById("workout-plan");
  const section = document.getElementById("workout-output");

  if (test && workoutPool[test]) {
    const exercises = getRandomExercises(workoutPool[test]);
    section.classList.remove("hidden");

    const workoutHtml = exercises.map((item, index) => {
      const checked = localStorage.getItem(`workout_${index}`) === "true" ? "checked" : "";
      return `
        <label>
          <input type="checkbox" data-index="${index}" ${checked}> ${item}
        </label>
      `;
    }).join("");

    output.innerHTML = workoutHtml;

    document.querySelectorAll('#workout-plan input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener("change", function () {
        const index = this.getAttribute("data-index");
        localStorage.setItem(`workout_${index}`, this.checked);
      });
    });
  } else {
    section.classList.add("hidden");
    output.innerHTML = "";
  }
}

const tips = [
  "Stay consistent—progress beats perfection.",
  "Hydration is your secret weapon for recovery.",
  "Small wins every day build unstoppable momentum.",
  "Master the basics before chasing complexity.",
  "Sleep is the most underrated performance tool.",
  "Discipline > Motivation.",
  "Warm up with purpose, train with intent, recover with respect.",
  "Fuel your body like you give a damn—because you should."
];

function showTipOfTheDay() {
  const tip = tips[Math.floor(Math.random() * tips.length)];
  const tipBox = document.getElementById("daily-tip");
  if (tipBox) tipBox.innerText = tip;
}

window.onload = showTipOfTheDay;
