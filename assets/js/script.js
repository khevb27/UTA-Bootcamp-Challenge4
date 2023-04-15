// Listing the quiz questions, choices, and answers
const quizQuestions = [
  {
    question: "Commonly used data types DO NOT include:",
    choices: ["Strings", "Booleans", "Alerts", "Numbers"],
    answer: "Alerts",
  },
  {
    question: "The condition in an if/else statement is enclosed with ____.",
    choices: ["Quotes", "Curly Brackets", "Parentheses", "Square Brackets"],
    answer: "Parentheses",
  },
  {
    question: "Arrays in JavaScript can be used to store ____.",
    choices: ["Numbers & Strings", "Other Arrays", "Booleans", "ALL Of The Above"],
    answer: "ALL Of The Above",
  },
  {
    question:
      "String values must be encosed within ____ when being assigned to variables.",
    choices: ["Quotes", "Curly Brackets", "Parentheses", "Square Brackets"],
    answer: "Quotes",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["Javascript", "Terminal/Bash", "For Loops", "console.log"],
    answer: "console.log",
  },
];

// Defining variables
const startBtn = document.getElementById("start-btn");
const questionContainer = document.getElementById("question");
const choicesContainer = document.getElementById("choices");
const timerContainer = document.getElementById("timer");
const scoreForm = document.getElementById("score-form");
let currentQuestionIndex = 0;
let timeLeft = 60;
let timerInterval;

// Start quiz function
function startQuiz() {
  // Hide start button and show first question
  startBtn.classList.add("hidden");
  questionContainer.classList.remove("hidden");
  choicesContainer.classList.remove("hidden");
  showQuestion();
  // Start timer
  timerInterval = setInterval(function () {
    timeLeft--;
    timerContainer.textContent = timeLeft;
    // End quiz when time ends
    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}

// Show a quiz question function
function showQuestion() {
  // Get current question
  const currentQuestion = quizQuestions[currentQuestionIndex];
  // Display question
  questionContainer.textContent = currentQuestion.question;
  // Display answer choices
  choicesContainer.innerHTML = "";
  currentQuestion.choices.forEach(function (choice) {
    const choiceBtn = document.createElement("button");
    choiceBtn.textContent = choice;
    choiceBtn.addEventListener("click", function () {
      // Check answer
      if (choice === currentQuestion.answer) {
        // Add to score and go to next question
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
          showQuestion();
        } else {
          endQuiz();
        }
      } else {
        // Minus 10 sec from time left and go to next question
        timeLeft -= 10;
        if (timeLeft < 0) {
          timeLeft = 0;
        }
        timerContainer.textContent = timeLeft;
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
          showQuestion();
        } else {
          endQuiz();
        }
      }
    });
    choicesContainer.appendChild(choiceBtn);
  });
}

// End the quiz funtion
function endQuiz() {
  clearInterval(timerInterval);
  // Hide question and choices
  questionContainer.classList.add("hidden");
  choicesContainer.classList.add("hidden");
  // Show score form
  scoreForm.classList.remove("hidden");
  // Display final score
  const finalScore = document.createElement("p");
  finalScore.textContent = "Your Final Score: " + timeLeft;
  scoreForm.insertBefore(finalScore, scoreForm.firstChild);
}

// Start button event listener
startBtn.addEventListener("click", startQuiz);

// Score form submission event listener
scoreForm.addEventListener("submit", function (event) {
  event.preventDefault();
  // Get score and initials
  const initialsInput = document.getElementById("initials");
  const initials = initialsInput.value.trim();
  const score = timeLeft;
  // Save score to local storage
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScores.push({ initials: initials, score: score });
  localStorage.setItem("highScores", JSON.stringify(highScores));
  // Redirect to high-scores page
  window.location.href = "highscores.html";
});
