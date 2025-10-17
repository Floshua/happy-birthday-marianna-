// Countdown
const countdownEl = document.getElementById("countdown");
const targetDate = new Date("2025-10-27T00:00:00");
const now = new Date();
const timeDiff = targetDate - now;
const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
countdownEl.textContent = `Countdown: ${daysLeft} day${daysLeft !== 1 ? "s" : ""} left until Marianna's birthday.`;

// Buttons
const task1Btn = document.getElementById("task1-btn");
const task2Btn = document.getElementById("task2-btn");
const task3Btn = document.getElementById("task3-btn");
const task1 = document.getElementById("task1");
const task2 = document.getElementById("task2");

// Sounds
const correctSound = document.getElementById("correct-sound");
const errorSound = document.getElementById("error-sound");
const errorImage = document.getElementById("error-image");

// Quiz
const quizData = [/* insert formatted quiz questions here */];
const quizContainer = document.getElementById("quiz");
const reward = document.getElementById("reward");
let currentQuestion = 0;

function showQuestion(index) {
  quizContainer.innerHTML = "";
  const q = quizData[index];

  const questionDiv = document.createElement("div");
  questionDiv.classList.add("question");

  const questionText = document.createElement("h3");
  questionText.textContent = `${index + 1}. ${q.question}`;
  questionDiv.appendChild(questionText);

  q.options.forEach((opt, i) => {
    const optionBtn = document.createElement("button");
    optionBtn.classList.add("option");
    optionBtn.textContent = opt;
    optionBtn.onclick = () => handleAnswer(index, i, optionBtn);
    questionDiv.appendChild(optionBtn);
  });

  quizContainer.appendChild(questionDiv);
}

function handleAnswer(qIndex, selectedIndex, button) {
  const correctIndex = quizData[qIndex].answer;

  if (selectedIndex === correctIndex) {
    button.classList.add("correct");
    correctSound.play();
    confetti.start();
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      setTimeout(() => showQuestion(currentQuestion), 1000);
    } else {
      reward.classList.remove("hidden");
      task2Btn.disabled = false;
    }
  } else {
    button.classList.add("wrong");
    errorSound.play();
    flashErrorImage();
  }
}

function flashErrorImage() {
  errorImage.classList.remove("hidden");
  setTimeout(() => {
    errorImage.classList.add("hidden");
  }, 1000);
}

task1Btn.onclick = () => {
  task1.classList.toggle("hidden");
  showQuestion(currentQuestion);
};

// Game
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const gameReward = document.getElementById("gameReward");
let heads = [];
let score2 = 0;
let gameRunning = false;

function spawnHead() {
  const x = Math.random() * (canvas.width - 50);
  heads.push({ x, y: 0, size: 50 });
}

function drawHeads() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  heads.forEach((head, index) => {
    ctx.beginPath();
    ctx.arc(head.x + 25, head.y + 25, 25, 0, Math.PI * 2);
    ctx.fillStyle = "#ffb6c1";
    ctx.fill();
    head.y +=
