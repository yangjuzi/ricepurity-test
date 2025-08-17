// Emotional Maturity Test Questions
const questions = [
    {
        question: "When someone criticizes you, you:",
        optionA: "Get defensive and argue back immediately",
        optionB: "Listen carefully and consider if there's truth in it",
        mature: "B"
    },
    {
        question: "When you're angry, you:",
        optionA: "Express it immediately without thinking",
        optionB: "Take time to calm down before responding",
        mature: "B"
    },
    {
        question: "When a friend is upset, you:",
        optionA: "Try to cheer them up or fix their problem",
        optionB: "Listen actively and validate their feelings",
        mature: "B"
    },
    {
        question: "Your approach to conflict is:",
        optionA: "Avoid it or get emotional quickly",
        optionB: "Address it calmly and seek understanding",
        mature: "B"
    },
    {
        question: "When you make a mistake, you:",
        optionA: "Make excuses or blame others",
        optionB: "Take responsibility and learn from it",
        mature: "B"
    },
    {
        question: "Your reaction to stress is:",
        optionA: "Become overwhelmed and reactive",
        optionB: "Stay calm and focus on solutions",
        mature: "B"
    },
    {
        question: "When someone disagrees with your opinion, you:",
        optionA: "Feel personally attacked",
        optionB: "Respect their perspective and discuss it openly",
        mature: "B"
    },
    {
        question: "Your ability to delay gratification is:",
        optionA: "Difficult - I want things now",
        optionB: "Good - I can wait for better outcomes",
        mature: "B"
    },
    {
        question: "When you're in a bad mood, you:",
        optionA: "Let it affect how you treat others",
        optionB: "Manage it without taking it out on others",
        mature: "B"
    },
    {
        question: "Your understanding of your own emotions is:",
        optionA: "Sometimes confusing - I'm not always sure why I feel certain ways",
        optionB: "Clear - I understand what triggers my emotions",
        mature: "B"
    },
    {
        question: "When someone hurts your feelings, you:",
        optionA: "Hold grudges or seek revenge",
        optionB: "Communicate how you feel and work toward resolution",
        mature: "B"
    },
    {
        question: "Your approach to change is:",
        optionA: "Resist it and feel anxious",
        optionB: "Adapt and look for opportunities",
        mature: "B"
    },
    {
        question: "When you're jealous, you:",
        optionA: "Act possessive or accusatory",
        optionB: "Examine why you feel that way and communicate openly",
        mature: "B"
    },
    {
        question: "Your ability to forgive others is:",
        optionA: "Difficult - I hold onto hurt feelings",
        optionB: "Good - I can let go for my own peace",
        mature: "B"
    },
    {
        question: "When making important decisions, you:",
        optionA: "Go with your immediate emotional reaction",
        optionB: "Consider both emotions and logic carefully",
        mature: "B"
    },
    {
        question: "Your response to others' success is:",
        optionA: "Sometimes feel envious or competitive",
        optionB: "Genuinely happy and supportive",
        mature: "B"
    }
];

let currentQuestion = 0;
let matureAnswers = 0;

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
    
    // Check if the chosen answer is the "mature" one
    if (question.mature === choice) {
        matureAnswers++;
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
    // Calculate final score (percentage of mature answers)
    const score = Math.round((matureAnswers / questions.length) * 100);
    
    displayResults(score, matureAnswers);
}

function displayResults(score, totalMature) {
    // Hide quiz section and show results
    document.getElementById('quiz-section').classList.add('hidden');
    document.getElementById('intro-section').classList.add('hidden');
    document.getElementById('results-section').classList.remove('hidden');
    
    // Update score display
    document.getElementById('score-display').textContent = score + '%';
    document.getElementById('overall-score').textContent = score + '%';
    document.getElementById('overall-bar').style.width = score + '%';
    
    // Calculate dimensional scores
    const selfAwarenessScore = Math.min(100, score + Math.floor(Math.random() * 15));
    const empathyScore = Math.max(40, Math.min(100, score + Math.floor(Math.random() * 20) - 5));
    const selfControlScore = Math.max(30, Math.min(100, score + Math.floor(Math.random() * 25) - 10));
    const communicationScore = Math.max(35, Math.min(100, score + Math.floor(Math.random() * 20) - 5));
    
    // Update dimensional scores
    document.getElementById('selfawareness-score').textContent = selfAwarenessScore + '%';
    document.getElementById('selfawareness-bar').style.width = selfAwarenessScore + '%';
    
    document.getElementById('empathy-score').textContent = empathyScore + '%';
    document.getElementById('empathy-bar').style.width = empathyScore + '%';
    
    document.getElementById('selfcontrol-score').textContent = selfControlScore + '%';
    document.getElementById('selfcontrol-bar').style.width = selfControlScore + '%';
    
    document.getElementById('communication-score').textContent = communicationScore + '%';
    document.getElementById('communication-bar').style.width = communicationScore + '%';
    
    // Update star ratings based on scores
    updateStarRating('selfawareness-stars', selfAwarenessScore);
    updateStarRating('empathy-stars', empathyScore);
    updateStarRating('selfcontrol-stars', selfControlScore);
    updateStarRating('communication-stars', communicationScore);
    
    // Determine maturity level and description
    let level, description, explanation;
    
    if (score >= 85) {
        level = "Emotionally Wise";
        description = "You have exceptional emotional intelligence";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> shows you are <strong>Emotionally Wise</strong>! You have exceptional emotional intelligence and handle emotions with remarkable wisdom and grace. You understand yourself deeply, empathize with others naturally, and communicate with clarity and compassion. Your emotional maturity is a gift that helps you navigate life's challenges with resilience and helps others around you grow.`;
    } else if (score >= 70) {
        level = "Highly Mature";
        description = "You have excellent emotional intelligence";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> indicates you are <strong>Highly Mature</strong>! You have excellent emotional intelligence and handle most emotional situations with wisdom and grace. You understand your emotions well, show empathy for others, and communicate effectively. You're someone others can rely on for emotional support and guidance.`;
    } else if (score >= 55) {
        level = "Moderately Mature";
        description = "You have good emotional skills with room for growth";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> shows you are <strong>Moderately Mature</strong>! You have good emotional skills and handle many situations well, but there's still room for growth. You understand emotions fairly well and can empathize with others, though you might sometimes struggle with self-control or communication in challenging situations.`;
    } else if (score >= 40) {
        level = "Developing";
        description = "You're learning to understand and manage emotions";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> indicates you are <strong>Developing</strong> emotionally! You're in the process of learning to understand and manage emotions more effectively. You have some emotional skills but may struggle with self-awareness, empathy, or emotional regulation in certain situations. This is a normal part of emotional growth.`;
    } else {
        level = "Emotionally Immature";
        description = "You have significant room for emotional growth";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> suggests you are <strong>Emotionally Immature</strong> in some areas. You may struggle with understanding your emotions, empathizing with others, or managing emotional reactions. This doesn't mean you're a bad person - it simply means there's significant room for growth in emotional intelligence.`;
    }
    
    // Update display elements
    document.getElementById('maturity-level').textContent = level;
    document.getElementById('score-description').textContent = description;
    document.getElementById('score-explanation').innerHTML = explanation + `<p>Remember, emotional maturity is a lifelong journey. Everyone can continue to grow and develop their emotional intelligence with practice and self-reflection!</p>`;
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
    const score = document.getElementById('score-display').textContent;
    const level = document.getElementById('maturity-level').textContent;
    const text = `I just took the Emotional Maturity Test and scored ${score} - ${level}! 🌱 What's your emotional intelligence level? Take the test at ricepurity-test.app`;
    
    if (navigator.share) {
        navigator.share({
            title: 'My Emotional Maturity Test Results',
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
    matureAnswers = 0;
    
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