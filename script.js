let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;
let lapCount = 0;

const display = document.getElementById("display");
const lapList = document.getElementById("lapList");

function formatTime(ms) {
  let milliseconds = Math.floor((ms % 1000) / 10);
  let seconds = Math.floor((ms / 1000) % 60);
  let minutes = Math.floor((ms / (1000 * 60)) % 60);
  let hours = Math.floor(ms / (1000 * 60 * 60));

  return (
    String(hours).padStart(2, "0") + ":" +
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0") + "." +
    String(milliseconds).padStart(2, "0")
  );
}

function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
}

document.getElementById("start").onclick = () => {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
    running = true;
  }
};

document.getElementById("pause").onclick = () => {
  clearInterval(timerInterval);
  running = false;
};

document.getElementById("reset").onclick = () => {
  clearInterval(timerInterval);
  elapsedTime = 0;
  lapCount = 0;
  running = false;
  updateDisplay();
  lapList.innerHTML = "";
};

document.getElementById("lap").onclick = () => {
  if (running) {
    lapCount++;
    const li = document.createElement("li");
    li.textContent = "Lap " + lapCount + " ➜ " + formatTime(elapsedTime);
    lapList.prepend(li);
  }
};

updateDisplay();
