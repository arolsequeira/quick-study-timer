import { loadSessions, saveSession } from './storage.js';

const clockEl = document.getElementById('clock');
const minutesInput = document.getElementById('minutesInput');
const sessionList = document.getElementById('sessionList');
const modeButtons = document.querySelectorAll('[data-mode]');
let mode = 'focus', secondsLeft = 25 * 60, timerId = null;

const getDuration = () => Number(minutesInput.value) || (mode === 'focus' ? 25 : 5);
const renderClock = () => {
  const m = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const s = String(secondsLeft % 60).padStart(2, '0');
  clockEl.textContent = `${m}:${s}`;
};
const renderLog = (items = loadSessions()) => {
  sessionList.innerHTML = items.length ? items.map((s) => `<li>${s.endedAt} - ${s.mode} (${s.minutes}m)</li>`).join('') : '<li>No sessions logged yet.</li>';
};
const resetTimer = () => {
  clearInterval(timerId); timerId = null;
  secondsLeft = getDuration() * 60;
  renderClock();
};
document.getElementById('startBtn').addEventListener('click', () => {
  if (!timerId) {
    timerId = setInterval(() => {
      if (secondsLeft > 0) {
        secondsLeft -= 1; renderClock();
      } else {
        resetTimer(); renderLog(saveSession({ mode, minutes: getDuration() }));
      }
    }, 1000);
  }
});
document.getElementById('pauseBtn').addEventListener('click', () => { clearInterval(timerId); timerId = null; });
document.getElementById('resetBtn').addEventListener('click', resetTimer);
minutesInput.addEventListener('input', () => { if (!timerId) resetTimer(); });
modeButtons.forEach((btn) => btn.addEventListener('click', () => {
  mode = btn.dataset.mode;
  modeButtons.forEach((b) => b.classList.toggle('active', b === btn));
  minutesInput.value = ''; minutesInput.placeholder = mode === 'focus' ? '25' : '5';
  resetTimer();
}));
renderClock(); renderLog();