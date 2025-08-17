// Sexual Orientation Exploration Quiz Questions
const questions = [
    {
        question: "When you think about romantic relationships, you feel most drawn to:",
        optionA: "People of the opposite gender",
        optionB: "People of the same gender or multiple genders",
        exploring: "B"
    },
    {
        question: "In movies or TV shows, you find yourself most attracted to:",
        optionA: "Characters of the opposite gender",
        optionB: "Characters of the same gender",
        exploring: "B"
    },
    {
        question: "When you imagine your ideal romantic partner, you picture:",
        optionA: "Someone of the opposite gender",
        optionB: "Someone of the same gender or you're open to either",
        exploring: "B"
    },
    {
        question: "Your feelings about same-gender attraction are:",
        optionA: "I don't experience attraction to the same gender",
        optionB: "I do or might experience attraction to the same gender",
        exploring: "B"
    },
    {
        question: "When you see attractive people of the same gender, you:",
        optionA: "Appreciate their looks but don't feel romantic attraction",
        optionB: "Sometimes feel romantic or physical attraction",
        exploring: "B"
    },
    {
        question: "Your past crushes have been:",
        optionA: "Exclusively on people of the opposite gender",
        optionB: "On people of the same gender or both genders",
        exploring: "B"
    },
    {
        question: "When you think about physical intimacy, you're most interested in:",
        optionA: "Being with someone of the opposite gender",
        optionB: "Being with someone of the same gender or you're open to both",
        exploring: "B"
    },
    {
        question: "Your comfort level with LGBTQ+ topics and communities is:",
        optionA: "Supportive but as an ally from outside the community",
        optionB: "I feel a personal connection or sense of belonging",
        exploring: "B"
    },
    {
        question: "When you imagine your future, you see yourself:",
        optionA: "In a relationship with someone of the opposite gender",
        optionB: "In a relationship with someone of the same gender or either",
        exploring: "B"
    },
    {
        question: "Your reaction to the idea of dating someone of the same gender is:",
        optionA: "It doesn't appeal to me personally",
        optionB: "It appeals to me or I'm curious about it",
        exploring: "B"
    },
    {
        question: "When you think about emotional connection, you feel it most strongly with:",
        optionA: "People of the opposite gender",
        optionB: "People of the same gender or both genders equally",
        exploring: "B"
    },
    {
        question: "Your feelings about your own sexual orientation are:",
        optionA: "I'm confident I'm heterosexual",
        optionB: "I'm questioning or exploring my orientation",
        exploring: "B"
    },
    {
        question: "When you see same-gender couples, you feel:",
        optionA: "Happy for them but don't relate personally",
        optionB: "A sense of connection or 'that could be me'",
        exploring: "B"
    },
    {
        question: "Your interest in LGBTQ+ representation in media is:",
        optionA: "I support it but don't seek it out personally",
        optionB: "I actively seek it out and feel represented by it",
        exploring: "B"
    },
    {
        question: "When you think about labels for your sexual orientation:",
        optionA: "Heterosexual/straight feels right to me",
        optionB: "I'm exploring other labels or none feel quite right",
        exploring: "B"
    }
];

let currentQuestion = 0;
let exploringAnswers = 0;

function initializeTest() {
    // Check if returning to test
    const savedProgress = localStorage.getItem('sexualOrientationProgress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        currentQuestion = progress.currentQuestion;
        exploringAnswers = progress.exploringAnswers;
    }
    
    displayQuestion();
    updateProgress();
}

function displayQuestion() {
    if (currentQuestion >= questions.length) {
        finishTest();
        return;
    }
    
    const question = questions[currentQuestion];
    const questionText = document.getElementById('question-text');
    const optionA = document.getElementById('option-a');
    const optionB = document.getElementById('option-b');
    
    questionText.textContent = question.question;
    optionA.textContent = question.optionA;
    optionB.textContent = question.optionB;
}

function updateProgress() {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = progress + '%';
    progressText.textContent = `${currentQuestion + 1} / ${questions.length}`;
}

function answerQuestion(choice) {
    const question = questions[currentQuestion];
    
    // Check if the chosen answer indicates exploration
    if (question.exploring === choice) {
        exploringAnswers++;
    }
    
    currentQuestion++;
    
    // Save progress
    localStorage.setItem('sexualOrientationProgress', JSON.stringify({
        currentQuestion: currentQuestion,
        exploringAnswers: exploringAnswers
    }));
    
    // Add animation before moving to next question
    const card = document.querySelector('.bg-white.rounded-2xl');
    card.style.transform = 'scale(0.95)';
    card.style.opacity = '0.8';
    
    setTimeout(() => {
        displayQuestion();
        updateProgress();
        card.style.transform = 'scale(1)';
        card.style.opacity = '1';
    }, 200);
}

function finishTest() {
    // Calculate final score (percentage of exploring answers)
    const score = Math.round((exploringAnswers / questions.length) * 100);
    
    // Store results
    localStorage.setItem('sexualOrientationScore', score);
    localStorage.setItem('sexualOrientationTotal', exploringAnswers);
    localStorage.removeItem('sexualOrientationProgress');
    
    // Redirect to results
    window.location.href = 'sexual-orientation-result.html';
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    initializeTest();
    
    const optionA = document.getElementById('option-a');
    const optionB = document.getElementById('option-b');
    
    optionA.addEventListener('click', () => answerQuestion('A'));
    optionB.addEventListener('click', () => answerQuestion('B'));
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'a' || e.key === 'A' || e.key === '1') {
            answerQuestion('A');
        } else if (e.key === 'b' || e.key === 'B' || e.key === '2') {
            answerQuestion('B');
        }
    });
});