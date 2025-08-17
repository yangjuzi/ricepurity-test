// Am I Lesbian Quiz Questions
const questions = [
    {
        question: "When you think about romantic relationships, you feel most drawn to:",
        optionA: "Men or people of other genders",
        optionB: "Women and feminine-identifying people",
        exploring: "B"
    },
    {
        question: "Your past crushes have been:",
        optionA: "Mostly on men or other genders",
        optionB: "Primarily or exclusively on women",
        exploring: "B"
    },
    {
        question: "When you see attractive women, you:",
        optionA: "Appreciate their beauty but don't feel romantic attraction",
        optionB: "Feel romantic, emotional, or physical attraction",
        exploring: "B"
    },
    {
        question: "Your ideal romantic partner would be:",
        optionA: "A man or someone of another gender",
        optionB: "A woman or feminine-identifying person",
        exploring: "B"
    },
    {
        question: "When you imagine your future relationships, you see:",
        optionA: "Yourself with men or other genders",
        optionB: "Yourself with women or feminine-identifying people",
        exploring: "B"
    },
    {
        question: "Your feelings about dating women are:",
        optionA: "It doesn't appeal to me personally",
        optionB: "It appeals to me or I'm curious about it",
        exploring: "B"
    },
    {
        question: "When you think about physical intimacy, you're most interested in:",
        optionA: "Being with men or other genders",
        optionB: "Being with women or feminine-identifying people",
        exploring: "B"
    },
    {
        question: "Your emotional connections tend to be strongest with:",
        optionA: "Men or people of other genders",
        optionB: "Women and feminine-identifying people",
        exploring: "B"
    },
    {
        question: "When you see lesbian couples, you feel:",
        optionA: "Happy for them but don't relate personally",
        optionB: "A sense of connection or 'that could be me'",
        exploring: "B"
    },
    {
        question: "Your interest in lesbian representation in media is:",
        optionA: "I support it but don't seek it out personally",
        optionB: "I actively seek it out and feel represented by it",
        exploring: "B"
    },
    {
        question: "Your comfort level with lesbian identity and community is:",
        optionA: "Supportive but as an ally from outside",
        optionB: "I feel a personal connection or sense of belonging",
        exploring: "B"
    },
    {
        question: "When you think about your attraction patterns, they:",
        optionA: "Include men or other genders significantly",
        optionB: "Are primarily or exclusively toward women",
        exploring: "B"
    },
    {
        question: "Your feelings about the term 'lesbian' are:",
        optionA: "It's a valid identity but not one I relate to",
        optionB: "It resonates with me or I'm curious about it",
        exploring: "B"
    },
    {
        question: "When you imagine your ideal life partner, you picture:",
        optionA: "A man or someone of another gender",
        optionB: "A woman or feminine-identifying person",
        exploring: "B"
    },
    {
        question: "Your overall feelings about your sexual orientation are:",
        optionA: "I'm confident I'm attracted to men or other genders",
        optionB: "I'm questioning or exploring attraction to women",
        exploring: "B"
    },
    {
        question: "When you think about labels for your sexual orientation:",
        optionA: "Heterosexual or other non-lesbian labels feel right",
        optionB: "Lesbian or I'm exploring what feels right",
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
        description = "You're on a journey of lesbian self-discovery";
        explanation = `Your responses suggest you may be <strong>actively exploring your lesbian identity</strong>. This is a brave and important journey of self-discovery. You're asking important questions about your attractions to women and feminine-identifying people, which shows great self-awareness and courage. Remember that lesbian identity is valid and beautiful. Take your time, be patient with yourself, and know that whatever you discover about yourself is valid and worthy of celebration.`;
    } else if (score >= 40) {
        level = "Questioning & Reflecting";
        description = "You may be questioning your attractions to women";
        explanation = `Your responses indicate you might be <strong>questioning and reflecting</strong> on your attractions to women and feminine-identifying people. This is completely normal and healthy. You may be experiencing some uncertainty or curiosity about lesbian identity. This phase of questioning is an important part of self-discovery for many people. Consider giving yourself space to explore these feelings without pressure to label yourself immediately.`;
    } else if (score >= 20) {
        level = "Beginning to Wonder";
        description = "You might be starting to question your attractions";
        explanation = `Your responses suggest you may be <strong>beginning to wonder</strong> about your attractions to women. Perhaps you're noticing some feelings that are making you question what you previously thought about yourself. This is the beginning of what could be an important journey of self-discovery. Be gentle with yourself and know that questioning is normal and healthy.`;
    } else {
        level = "Confident in Current Identity";
        description = "You seem confident in your current understanding";
        explanation = `Your responses suggest you feel <strong>confident in your current understanding</strong> of your sexual orientation. You may have a clear sense of your attractions and identity. Remember that sexual orientation can be fluid for some people, and it's okay if your understanding of yourself evolves over time. What matters most is that you feel authentic to yourself.`;
    }
    
    // Update display elements
    document.getElementById('exploration-level').textContent = level;
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
    const text = `I just took a Lesbian Identity Exploration Quiz for self-reflection. 🏳️‍🌈 Remember: your identity is valid whatever it may be! Explore at ricepurity-test.app`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Lesbian Identity Exploration',
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