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

function getFilteredWorkouts(pool, mode) {
  const filters = {
    standard: () => true,
    minimal: (item) =>
      !/barbell|machine|cable|gym|treadmill|lat pulldown|dumbbell|EZ/i.test(item),
    gym: (item) =>
      /barbell|machine|cable|gym|treadmill|lat pulldown|dumbbell|EZ/i.test(item)
  };
  return pool.filter(filters[mode] || filters.standard);
}

function getRandomExercises(pool, count = 4) {
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateWorkout() {
  const test = document.getElementById("test-select").value;
  const mode = document.getElementById("mode-select").value;
  const output = document.getElementById("workout-plan");
  const section = document.getElementById("workout-output");

  if (test && workoutPool[test]) {
    const filtered = getFilteredWorkouts(workoutPool[test], mode);
    const exercises = getRandomExercises(filtered);

    section.classList.remove("hidden");
    section.classList.add("fade-in", "show");

    const workoutHtml = exercises.map((item, index) => {
      const checked = localStorage.getItem(`workout_${index}`) === "true" ? "checked" : "";
      return `
        <label>
          <input type="checkbox" data-index="${index}" ${checked}> ${item}
        </label>
      `;
    }).join("");

    output.innerHTML = workoutHtml;
    output.classList.add("slide-in");
    document.getElementById("reset-button").classList.remove("hidden");
    document.getElementById("workout-timer").classList.remove("hidden");
    document.getElementById("log-entry-fields").classList.remove("hidden");

    document.querySelectorAll('#workout-plan input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener("change", function () {
        const index = this.getAttribute("data-index");
        localStorage.setItem(`workout_${index}`, this.checked);

        const checkedCount = document.querySelectorAll('#workout-plan input[type="checkbox"]:checked').length;
        if (this.checked && checkedCount === 4) {
          updateStreak();
          saveWorkoutLog(checkedCount);
        }
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

function resetProgress() {
  for (let i = 0; i < 10; i++) {
    localStorage.removeItem(`workout_${i}`);
  }
  location.reload();
}

function updateStreak() {
  const today = new Date().toLocaleDateString();
  const lastDate = localStorage.getItem("lastWorkoutDate");
  let streak = parseInt(localStorage.getItem("streak") || "0");

  if (lastDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const formattedYest = yesterday.toLocaleDateString();

    if (lastDate === formattedYest) {
      streak += 1;
    } else {
      streak = 1;
    }

    localStorage.setItem("lastWorkoutDate", today);
    localStorage.setItem("streak", streak.toString());
  }

  document.getElementById("streak-count").innerText = streak;
}

function saveWorkoutLog(completedCount) {
  const today = new Date().toLocaleDateString();
  const logs = JSON.parse(localStorage.getItem("workoutLogs") || "[]");

  const name = document.getElementById("workout-name").value || "Unnamed";
  const note = document.getElementById("workout-note").value || "";

  if (!logs.some(entry => entry.date === today)) {
    logs.unshift({ date: today, count: completedCount, name, note });
    localStorage.setItem("workoutLogs", JSON.stringify(logs));
    loadWorkoutLog();
  }
}

function loadWorkoutLog() {
  const logList = document.getElementById("log-list");
  const logs = JSON.parse(localStorage.getItem("workoutLogs") || "[]");
  logList.innerHTML = logs.map(log => `<li>🗓️ ${log.date} — <strong>${log.name}</strong> (${log.count})<br><em>${log.note}</em></li>`).join("");
}

// Timer
let timer;
let seconds = 0;

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    seconds++;
    document.getElementById("timer-display").innerText = formatTime(seconds);
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function resetTimer() {
  clearInterval(timer);
  seconds = 0;
  document.getElementById("timer-display").innerText = "00:00";
}

function formatTime(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = (sec % 60).toString().padStart(2, '0');
  return m + ":" + s;
}

// Load everything on page load
window.onload = function () {
  loadWorkoutLog();
  showTipOfTheDay();
  updateStreak();
};
