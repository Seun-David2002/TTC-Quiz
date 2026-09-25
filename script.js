const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-question");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");


const quizQuestions = [
    {
        question: "What date did TTC officially start?",
        answers: [
            { text: "July 1 2025", correct: false },
            { text: "June 19 2026", correct: false },
            { text: "July 1 2026", correct: false },
            { text: "July 19 2025", correct: true },
        ],
    },

    {
        question: "Which one of these has NOT been an official TTC Theme?",
        answers: [
            { text: "Rooted", correct: false },
            { text: "The Lift", correct: false },
            { text: "Breakthrough", correct: true },
            { text: "The Quest", correct: false }
        ]
    },
    {
        question: "What`s was the theme of our 1st year anniversary?",
        answers: [
            { text: "rooted", correct: false },
            { text: "Ebenezer", correct: true },
            { text: "Locomotive", correct: false },
            { text: "Breakthrough", correct: false },
        ]

    },
    {
        question: "Who said Ebenezer in the bible after God gave them victory?",
        answers: [
            { text: "David", correct: false },
            { text: "Moses", correct: false },
            { text: "Joshua", correct: false},
            { text: "Samuel", correct: true },
        ]
    },
    {
        question: "Ebenezer Means?",
        answers: [
            { text: "New Beginning", correct: false },
            { text: "Stone of Help", correct: true },
            { text: "God Provides", correct: false },
            { text: "House of God", correct: false },
        ]
    },
];

let currentQuestionIndex = 0;
let score = 0
let answersDisable = false


totalQuestionsSpan. textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length


startButton.addEventListener("click", startQuiz)
restartButton.addEventListener("click", restartQuiz)


function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan. textContent = 0

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion()
}

function showQuestion() {
    answersDisabled = false

    const currentQuestion = quizQuestions [currentQuestionIndex]

    currentQuestionSpan.textContent = currentQuestionIndex + 1

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%"


    questionText.textContent = currentQuestion.question


    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.textContent = answer.text
        button.classList.add("answer-btn")
        button.dataset.correct = answer.correct



        button.addEventListener("click", selectAnswer)

        answersContainer.appendChild(button)
})


}

function selectAnswer(event) {
if(answersDisabled) return

answersDisabled = true

const selectedButton = event. target;
const isCorrect = selectedButton.dataset.correct === "true"


Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct ==="true") {
        button.classList.add("correct")
    }
    else if (button === selectedButton) {
        button.classList.add("incorrect")
    }
 
});

if(isCorrect) {
    score++;
    scoreSpan.textContent = score
}

setTimeout(() => {
    currentQuestionIndex++;

    if(currentQuestionIndex < quizQuestions.length){
        showQuestion()
    }
    else{
        showResults()
    }
} ,1000)

}

function showResults() {
    quizScreen.classList.remove("active")
    resultScreen.classList.add("active")


    finalScoreSpan.textContent = score;

    const percentage = (score/quizQuestions.length) * 100

    if(percentage === 100) {
        resultMessage.textContent = "Perfect! You're a genius!";
    }
    else if (percentage >= 80) {
        resultMessage.textContent = "Great job!";
    }
        else if (percentage >= 60) {
        resultMessage.textContent = "Good effort! Keep learning";
    }
        else if (percentage >= 40) {
        resultMessage.textContent = "Not bad! Try again to improve";
    }
    
    else {
        resultMessage.textContent = "Keep studying! you'll get better!"
    }


}


function restartQuiz(){
   resultScreen.classList.remove("active");

   startQuiz()
}