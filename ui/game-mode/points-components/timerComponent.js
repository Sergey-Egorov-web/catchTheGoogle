import { getStatus, setTimeToWin, subscribe } from "../../../state/data.js";

export function timerComponent() {
  let timerInterval;
  let startTime = 0;

  const timer = document.createElement("span");

  console.log("create timerComponent...");

  subscribe(() => {
    stopTimer();
  });

  //   function startTimer() {
  if (timerInterval) return;

  startTime = Date.now(); // Запоминаем текущее время
  updateTimerDisplay(0);

  timerInterval = setInterval(() => {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    updateTimerDisplay(elapsedTime);
  }, 1000);

  // root.append(timer);
  //   }

  function updateTimerDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timer.textContent = `${String(minutes).padStart(2, "0")}m:${String(
      remainingSeconds
    ).padStart(2, "0")}c`;
    setTimeToWin(timer.textContent);
  }

  function stopTimer() {
    let status = getStatus();

    if (status === "WIN" || status === "LOSE") {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  return timer;
}
