// Sexuality Test Questions
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
        optionB: "Characters of the same gender or both",
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
    },
    {
        question: "Your attraction patterns throughout your life have been:",
        optionA: "Consistently toward the opposite gender",
        optionB: "Varied or changing over time",
        exploring: "B"
    },
    {
        question: "When you think about your sexual and romantic preferences:",
        optionA: "They align with traditional heterosexual patterns",
        optionB: "They don't fit neatly into traditional categories",
        exploring: "B"
    },
    {
        question: "Your overall feeling about exploring your sexuality is:",
        optionA: "I feel confident in my current understanding",
        optionB: "I'm open to learning more about myself",
        exploring: "B"
    }
];

let currentQuestion = 0;
let exploringAnswers = 0;

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
    
    // Check if the chosen answer indicates exploration
    if (question.exploring === choice) {
        exploringAnswers++;
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
    // Calculate final score (percentage of exploring answers)
    const score = Math.round((exploringAnswers / questions.length) * 100);
    
    displayResults(score, exploringAnswers);
}

function displayResults(score, totalExploring) {
    // Hide quiz section and show results
    document.getElementById('quiz-section').classList.add('hidden');
    document.getElementById('intro-section').classList.add('hidden');
    document.getElementById('results-section').classList.remove('hidden');
    
    // Calculate dimensional scores
    const awarenessScore = Math.max(60, Math.min(100, score + Math.floor(Math.random() * 20)));
    const opennessScore = Math.max(70, Math.min(100, score + Math.floor(Math.random() * 15) + 10));
    const authenticityScore = Math.max(65, Math.min(100, score + Math.floor(Math.random() * 20) + 5));
    const courageScore = Math.max(75, Math.min(100, score + Math.floor(Math.random() * 15) + 15));
    
    // Update star ratings based on scores
    updateStarRating('awareness-stars', awarenessScore);
    updateStarRating('openness-stars', opennessScore);
    updateStarRating('authenticity-stars', authenticityScore);
    updateStarRating('courage-stars', courageScore);
    
    // Determine exploration level and description
    let level, description, explanation;
    
    if (score >= 70) {
        level = "Actively Exploring";
        description = "You're on a journey of self-discovery";
        explanation = `Your responses suggest you may be <strong>actively exploring your sexual orientation</strong>. This is a brave and important journey of self-discovery. You're asking important questions about your identity and attractions, which shows great self-awareness and courage. Remember that exploration is a process, and there's no rush to find all the answers immediately. Take your time, be patient with yourself, and know that whatever you discover about yourself is valid and worthy of celebration.`;
    } else if (score >= 40) {
        level = "Questioning & Reflecting";
        description = "You may be questioning aspects of your identity";
        explanation = `Your responses indicate you might be <strong>questioning and reflecting</strong> on your sexual orientation. This is completely normal and healthy. You may be experiencing some uncertainty or curiosity about your attractions and identity. This phase of questioning is an important part of self-discovery for many people. Consider giving yourself space to explore these feelings without pressure to label yourself immediately.`;
    } else if (score >= 20) {
        level = "Beginning to Wonder";
        description = "You might be starting to question your orientation";
        explanation = `Your responses suggest you may be <strong>beginning to wonder</strong> about your sexual orientation. Perhaps you're noticing some feelings or attractions that are making you question what you previously thought about yourself. This is the beginning of what could be an important journey of self-discovery. Be gentle with yourself and know that questioning is normal and healthy.`;
    } else {
        level = "Confident in Identity";
        description = "You seem confident in your current understanding";
        explanation = `Your responses suggest you feel <strong>confident in your current understanding</strong> of your sexual orientation. You may have a clear sense of your attractions and identity. Remember that sexual orientation can be fluid for some people, and it's okay if your understanding of yourself evolves over time. What matters most is that you feel authentic to yourself.`;
    }
    
    // Update display elements
    document.getElementById('sexuality-category').textContent = level;
    document.getElementById('score-description').textContent = description;
    document.getElementById('score-explanation').innerHTML = explanation + `<p><strong>Remember:</strong> This quiz is just a tool for reflection. Only you can determine your sexual orientation, and whatever that may be, you are valid, loved, and deserving of respect and happiness.</p>`;
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
    const text = `I just took a Sexuality Test for self-reflection. 🏳️‍🌈 Remember: your identity is valid whatever it may be! Explore at ricepurity-test.app`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Sexuality Exploration',
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
    exploringAnswers = 0;
    
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