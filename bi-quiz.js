// Am I Bi Quiz Questions
const questions = [
    {
        question: "When you think about romantic relationships, you:",
        optionA: "Are only attracted to one gender",
        optionB: "Feel attracted to people regardless of their gender",
        exploring: "B"
    },
    {
        question: "Your past crushes have been:",
        optionA: "Exclusively on people of one gender",
        optionB: "On people of different genders at different times",
        exploring: "B"
    },
    {
        question: "When you see attractive people, you:",
        optionA: "Only notice attractiveness in one gender",
        optionB: "Can appreciate beauty in people of any gender",
        exploring: "B"
    },
    {
        question: "Your ideal partner would be someone who:",
        optionA: "Is specifically one gender",
        optionB: "Could be any gender - personality matters most",
        exploring: "B"
    },
    {
        question: "When you imagine your future relationships, you see:",
        optionA: "Yourself only with people of one gender",
        optionB: "Yourself potentially with people of different genders",
        exploring: "B"
    },
    {
        question: "Your feelings about gender in attraction are:",
        optionA: "Gender is the most important factor",
        optionB: "Gender is less important than other qualities",
        exploring: "B"
    },
    {
        question: "When you think about physical attraction, you:",
        optionA: "Only feel it toward one gender",
        optionB: "Can feel it toward people of different genders",
        exploring: "B"
    },
    {
        question: "Your comfort with the idea of dating different genders is:",
        optionA: "I'm only comfortable dating one gender",
        optionB: "I'm open to dating people of different genders",
        exploring: "B"
    },
    {
        question: "When you think about emotional connection, you:",
        optionA: "Only connect romantically with one gender",
        optionB: "Can form deep connections regardless of gender",
        exploring: "B"
    },
    {
        question: "Your attraction patterns have been:",
        optionA: "Consistent toward one gender throughout my life",
        optionB: "Varied or have included multiple genders",
        exploring: "B"
    },
    {
        question: "When you see same-gender couples, you feel:",
        optionA: "Happy for them but don't relate personally",
        optionB: "A sense of connection or possibility",
        exploring: "B"
    },
    {
        question: "Your feelings about bisexuality are:",
        optionA: "It's valid for others but not something I relate to",
        optionB: "It resonates with me or I'm curious about it",
        exploring: "B"
    },
    {
        question: "When choosing a partner, you prioritize:",
        optionA: "Finding someone of the right gender first",
        optionB: "Finding someone with the right personality and connection",
        exploring: "B"
    },
    {
        question: "Your understanding of your own sexuality is:",
        optionA: "Clear and straightforward",
        optionB: "Complex and still evolving",
        exploring: "B"
    },
    {
        question: "When you think about labels for your sexuality:",
        optionA: "Traditional labels feel right to me",
        optionB: "I'm exploring or none feel quite right",
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
        description = "You're on a journey of bisexual self-discovery";
        explanation = `Your responses suggest you may be <strong>actively exploring your bisexual identity</strong>. This is a brave and important journey of self-discovery. You're asking important questions about your attractions to different genders, which shows great self-awareness and courage. Remember that bisexuality is a valid orientation that exists on a spectrum. Take your time, be patient with yourself, and know that whatever you discover about yourself is valid and worthy of celebration.`;
    } else if (score >= 40) {
        level = "Questioning & Reflecting";
        description = "You may be questioning your attractions to multiple genders";
        explanation = `Your responses indicate you might be <strong>questioning and reflecting</strong> on your attractions to different genders. This is completely normal and healthy. You may be experiencing some uncertainty or curiosity about bisexual identity. This phase of questioning is an important part of self-discovery for many people. Consider giving yourself space to explore these feelings without pressure to label yourself immediately.`;
    } else if (score >= 20) {
        level = "Beginning to Wonder";
        description = "You might be starting to question your attractions";
        explanation = `Your responses suggest you may be <strong>beginning to wonder</strong> about your attractions to different genders. Perhaps you're noticing some feelings that are making you question what you previously thought about yourself. This is the beginning of what could be an important journey of self-discovery. Be gentle with yourself and know that questioning is normal and healthy.`;
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
    const text = `I just took a Bisexual Identity Exploration Quiz for self-reflection. 💜💙 Remember: your identity is valid whatever it may be! Explore at ricepurity-test.app`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Bisexual Identity Exploration',
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