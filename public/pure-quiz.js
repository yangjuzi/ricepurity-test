// How Pure Are You Quiz Questions
const questions = [
    {
        question: "When you find a wallet on the street, you:",
        optionA: "Immediately turn it in to the police or lost and found",
        optionB: "Look through it first to see if there's contact information",
        pure: "A"
    },
    {
        question: "Your ideal way to spend a Friday night is:",
        optionA: "Reading a good book or watching a wholesome movie",
        optionB: "Going out to bars or clubs with friends",
        pure: "A"
    },
    {
        question: "When someone tells an inappropriate joke, you:",
        optionA: "Feel uncomfortable and change the subject",
        optionB: "Laugh along even if you don't find it funny",
        pure: "A"
    },
    {
        question: "Your approach to relationships is:",
        optionA: "Take things slow and build emotional connection first",
        optionB: "Go with the flow and see what happens",
        pure: "A"
    },
    {
        question: "When you make a mistake, you:",
        optionA: "Immediately confess and try to make it right",
        optionB: "Hope no one notices and try to cover it up",
        pure: "A"
    },
    {
        question: "Your friends would describe you as:",
        optionA: "The innocent one who sees the good in everyone",
        optionB: "Streetwise and experienced in life",
        pure: "A"
    },
    {
        question: "When it comes to gossip, you:",
        optionA: "Avoid it completely and don't participate",
        optionB: "Listen but try not to spread it further",
        pure: "A"
    },
    {
        question: "Your reaction to peer pressure is:",
        optionA: "Stand firm in your values regardless of what others think",
        optionB: "Sometimes give in to fit in with the group",
        pure: "A"
    },
    {
        question: "When watching movies, you prefer:",
        optionA: "Family-friendly films with positive messages",
        optionB: "Realistic movies that show the darker side of life",
        pure: "A"
    },
    {
        question: "Your approach to white lies is:",
        optionA: "Honesty is always the best policy, even if it hurts",
        optionB: "Small lies are okay if they protect someone's feelings",
        pure: "A"
    },
    {
        question: "When you see someone being bullied, you:",
        optionA: "Immediately step in to help, regardless of consequences",
        optionB: "Want to help but worry about getting involved",
        pure: "A"
    },
    {
        question: "Your view on forgiveness is:",
        optionA: "Always forgive, even when it's difficult",
        optionB: "Some actions are unforgivable",
        pure: "A"
    },
    {
        question: "When it comes to judging others, you:",
        optionA: "Try to see the best in everyone and avoid judgment",
        optionB: "Form opinions based on people's actions",
        pure: "A"
    },
    {
        question: "Your approach to temptation is:",
        optionA: "Resist temptation and stick to your principles",
        optionB: "Sometimes give in if it doesn't hurt anyone",
        pure: "A"
    },
    {
        question: "When someone asks for your honest opinion, you:",
        optionA: "Give gentle, constructive feedback",
        optionB: "Tell them exactly what you think, even if it's harsh",
        pure: "A"
    },
    {
        question: "Your philosophy on life is:",
        optionA: "Focus on the positive and believe in the goodness of people",
        optionB: "Be realistic about life's challenges and human nature",
        pure: "A"
    }
];

let currentQuestion = 0;
let pureAnswers = 0;

function initializeTest() {
    // Check if returning to test
    const savedProgress = localStorage.getItem('pureQuizProgress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        currentQuestion = progress.currentQuestion;
        pureAnswers = progress.pureAnswers;
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
    
    // Check if the chosen answer is the "pure" one
    if (question.pure === choice) {
        pureAnswers++;
    }
    
    currentQuestion++;
    
    // Save progress
    localStorage.setItem('pureQuizProgress', JSON.stringify({
        currentQuestion: currentQuestion,
        pureAnswers: pureAnswers
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
    // Calculate final score (percentage of pure answers)
    const score = Math.round((pureAnswers / questions.length) * 100);
    
    // Store results
    localStorage.setItem('pureQuizScore', score);
    localStorage.setItem('pureQuizTotal', pureAnswers);
    localStorage.removeItem('pureQuizProgress');
    
    // Redirect to results
    window.location.href = 'pure-quiz-result.html';
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