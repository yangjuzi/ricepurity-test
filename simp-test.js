// Simp Test Questions
const questions = [
    {
        question: "When someone you like posts on social media, you:",
        optionA: "Like it if you genuinely enjoy the content",
        optionB: "Always like and comment to get their attention",
        simp: "B"
    },
    {
        question: "If your crush asks you to do them a favor, you:",
        optionA: "Help if you can, but consider your own schedule first",
        optionB: "Drop everything immediately to help them",
        simp: "B"
    },
    {
        question: "When paying for dates, you:",
        optionA: "Prefer to split the bill or take turns paying",
        optionB: "Always insist on paying for everything",
        simp: "B"
    },
    {
        question: "If someone you like is dating someone else, you:",
        optionA: "Respect their relationship and move on",
        optionB: "Still try to win them over with gifts and attention",
        simp: "B"
    },
    {
        question: "Your approach to giving gifts is:",
        optionA: "Thoughtful gifts on special occasions",
        optionB: "Expensive gifts frequently to show your feelings",
        simp: "B"
    },
    {
        question: "When someone you like cancels plans last minute, you:",
        optionA: "Feel disappointed but make other plans",
        optionB: "Immediately offer to reschedule at their convenience",
        simp: "B"
    },
    {
        question: "If your crush complains about being broke, you:",
        optionA: "Offer emotional support and maybe suggest solutions",
        optionB: "Immediately offer to give them money",
        simp: "B"
    },
    {
        question: "Your reaction to being left on read is:",
        optionA: "Assume they're busy and wait for them to respond",
        optionB: "Send multiple follow-up messages",
        simp: "B"
    },
    {
        question: "When someone you like talks about their problems, you:",
        optionA: "Listen and offer advice when asked",
        optionB: "Try to solve all their problems for them",
        simp: "B"
    },
    {
        question: "If your crush mentions liking something, you:",
        optionA: "Show genuine interest if you're also interested",
        optionB: "Immediately buy it for them or pretend to love it too",
        simp: "B"
    },
    {
        question: "Your boundaries in relationships are:",
        optionA: "Clear and consistently maintained",
        optionB: "Flexible and often compromised for their happiness",
        simp: "B"
    },
    {
        question: "When someone you like is having a bad day, you:",
        optionA: "Offer support and give them space if needed",
        optionB: "Try to fix everything and make yourself available 24/7",
        simp: "B"
    },
    {
        question: "If your crush asks for your opinion, you:",
        optionA: "Give your honest thoughts",
        optionB: "Always agree with whatever they say",
        simp: "B"
    },
    {
        question: "Your social media behavior around crushes involves:",
        optionA: "Normal interaction like with other friends",
        optionB: "Constantly liking, commenting, and sharing their posts",
        simp: "B"
    },
    {
        question: "When planning activities, you:",
        optionA: "Suggest things you both might enjoy",
        optionB: "Only do what they want to do",
        simp: "B"
    },
    {
        question: "If someone you like treats you poorly, you:",
        optionA: "Address the issue or distance yourself",
        optionB: "Make excuses for them and try harder to please them",
        simp: "B"
    },
    {
        question: "Your approach to compliments is:",
        optionA: "Genuine compliments when you mean them",
        optionB: "Constant praise and flattery to make them feel good",
        simp: "B"
    },
    {
        question: "When your crush talks about other people they find attractive, you:",
        optionA: "Listen normally like any other conversation topic",
        optionB: "Feel jealous and try to change the subject",
        simp: "B"
    },
    {
        question: "If someone you like needs a ride, you:",
        optionA: "Help if it's convenient for you",
        optionB: "Drive across town at any hour without question",
        simp: "B"
    },
    {
        question: "Your self-worth in relationships depends on:",
        optionA: "Your own achievements and self-respect",
        optionB: "How much attention and validation you get from them",
        simp: "B"
    }
];

let currentQuestion = 0;
let simpAnswers = 0;

function initializeTest() {
    // Check if returning to test
    const savedProgress = localStorage.getItem('simpTestProgress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        currentQuestion = progress.currentQuestion;
        simpAnswers = progress.simpAnswers;
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
    
    // Check if the chosen answer is the "simp" one
    if (question.simp === choice) {
        simpAnswers++;
    }
    
    currentQuestion++;
    
    // Save progress
    localStorage.setItem('simpTestProgress', JSON.stringify({
        currentQuestion: currentQuestion,
        simpAnswers: simpAnswers
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
    // Calculate final score (percentage of simp answers)
    const score = Math.round((simpAnswers / questions.length) * 100);
    
    // Store results
    localStorage.setItem('simpTestScore', score);
    localStorage.setItem('simpTestTotal', simpAnswers);
    localStorage.removeItem('simpTestProgress');
    
    // Redirect to results
    window.location.href = 'simp-test-result.html';
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