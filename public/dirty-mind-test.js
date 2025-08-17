// Dirty Mind Test Questions
const questions = [
    {
        question: "What do you call a person who keeps talking when people are no longer interested?",
        optionA: "A teacher",
        optionB: "A boring person",
        dirty: "A"
    },
    {
        question: "What's long, hard, and has cum in it?",
        optionA: "A cucumber",
        optionB: "Something inappropriate",
        dirty: "B"
    },
    {
        question: "What goes in hard and pink but comes out soft and sticky?",
        optionA: "Bubble gum",
        optionB: "Something dirty",
        dirty: "B"
    },
    {
        question: "What's a four-letter word that ends in 'k' and means the same as intercourse?",
        optionA: "Talk",
        optionB: "Something else",
        dirty: "B"
    },
    {
        question: "What does a dog do that you can step into?",
        optionA: "Pants",
        optionB: "Something gross",
        dirty: "B"
    },
    {
        question: "What's the difference between a tire and 365 used condoms?",
        optionA: "One's a Goodyear, the other's a great year",
        optionB: "I don't know",
        dirty: "A"
    },
    {
        question: "What's white, sticky, and better to spit than to swallow?",
        optionA: "Toothpaste",
        optionB: "Something inappropriate",
        dirty: "B"
    },
    {
        question: "What's at least 6 inches long, goes in your mouth, and is more fun when it vibrates?",
        optionA: "An electric toothbrush",
        optionB: "Something dirty",
        dirty: "B"
    },
    {
        question: "What's the speed limit of sex?",
        optionA: "68, because at 69 you turn around",
        optionB: "There isn't one",
        dirty: "A"
    },
    {
        question: "What do you call a cheap circumcision?",
        optionA: "A rip-off",
        optionB: "Discount surgery",
        dirty: "A"
    },
    {
        question: "What's soft and warm when you go to bed, but hard and stiff when you wake up?",
        optionA: "Vomit",
        optionB: "Something inappropriate",
        dirty: "B"
    },
    {
        question: "What do you call a herd of cows masturbating?",
        optionA: "Beef strokin' off",
        optionB: "Inappropriate cows",
        dirty: "A"
    },
    {
        question: "What's long and hard and full of seamen?",
        optionA: "A submarine",
        optionB: "Something dirty",
        dirty: "B"
    },
    {
        question: "What do you call a person who doesn't masturbate?",
        optionA: "A liar",
        optionB: "Pure",
        dirty: "A"
    },
    {
        question: "What's the difference between your job and your wife?",
        optionA: "After 5 years, your job still sucks",
        optionB: "No difference",
        dirty: "A"
    },
    {
        question: "What do you call a sleeping bull?",
        optionA: "A bulldozer",
        optionB: "A tired bull",
        dirty: "B"
    },
    {
        question: "What's brown and sticky?",
        optionA: "A stick",
        optionB: "Something gross",
        dirty: "B"
    },
    {
        question: "What do you call a fake noodle?",
        optionA: "An impasta",
        optionB: "Fake food",
        dirty: "B"
    },
    {
        question: "What's the best thing about Switzerland?",
        optionA: "I don't know, but the flag is a big plus",
        optionB: "The mountains",
        dirty: "B"
    },
    {
        question: "What do you call a man with no arms and no legs in the water?",
        optionA: "Bob",
        optionB: "Helpless",
        dirty: "B"
    }
];

let currentQuestion = 0;
let dirtyAnswers = 0;

function initializeTest() {
    // Check if returning to test
    const savedProgress = localStorage.getItem('dirtyMindProgress');
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
    localStorage.setItem('dirtyMindProgress', JSON.stringify({
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
    localStorage.setItem('dirtyMindScore', score);
    localStorage.setItem('dirtyMindTotal', dirtyAnswers);
    localStorage.removeItem('dirtyMindProgress');
    
    // Redirect to results
    window.location.href = 'dirty-mind-result.html';
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