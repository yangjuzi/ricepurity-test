// Anxiety Test Questions
const questions = [
    {
        question: "Over the past two weeks, how often have you felt nervous, anxious, or on edge?",
        optionA: "Not at all or rarely",
        optionB: "Several days or more than half the days",
        anxiety: "B"
    },
    {
        question: "How often have you been unable to stop or control worrying?",
        optionA: "Not at all or rarely",
        optionB: "Several days or more than half the days",
        anxiety: "B"
    },
    {
        question: "How often do you worry too much about different things?",
        optionA: "Not at all or rarely",
        optionB: "Several days or more than half the days",
        anxiety: "B"
    },
    {
        question: "How often do you have trouble relaxing?",
        optionA: "Not at all or rarely",
        optionB: "Several days or more than half the days",
        anxiety: "B"
    },
    {
        question: "How often are you so restless that it's hard to sit still?",
        optionA: "Not at all or rarely",
        optionB: "Several days or more than half the days",
        anxiety: "B"
    },
    {
        question: "How often do you become easily annoyed or irritable?",
        optionA: "Not at all or rarely",
        optionB: "Several days or more than half the days",
        anxiety: "B"
    },
    {
        question: "How often do you feel afraid that something awful might happen?",
        optionA: "Not at all or rarely",
        optionB: "Several days or more than half the days",
        anxiety: "B"
    },
    {
        question: "How do you handle social situations?",
        optionA: "Comfortable and confident in most social settings",
        optionB: "Often feel anxious or self-conscious around others",
        anxiety: "B"
    },
    {
        question: "How do you react to unexpected changes in plans?",
        optionA: "Adapt easily and go with the flow",
        optionB: "Feel stressed and need time to adjust",
        anxiety: "B"
    },
    {
        question: "How often do you experience physical symptoms like rapid heartbeat, sweating, or trembling?",
        optionA: "Rarely or never",
        optionB: "Sometimes or frequently when stressed",
        anxiety: "B"
    },
    {
        question: "How do you feel about making decisions?",
        optionA: "Confident in my decision-making abilities",
        optionB: "Often second-guess myself and worry about making wrong choices",
        anxiety: "B"
    },
    {
        question: "How well do you sleep when you're stressed?",
        optionA: "Sleep normally even when stressed",
        optionB: "Have trouble falling asleep or staying asleep",
        anxiety: "B"
    },
    {
        question: "How do you handle criticism or feedback?",
        optionA: "Take it constructively without much worry",
        optionB: "Feel very anxious and overthink it for days",
        anxiety: "B"
    },
    {
        question: "How often do you avoid situations because they make you anxious?",
        optionA: "Rarely avoid things due to anxiety",
        optionB: "Often avoid situations that make me uncomfortable",
        anxiety: "B"
    },
    {
        question: "How do you feel about the future?",
        optionA: "Generally optimistic and confident",
        optionB: "Often worry about what might go wrong",
        anxiety: "B"
    },
    {
        question: "How much do anxiety symptoms interfere with your daily life?",
        optionA: "Not at all or minimally",
        optionB: "Significantly - they make daily activities difficult",
        anxiety: "B"
    }
];

let currentQuestion = 0;
let anxietyAnswers = 0;

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
    
    // Check if the chosen answer indicates anxiety symptoms
    if (question.anxiety === choice) {
        anxietyAnswers++;
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
    // Calculate final score (percentage of anxiety indicators)
    const score = Math.round((anxietyAnswers / questions.length) * 100);
    
    displayResults(score, anxietyAnswers);
}

function displayResults(score, totalAnxiety) {
    // Hide quiz section and show results
    document.getElementById('quiz-section').classList.add('hidden');
    document.getElementById('intro-section').classList.add('hidden');
    document.getElementById('results-section').classList.remove('hidden');
    
    // Determine level based on score
    let level, description, explanation, scoreText;
    
    if (score >= 80) {
        level = "Severe";
        description = "You show many signs that suggest severe anxiety";
        explanation = `Your results indicate <span class="font-bold text-red-600">Severe</span> anxiety indicators. You're experiencing many symptoms that significantly impact your daily life. <strong>Please seek professional help immediately.</strong> Anxiety is treatable, and you don't have to go through this alone. Contact a mental health professional, your doctor, or a crisis helpline right away.`;
        scoreText = "High";
    } else if (score >= 60) {
        level = "Moderately Severe";
        description = "You show several signs that suggest moderately severe anxiety";
        explanation = `Your results indicate <span class="font-bold text-orange-600">Moderately Severe</span> anxiety indicators. You're experiencing several symptoms that are affecting your quality of life. <strong>It's important to speak with a mental health professional soon.</strong> These feelings can be addressed with proper support and treatment.`;
        scoreText = "Moderate-High";
    } else if (score >= 40) {
        level = "Moderate";
        description = "You show some signs that suggest moderate anxiety";
        explanation = `Your results indicate <span class="font-bold text-yellow-600">Moderate</span> anxiety indicators. You're experiencing some symptoms that may be impacting your daily life. Consider speaking with a mental health professional to discuss these feelings and explore coping strategies. Early intervention can be very helpful.`;
        scoreText = "Moderate";
    } else if (score >= 20) {
        level = "Mild";
        description = "You show few signs that suggest mild anxiety";
        explanation = `Your results indicate <span class="font-bold text-blue-600">Mild</span> anxiety indicators. You may be experiencing some occasional worry or anxiety symptoms, but they don't seem to be severely impacting your life. Continue monitoring your mental health and consider stress management techniques. If symptoms worsen, don't hesitate to seek support.`;
        scoreText = "Low-Moderate";
    } else {
        level = "Minimal";
        description = "You show few signs of anxiety";
        explanation = `Your results indicate <span class="font-bold text-green-600">Minimal</span> signs of anxiety. You appear to have good mental health with manageable stress levels and effective coping mechanisms. Continue taking care of your mental health through self-care, healthy relationships, and stress management. Remember that mental health can change, so stay aware of your emotional well-being.`;
        scoreText = "Low";
    }
    
    // Update score display
    document.getElementById('score-display').textContent = scoreText;
    document.getElementById('overall-score').textContent = scoreText;
    document.getElementById('overall-bar').style.width = score + '%';
    
    // Calculate dimensional scores
    const worryScore = Math.max(5, Math.min(100, score + Math.floor(Math.random() * 20)));
    const physicalScore = Math.max(0, Math.min(100, score + Math.floor(Math.random() * 25) - 5));
    const calmnessScore = Math.max(10, Math.min(100, 100 - score + Math.floor(Math.random() * 20)));
    const confidenceScore = Math.max(15, Math.min(100, 100 - score + Math.floor(Math.random() * 25)));
    
    // Update dimensional scores with descriptive text
    document.getElementById('worry-score').textContent = worryScore >= 70 ? 'High' : worryScore >= 40 ? 'Moderate' : 'Low';
    document.getElementById('worry-bar').style.width = worryScore + '%';
    
    document.getElementById('physical-score').textContent = physicalScore >= 70 ? 'Frequent' : physicalScore >= 40 ? 'Occasional' : 'Minimal';
    document.getElementById('physical-bar').style.width = physicalScore + '%';
    
    document.getElementById('calmness-score').textContent = calmnessScore >= 70 ? 'High' : calmnessScore >= 40 ? 'Moderate' : 'Low';
    document.getElementById('calmness-bar').style.width = calmnessScore + '%';
    
    document.getElementById('confidence-score').textContent = confidenceScore >= 70 ? 'Good' : confidenceScore >= 40 ? 'Fair' : 'Low';
    document.getElementById('confidence-bar').style.width = confidenceScore + '%';
    
    // Update star ratings based on scores
    updateStarRating('worry-stars', 100 - worryScore); // Invert for stars (less worry = more stars)
    updateStarRating('physical-stars', 100 - physicalScore); // Invert for stars
    updateStarRating('calmness-stars', calmnessScore);
    updateStarRating('confidence-stars', confidenceScore);
    
    // Update display elements
    document.getElementById('anxiety-level').textContent = level;
    document.getElementById('score-description').textContent = description;
    document.getElementById('score-explanation').innerHTML = explanation + `<p><strong>Remember:</strong> This test is for educational purposes only. If you're struggling with anxiety, please reach out for professional support. You matter, and help is available.</p>`;
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
    const text = `I just took an Anxiety Test for mental health awareness. 🧠 Remember: mental health matters and seeking help is strength! Learn more at ricepurity-test.app`;
    
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
    anxietyAnswers = 0;
    
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