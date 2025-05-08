
// Already existing workoutPool and getRandomExercises functions above...

function generateWorkout() {
    const test = document.getElementById("test-select").value;
    const output = document.getElementById("workout-plan");
    const section = document.getElementById("workout-output");

    if (test && workoutPool[test]) {
        const exercises = getRandomExercises([...workoutPool[test]]);
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

        // Add event listeners to checkboxes
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

// Show motivational tip
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

window.onload = function () {
  loadWorkoutLog();
  showTipOfTheDay();
  updateStreak();
};


function saveWorkoutLog(completedCount) {
  const today = new Date().toLocaleDateString();
  const logs = JSON.parse(localStorage.getItem("workoutLogs") || "[]");

  if (!logs.some(entry => entry.date === today)) {
    logs.unshift({ date: today, count: completedCount });
    localStorage.setItem("workoutLogs", JSON.stringify(logs));
    loadWorkoutLog();
  }
}

function loadWorkoutLog() {
  const logList = document.getElementById("log-list");
  const logs = JSON.parse(localStorage.getItem("workoutLogs") || "[]");
  logList.innerHTML = logs.map(log => `<li>🗓️ ${log.date} — ${log.count} exercises completed</li>`).join("");
}
