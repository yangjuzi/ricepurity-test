// Am I In Love Quiz Questions
const questions = [
    {
        question: "When you think about this person, you feel:",
        optionA: "Happy and excited, but it's not overwhelming",
        optionB: "An intense warmth and joy that fills your entire being",
        love: "B"
    },
    {
        question: "How often do you think about them during the day?",
        optionA: "Sometimes, when something reminds me of them",
        optionB: "Constantly - they're always on my mind",
        love: "B"
    },
    {
        question: "When you're apart from them, you:",
        optionA: "Miss them but can focus on other things",
        optionB: "Feel incomplete and count the moments until you see them again",
        love: "B"
    },
    {
        question: "Your feelings toward their flaws and imperfections are:",
        optionA: "I notice them but they don't bother me much",
        optionB: "I find them endearing and love them even more for their imperfections",
        love: "B"
    },
    {
        question: "When you imagine your future, you:",
        optionA: "Sometimes picture them in it",
        optionB: "Can't imagine it without them - they're in every scenario",
        love: "B"
    },
    {
        question: "How do you feel about their happiness?",
        optionA: "I want them to be happy",
        optionB: "Their happiness is more important to me than my own",
        love: "B"
    },
    {
        question: "When they're sad or upset, you:",
        optionA: "Feel bad for them and want to help",
        optionB: "Feel their pain as if it were your own and would do anything to make it better",
        love: "B"
    },
    {
        question: "Your desire to spend time with them is:",
        optionA: "Strong - I enjoy their company",
        optionB: "Overwhelming - I want to spend every moment with them",
        love: "B"
    },
    {
        question: "When you look at them, you feel:",
        optionA: "Attracted and happy",
        optionB: "Like you're looking at the most beautiful person in the world",
        love: "B"
    },
    {
        question: "How has knowing them changed you?",
        optionA: "I've learned some new things about myself",
        optionB: "They've made me want to become the best version of myself",
        love: "B"
    },
    {
        question: "Your willingness to sacrifice for them is:",
        optionA: "I'd help them out when I can",
        optionB: "I'd give up almost anything to make them happy",
        love: "B"
    },
    {
        question: "When you're with them, time:",
        optionA: "Passes pleasantly",
        optionB: "Flies by so fast it feels like minutes, even when it's hours",
        love: "B"
    },
    {
        question: "The thought of them being with someone else makes you feel:",
        optionA: "A bit jealous but I'd accept it",
        optionB: "Devastated and heartbroken",
        love: "B"
    },
    {
        question: "Your physical attraction to them is:",
        optionA: "Strong and enjoyable",
        optionB: "Intense and all-consuming - they take your breath away",
        love: "B"
    },
    {
        question: "When you say 'I love you' (or think about saying it), it feels:",
        optionA: "Nice and meaningful",
        optionB: "Like the most important and true words you've ever spoken",
        love: "B"
    },
    {
        question: "How do you feel about growing old with them?",
        optionA: "It sounds nice",
        optionB: "It's exactly what I want - I can't imagine aging with anyone else",
        love: "B"
    },
    {
        question: "Your overall feeling about this relationship is:",
        optionA: "It's really good and makes me happy",
        optionB: "It's everything I've ever wanted and more - they complete me",
        love: "B"
    }
];

let currentQuestion = 0;
let loveAnswers = 0;

function initializeTest() {
    // Check if returning to test
    const savedProgress = localStorage.getItem('loveQuizProgress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        currentQuestion = progress.currentQuestion;
        loveAnswers = progress.loveAnswers;
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
    
    // Check if the chosen answer is the "love" one
    if (question.love === choice) {
        loveAnswers++;
    }
    
    currentQuestion++;
    
    // Save progress
    localStorage.setItem('loveQuizProgress', JSON.stringify({
        currentQuestion: currentQuestion,
        loveAnswers: loveAnswers
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
    // Calculate final score (percentage of love answers)
    const score = Math.round((loveAnswers / questions.length) * 100);
    
    // Store results
    localStorage.setItem('loveQuizScore', score);
    localStorage.setItem('loveQuizTotal', loveAnswers);
    localStorage.removeItem('loveQuizProgress');
    
    // Redirect to results
    window.location.href = 'love-quiz-result.html';
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