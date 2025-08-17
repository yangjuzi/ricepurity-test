// Kink Test Questions
const questions = [
    {
        question: "Your approach to trying new things in intimate relationships is:",
        optionA: "I prefer traditional and familiar approaches",
        optionB: "I'm open to exploring new experiences with my partner",
        kinky: "B"
    },
    {
        question: "How do you feel about role-playing in intimate settings?",
        optionA: "Not interested or uncomfortable with it",
        optionB: "Curious about it or enjoy it",
        kinky: "B"
    },
    {
        question: "Your comfort level with discussing fantasies is:",
        optionA: "I prefer to keep fantasies private",
        optionB: "I'm comfortable sharing and discussing fantasies",
        kinky: "B"
    },
    {
        question: "How do you feel about using accessories or toys?",
        optionA: "Not interested or prefer without them",
        optionB: "Open to using them or already do",
        kinky: "B"
    },
    {
        question: "Your attitude toward power dynamics in relationships is:",
        optionA: "I prefer equal, traditional dynamics",
        optionB: "I'm interested in exploring different power dynamics",
        kinky: "B"
    },
    {
        question: "How important is spontaneity versus planning in intimate moments?",
        optionA: "I prefer spontaneous, natural moments",
        optionB: "I enjoy planning and setting up special scenarios",
        kinky: "B"
    },
    {
        question: "Your comfort with discussing boundaries and limits is:",
        optionA: "I assume we both know what's okay",
        optionB: "I believe in explicit communication about boundaries",
        kinky: "B"
    },
    {
        question: "How do you feel about experimenting with different locations?",
        optionA: "I prefer private, traditional settings",
        optionB: "I'm open to different locations (while being safe and legal)",
        kinky: "B"
    },
    {
        question: "Your attitude toward sensory experiences (like blindfolds, ice, etc.) is:",
        optionA: "Not interested in sensory play",
        optionB: "Curious about or enjoy sensory experiences",
        kinky: "B"
    },
    {
        question: "How do you approach the topic of fantasies with partners?",
        optionA: "I rarely discuss fantasies",
        optionB: "I think sharing fantasies can enhance intimacy",
        kinky: "B"
    },
    {
        question: "Your comfort level with light restraints (like silk ties) is:",
        optionA: "Not interested or uncomfortable",
        optionB: "Open to trying or already enjoy them",
        kinky: "B"
    },
    {
        question: "How do you feel about dressing up or costumes?",
        optionA: "Not something I'm interested in",
        optionB: "Fun and exciting way to add variety",
        kinky: "B"
    },
    {
        question: "Your approach to communication during intimate moments is:",
        optionA: "Prefer quiet, natural communication",
        optionB: "Enjoy verbal communication and feedback",
        kinky: "B"
    },
    {
        question: "How do you feel about temperature play (ice, warmth, etc.)?",
        optionA: "Not interested in temperature variations",
        optionB: "Curious about or enjoy temperature play",
        kinky: "B"
    },
    {
        question: "Your attitude toward trying things you've seen in movies or read about is:",
        optionA: "I prefer to stick with what I know",
        optionB: "I'm curious to try new things I've learned about",
        kinky: "B"
    },
    {
        question: "How important is variety in your intimate life?",
        optionA: "I'm happy with routine and consistency",
        optionB: "I value variety and trying new things",
        kinky: "B"
    },
    {
        question: "Your comfort with discussing what you like and don't like is:",
        optionA: "I find it awkward to discuss preferences",
        optionB: "I believe open communication is essential",
        kinky: "B"
    },
    {
        question: "How do you feel about massage oils, candles, or similar accessories?",
        optionA: "Not necessary for a good experience",
        optionB: "They can enhance the experience",
        kinky: "B"
    },
    {
        question: "Your approach to learning about intimacy is:",
        optionA: "I rely on natural instincts",
        optionB: "I actively seek to learn and improve",
        kinky: "B"
    },
    {
        question: "How do you view the relationship between emotional and physical intimacy?",
        optionA: "They should be simple and straightforward",
        optionB: "They can be complex and multifaceted",
        kinky: "B"
    }
];

let currentQuestion = 0;
let kinkyAnswers = 0;

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
    
    // Check if the chosen answer is the "kinky" one
    if (question.kinky === choice) {
        kinkyAnswers++;
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
    // Calculate final score (percentage of kinky answers)
    const score = Math.round((kinkyAnswers / questions.length) * 100);
    
    displayResults(score, kinkyAnswers);
}

function displayResults(score, totalKinky) {
    // Hide quiz section and show results
    document.getElementById('quiz-section').classList.add('hidden');
    document.getElementById('intro-section').classList.add('hidden');
    document.getElementById('results-section').classList.remove('hidden');
    
    // Update score display
    document.getElementById('score-display').textContent = score + '%';
    document.getElementById('overall-score').textContent = score + '%';
    document.getElementById('overall-bar').style.width = score + '%';
    
    // Calculate dimensional scores
    const opennessScore = Math.min(100, score + Math.floor(Math.random() * 20));
    const adventureScore = Math.max(20, Math.min(100, score + Math.floor(Math.random() * 25) - 5));
    const communicationScore = Math.max(50, Math.min(100, score + Math.floor(Math.random() * 30) + 10));
    const boundariesScore = Math.max(60, Math.min(100, 90 + Math.floor(Math.random() * 20)));
    
    // Update dimensional scores
    document.getElementById('openness-score').textContent = opennessScore + '%';
    document.getElementById('openness-bar').style.width = opennessScore + '%';
    
    document.getElementById('adventure-score').textContent = adventureScore + '%';
    document.getElementById('adventure-bar').style.width = adventureScore + '%';
    
    document.getElementById('communication-score').textContent = communicationScore + '%';
    document.getElementById('communication-bar').style.width = communicationScore + '%';
    
    document.getElementById('boundaries-score').textContent = boundariesScore + '%';
    document.getElementById('boundaries-bar').style.width = boundariesScore + '%';
    
    // Update star ratings based on scores
    updateStarRating('openness-stars', opennessScore);
    updateStarRating('adventure-stars', adventureScore);
    updateStarRating('communication-stars', communicationScore);
    updateStarRating('boundaries-stars', boundariesScore);
    
    // Determine kink level and description
    let level, description, explanation;
    
    if (score >= 80) {
        level = "Extremely Kinky";
        description = "You're very adventurous and open to exploration";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> shows you're <strong>Extremely Kinky</strong>! You're very open to exploration and trying new things in intimate relationships. You value communication, consent, and pushing boundaries safely. Your adventurous spirit and openness to new experiences make you an exciting partner who prioritizes both pleasure and safety.`;
    } else if (score >= 60) {
        level = "Very Adventurous";
        description = "You enjoy exploring and trying new experiences";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> indicates you're <strong>Very Adventurous</strong>! You enjoy exploring new experiences and are open to various forms of intimacy. You value communication and are willing to step outside your comfort zone with the right partner. Your adventurous nature is balanced with good communication skills.`;
    } else if (score >= 40) {
        level = "Moderately Adventurous";
        description = "You're open to some exploration";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> shows you're <strong>Moderately Adventurous</strong>! You're open to some exploration and new experiences while maintaining clear boundaries. You value both adventure and comfort, making thoughtful choices about what you're willing to try. Your balanced approach shows maturity and self-awareness.`;
    } else if (score >= 20) {
        level = "Slightly Adventurous";
        description = "You prefer familiar experiences with occasional variety";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> indicates you're <strong>Slightly Adventurous</strong>! You generally prefer familiar experiences but are occasionally open to trying something new. You value comfort and security in intimate relationships while being open to gentle exploration with a trusted partner.`;
    } else {
        level = "Traditional";
        description = "You prefer conventional and familiar approaches";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> shows you're <strong>Traditional</strong>! You prefer conventional approaches to intimacy and value familiarity and comfort. You believe in the beauty of simple, traditional expressions of love and intimacy. Your approach emphasizes emotional connection and classic romance.`;
    }
    
    // Update display elements
    document.getElementById('kink-level').textContent = level;
    document.getElementById('score-description').textContent = description;
    document.getElementById('score-explanation').innerHTML = explanation + `<p>Remember, all preferences are valid as long as they involve consenting adults. The most important aspects of any intimate relationship are communication, respect, and mutual consent.</p>`;
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
    const level = document.getElementById('kink-level').textContent;
    const text = `I just took the Kink Test and I'm ${level}! 🔗 Explore your preferences safely at ricepurity-test.app`;
    
    if (navigator.share) {
        navigator.share({
            title: 'My Kink Test Results',
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
    kinkyAnswers = 0;
    
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