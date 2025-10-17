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
const quizData = [
  {
    question: "On the Elizabeth Line, what's the train station after Harold Hill?",
    options: ["Gidea Park", "Punjabi Park", "Punani Park", "Tilted Towers"],
    answer: 1
  },
  {
    question: "What's 50% Turkish, 50% Polish, but 100% nicotine?",
    options: ["Leo Tekker", "Turkish Delight", "That one nigga from shark Tails", "Gregorz"],
    answer: 0
  },
  {
    question: "What's my favourite song?",
    options: [
      "Slow Dancing in the Dark",
      "Bimbo Doll",
      "Palmtree Panic 'P' Mix",
      "Friday Night",
      "SCP 3008 Friday Theme",
      "Can't Tell Me Nothing"
    ],
    answer: 0
  },
  {
    question: "What's my dog's name?",
    options: ["retard and faggot", "Buddy and Pepper", "Buddy and Peppa", "Denis and Antonio"],
    answer: 2
  },
  {
    question: "Why do I love Joji so much?",
    options: [
      "Because I'm an edgelord stuck in 2016",
      "Because I think of you whenever I listen to him",
      "Because I'm gay",
      "Because Denis is gay",
      "Because the pressures of society make me feel like I gotta be",
      "Because I just like his music bro why you gotta hyper analyse everything man"
    ],
    answer: 1
  },
  {
    question: "A pretty plant with petals is called what?",
    options: ["Flower", "Flour"],
    answer: 1
  },
  {
    question: "Where was I raised?",
    options: ["Durban", "Dirtbin", "Skunthrope", "Cape Town"],
    answer: 0
  },
  {
    question: "Excuse me, was you saying something?",
    options: [
      "Uh uh you can't tell me nothing",
      "Denis is gay",
      "Banjo Kazooie",
      "Denis is gay"
    ],
    answer: 0
  },
  {
    question: "What's my favourite game of all time?",
    options: [
      "Your Bizarre Adventure",
      "Obby but you're on a bike",
      "Super Mario Galaxy",
      "Terraria",
      "All of the above",
      "Denis is gay"
    ],
    answer: 4
  },
  {
    question: "How tall am I?",
    options: ["5'2", "6'3", "190cm", "Denis is gay"],
    answer: 2
  }
];

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
