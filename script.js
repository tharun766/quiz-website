// Quiz questions array
const quizData = [
    {
        question: "What is the capital of France?",
        a: "Berlin",
        b: "Madrid",
        c: "Paris",
        d: "Rome",
        correct: "c"
    },
    {
        question: "Who is the author of 'Harry Potter'?",
        a: "J.R.R. Tolkien",
        b: "J.K. Rowling",
        c: "George R.R. Martin",
        d: "Suzanne Collins",
        correct: "b"
    },
    {
        question: "What is the largest planet in our solar system?",
        a: "Earth",
        b: "Jupiter",
        c: "Mars",
        d: "Saturn",
        correct: "b"
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        a: "Oxygen",
        b: "Gold",
        c: "Osmium",
        d: "Oganesson",
        correct: "a"
    }
];

// References to HTML elements
const startContainer = document.getElementById('start-container');
const quizContainer = document.getElementById('quiz-container');
const usernameInput = document.getElementById('username');
const startBtn = document.getElementById('start-btn');
const quiz = document.getElementById('quiz');
const submitBtn = document.getElementById('submit');
const result = document.getElementById('result');

// Variables for quiz state
let currentQuestionIndex = 0;
let score = 0;
let username = '';

// Load initial question
function loadQuiz() {
    quiz.innerHTML = ''; // Clear previous content

    const questionData = quizData[currentQuestionIndex];
    const questionEl = document.createElement('div');
    questionEl.classList.add('question');
    questionEl.textContent = questionData.question;

    const optionsEl = document.createElement('ul');
    optionsEl.classList.add('options');

    for (const option in questionData) {
        if (option !== 'question' && option !== 'correct') {
            const optionItem = document.createElement('li');
            optionItem.innerHTML = `
                <input type="radio" name="answer" value="${option}">
                <label>${questionData[option]}</label>
            `;
            optionsEl.appendChild(optionItem);
        }
    }

    quiz.appendChild(questionEl);
    quiz.appendChild(optionsEl);
}

// Get selected answer
function getSelected() {
    const answerEls = document.querySelectorAll('input[name="answer"]');
    let selectedAnswer = null;

    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            selectedAnswer = answerEl.value;
        }
    });

    return selectedAnswer;
}

// Start button event listener
startBtn.addEventListener('click', () => {
    username = usernameInput.value.trim();
    if (username) {
        // Hide start screen and show quiz
        startContainer.style.display = 'none';
        quizContainer.style.display = 'block';
        loadQuiz();
    } else {
        alert("Please enter your name to start the quiz.");
    }
});

// Submit button event listener
submitBtn.addEventListener('click', () => {
    const selectedAnswer = getSelected();

    if (selectedAnswer) {
        if (selectedAnswer === quizData[currentQuestionIndex].correct) {
            score++;
        }

        currentQuestionIndex++;

        if (currentQuestionIndex < quizData.length) {
            loadQuiz();
        } else {
            quiz.innerHTML = '';
            result.innerHTML = `${username}, you scored ${score} out of ${quizData.length}!`;
            submitBtn.textContent = "Restart Quiz";
            
            // Reset quiz when clicking "Restart Quiz"
            submitBtn.addEventListener('click', () => {
                currentQuestionIndex = 0;
                score = 0;
                result.innerHTML = '';
                usernameInput.value = '';
                startContainer.style.display = 'block';
                quizContainer.style.display = 'none';
                submitBtn.textContent = "Submit Quiz";
            });
        }
    } else {
        alert("Please select an answer.");
    }
});
