// Am I Innocent or Dirty Quiz Questions
const questions = [
    {
        question: "When someone tells a joke with a double meaning, you:",
        optionA: "Usually don't get it until someone explains it",
        optionB: "Immediately catch the hidden meaning and laugh",
        dirty: "B"
    },
    {
        question: "Your ideal Friday night is:",
        optionA: "Watching a wholesome movie with hot chocolate",
        optionB: "Going out and seeing where the night takes you",
        dirty: "B"
    },
    {
        question: "When you hear the word 'banana', you think of:",
        optionA: "A healthy yellow fruit",
        optionB: "Something else entirely",
        dirty: "B"
    },
    {
        question: "Your friends would describe you as:",
        optionA: "Sweet, pure, and innocent",
        optionB: "Mischievous and a little naughty",
        dirty: "B"
    },
    {
        question: "When watching a romantic movie, you:",
        optionA: "Focus on the emotional connection",
        optionB: "Wait for the steamy scenes",
        dirty: "B"
    },
    {
        question: "Your browser history would show:",
        optionA: "Recipes, news, and educational content",
        optionB: "Things you'd rather keep private",
        dirty: "B"
    },
    {
        question: "At a party, you're most likely to:",
        optionA: "Have deep conversations in a quiet corner",
        optionB: "Be the center of attention with wild stories",
        dirty: "B"
    },
    {
        question: "Your reaction to adult humor is:",
        optionA: "Blushing and feeling embarrassed",
        optionB: "Laughing and adding your own jokes",
        dirty: "B"
    },
    {
        question: "When someone says 'that's what she said', you:",
        optionA: "Don't understand why it's funny",
        optionB: "Immediately burst out laughing",
        dirty: "B"
    },
    {
        question: "Your ideal vacation would be:",
        optionA: "A peaceful retreat in nature",
        optionB: "A wild adventure in an exciting city",
        dirty: "B"
    },
    {
        question: "When you see something phallic-shaped, you:",
        optionA: "See it for what it actually is",
        optionB: "Can't help but giggle",
        dirty: "B"
    },
    {
        question: "Your approach to flirting is:",
        optionA: "Shy smiles and innocent compliments",
        optionB: "Bold moves and suggestive comments",
        dirty: "B"
    },
    {
        question: "When reading a romance novel, you:",
        optionA: "Skip the intimate scenes",
        optionB: "Those are your favorite parts",
        dirty: "B"
    },
    {
        question: "Your friends come to you for:",
        optionA: "Wholesome advice and emotional support",
        optionB: "Juicy gossip and relationship drama",
        dirty: "B"
    },
    {
        question: "When someone mentions 'Netflix and chill', you think:",
        optionA: "Actually watching Netflix and relaxing",
        optionB: "We both know what that really means",
        dirty: "B"
    }
];

let currentQuestion = 0;
let dirtyAnswers = 0;

function initializeTest() {
    // Check if returning to test
    const savedProgress = localStorage.getItem('innocentDirtyProgress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        currentQuestion = progress.currentQuestion;
        dirtyAnswers = progress.dirtyAnswers;
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
    
    // Check if the chosen answer is the "dirty" one
    if (question.dirty === choice) {
        dirtyAnswers++;
    }
    
    currentQuestion++;
    
    // Save progress
    localStorage.setItem('innocentDirtyProgress', JSON.stringify({
        currentQuestion: currentQuestion,
        dirtyAnswers: dirtyAnswers
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
    // Calculate final score (percentage of dirty answers)
    const score = Math.round((dirtyAnswers / questions.length) * 100);
    
    // Store results
    localStorage.setItem('innocentDirtyScore', score);
    localStorage.setItem('innocentDirtyTotal', dirtyAnswers);
    localStorage.removeItem('innocentDirtyProgress');
    
    // Redirect to results
    window.location.href = 'innocent-dirty-result.html';
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