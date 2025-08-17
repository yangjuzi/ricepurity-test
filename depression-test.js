// Depression Test Questions
const questions = [
    {
        question: "Over the past two weeks, how often have you felt down, depressed, or hopeless?",
        optionA: "Not at all or rarely",
        optionB: "Several days or more than half the days",
        depression: "B"
    },
    {
        question: "How often have you had little interest or pleasure in doing things?",
        optionA: "Not at all or rarely",
        optionB: "Several days or more than half the days",
        depression: "B"
    },
    {
        question: "How has your sleep been lately?",
        optionA: "Normal and restful",
        optionB: "Trouble falling asleep, staying asleep, or sleeping too much",
        depression: "B"
    },
    {
        question: "How would you describe your energy levels?",
        optionA: "Normal or good energy",
        optionB: "Feeling tired or having little energy",
        depression: "B"
    },
    {
        question: "How has your appetite been?",
        optionA: "Normal appetite",
        optionB: "Poor appetite or overeating",
        depression: "B"
    },
    {
        question: "How do you feel about yourself lately?",
        optionA: "Generally positive about myself",
        optionB: "Feeling bad about myself or like I'm a failure",
        depression: "B"
    },
    {
        question: "How is your concentration and focus?",
        optionA: "Normal concentration",
        optionB: "Trouble concentrating on things like reading or watching TV",
        depression: "B"
    },
    {
        question: "How would others describe your recent behavior?",
        optionA: "Normal pace and energy",
        optionB: "Moving or speaking slowly, or being fidgety and restless",
        depression: "B"
    },
    {
        question: "How often do you think about death or self-harm?",
        optionA: "Not at all",
        optionB: "Sometimes or frequently",
        depression: "B"
    },
    {
        question: "How do you feel about the future?",
        optionA: "Optimistic or hopeful",
        optionB: "Pessimistic or hopeless",
        depression: "B"
    },
    {
        question: "How much do you enjoy activities you used to love?",
        optionA: "Still enjoy them as much as before",
        optionB: "Lost interest or enjoyment in most activities",
        depression: "B"
    },
    {
        question: "How do you handle daily tasks and responsibilities?",
        optionA: "Manage them normally",
        optionB: "Find them overwhelming or difficult to complete",
        depression: "B"
    },
    {
        question: "How connected do you feel to others?",
        optionA: "Connected and supported",
        optionB: "Isolated, lonely, or disconnected",
        depression: "B"
    },
    {
        question: "How do you view your self-worth?",
        optionA: "I have value and worth",
        optionB: "I feel worthless or like a burden to others",
        depression: "B"
    },
    {
        question: "How much do these feelings interfere with your daily life?",
        optionA: "Not at all or minimally",
        optionB: "Significantly - they make daily life difficult",
        depression: "B"
    }
];

let currentQuestion = 0;
let depressionAnswers = 0;

function initializeTest() {
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
    
    // Check if the chosen answer indicates depression symptoms
    if (question.depression === choice) {
        depressionAnswers++;
    }
    
    currentQuestion++;
    
    // Add animation before moving to next question
    const card = document.querySelector('#quiz-section .bg-white.rounded-2xl');
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
    // Calculate final score (percentage of depression indicators)
    const score = Math.round((depressionAnswers / questions.length) * 100);
    
    displayResults(score, depressionAnswers);
}

function displayResults(score, totalDepression) {
    // Hide quiz section and show results
    document.getElementById('quiz-section').classList.add('hidden');
    document.getElementById('intro-section').classList.add('hidden');
    document.getElementById('results-section').classList.remove('hidden');
    
    // Determine level based on score
    let level, description, explanation, scoreText;
    
    if (score >= 80) {
        level = "Severe";
        description = "You show many signs that suggest severe depression";
        explanation = `Your results indicate <span class="font-bold text-red-600">Severe</span> depression indicators. You're experiencing many symptoms that significantly impact your daily life. <strong>Please seek professional help immediately.</strong> Depression is treatable, and you don't have to go through this alone. Contact a mental health professional, your doctor, or a crisis helpline right away.`;
        scoreText = "High";
    } else if (score >= 60) {
        level = "Moderately Severe";
        description = "You show several signs that suggest moderately severe depression";
        explanation = `Your results indicate <span class="font-bold text-orange-600">Moderately Severe</span> depression indicators. You're experiencing several symptoms that are affecting your quality of life. <strong>It's important to speak with a mental health professional soon.</strong> These feelings can be addressed with proper support and treatment.`;
        scoreText = "Moderate-High";
    } else if (score >= 40) {
        level = "Moderate";
        description = "You show some signs that suggest moderate depression";
        explanation = `Your results indicate <span class="font-bold text-yellow-600">Moderate</span> depression indicators. You're experiencing some symptoms that may be impacting your daily life. Consider speaking with a mental health professional to discuss these feelings and explore coping strategies. Early intervention can be very helpful.`;
        scoreText = "Moderate";
    } else if (score >= 20) {
        level = "Mild";
        description = "You show few signs that suggest mild depression";
        explanation = `Your results indicate <span class="font-bold text-blue-600">Mild</span> depression indicators. You may be experiencing some occasional low moods or symptoms, but they don't seem to be severely impacting your life. Continue monitoring your mental health and consider self-care practices. If symptoms worsen, don't hesitate to seek support.`;
        scoreText = "Low-Moderate";
    } else {
        level = "Minimal";
        description = "You show few signs of depression";
        explanation = `Your results indicate <span class="font-bold text-green-600">Minimal</span> signs of depression. You appear to have good mental health with positive mood, energy, and outlook on life. Continue taking care of your mental health through self-care, healthy relationships, and stress management. Remember that mental health can change, so stay aware of your emotional well-being.`;
        scoreText = "Low";
    }
    
    // Update score display
    document.getElementById('score-display').textContent = scoreText;
    document.getElementById('overall-score').textContent = scoreText;
    document.getElementById('overall-bar').style.width = score + '%';
    
    // Calculate dimensional scores
    const moodScore = Math.max(10, Math.min(100, 100 - score + Math.floor(Math.random() * 20)));
    const energyScore = Math.max(15, Math.min(100, 100 - score + Math.floor(Math.random() * 25)));
    const motivationScore = Math.max(20, Math.min(100, 100 - score + Math.floor(Math.random() * 20)));
    const hopeScore = Math.max(25, Math.min(100, 100 - score + Math.floor(Math.random() * 30)));
    
    // Update dimensional scores with descriptive text
    document.getElementById('mood-score').textContent = moodScore >= 70 ? 'Good' : moodScore >= 40 ? 'Fair' : 'Poor';
    document.getElementById('mood-bar').style.width = moodScore + '%';
    
    document.getElementById('energy-score').textContent = energyScore >= 70 ? 'Good' : energyScore >= 40 ? 'Fair' : 'Low';
    document.getElementById('energy-bar').style.width = energyScore + '%';
    
    document.getElementById('motivation-score').textContent = motivationScore >= 70 ? 'Good' : motivationScore >= 40 ? 'Fair' : 'Low';
    document.getElementById('motivation-bar').style.width = motivationScore + '%';
    
    document.getElementById('hope-score').textContent = hopeScore >= 70 ? 'High' : hopeScore >= 40 ? 'Moderate' : 'Low';
    document.getElementById('hope-bar').style.width = hopeScore + '%';
    
    // Update star ratings based on scores
    updateStarRating('mood-stars', moodScore);
    updateStarRating('energy-stars', energyScore);
    updateStarRating('motivation-stars', motivationScore);
    updateStarRating('hope-stars', hopeScore);
    
    // Update display elements
    document.getElementById('depression-level').textContent = level;
    document.getElementById('score-description').textContent = description;
    document.getElementById('score-explanation').innerHTML = explanation + `<p><strong>Remember:</strong> This test is for educational purposes only. If you're struggling with your mental health, please reach out for professional support. You matter, and help is available.</p>`;
}

function updateStarRating(elementId, score) {
    const container = document.getElementById(elementId);
    const stars = container.querySelectorAll('i');
    const filledStars = Math.round(score / 20); // Convert 0-100 to 0-5 stars
    
    stars.forEach((star, index) => {
        if (index < filledStars) {
            star.classList.remove('text-gray-300');
            star.classList.add('text-yellow-300');
        } else {
            star.classList.remove('text-yellow-300');
            star.classList.add('text-gray-300');
        }
    });
}

function shareResults() {
    const text = `I just took a Depression Test for mental health awareness. 🧠 Remember: mental health matters and seeking help is strength! Learn more at ricepurity-test.app`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Mental Health Awareness',
            text: text,
            url: window.location.origin
        });
    } else {
        // Fallback to copying to clipboard
        navigator.clipboard.writeText(text).then(() => {
            // Show temporary success message
            const shareBtn = document.getElementById('share-btn');
            const originalText = shareBtn.innerHTML;
            shareBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Copied!';
            shareBtn.classList.remove('bg-secondary');
            shareBtn.classList.add('bg-green-500');
            
            setTimeout(() => {
                shareBtn.innerHTML = originalText;
                shareBtn.classList.remove('bg-green-500');
                shareBtn.classList.add('bg-secondary');
            }, 2000);
        });
    }
}

function restartTest() {
    // Reset variables
    currentQuestion = 0;
    depressionAnswers = 0;
    
    // Show quiz section and hide results
    document.getElementById('quiz-section').classList.remove('hidden');
    document.getElementById('intro-section').classList.remove('hidden');
    document.getElementById('results-section').classList.add('hidden');
    
    // Restart the test
    initializeTest();
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    initializeTest();
    
    const optionA = document.getElementById('option-a');
    const optionB = document.getElementById('option-b');
    const restartBtn = document.getElementById('restart-btn');
    const shareBtn = document.getElementById('share-btn');
    
    optionA.addEventListener('click', () => answerQuestion('A'));
    optionB.addEventListener('click', () => answerQuestion('B'));
    restartBtn.addEventListener('click', restartTest);
    shareBtn.addEventListener('click', shareResults);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'a' || e.key === 'A' || e.key === '1') {
            answerQuestion('A');
        } else if (e.key === 'b' || e.key === 'B' || e.key === '2') {
            answerQuestion('B');
        }
    });
});