// Am I Pansexual Quiz Questions
const questions = [
    {
        question: "When you think about attraction, you:",
        optionA: "Are primarily attracted to specific genders",
        optionB: "Are attracted to people regardless of their gender identity",
        exploring: "B"
    },
    {
        question: "Your ideal partner would be someone who:",
        optionA: "Fits into traditional gender categories",
        optionB: "Could be any gender - personality and connection matter most",
        exploring: "B"
    },
    {
        question: "When you meet someone attractive, you:",
        optionA: "Notice their gender first",
        optionB: "Are drawn to their personality and energy regardless of gender",
        exploring: "B"
    },
    {
        question: "Your past crushes have been:",
        optionA: "Mostly on people of specific genders",
        optionB: "On people of various gender identities",
        exploring: "B"
    },
    {
        question: "When you think about gender in relationships, you feel:",
        optionA: "Gender is an important factor in attraction",
        optionB: "Gender is irrelevant - I'm attracted to the person",
        exploring: "B"
    },
    {
        question: "Your comfort with dating people of different gender identities is:",
        optionA: "I prefer traditional gender categories",
        optionB: "I'm open to dating anyone regardless of gender identity",
        exploring: "B"
    },
    {
        question: "When you think about transgender or non-binary people, you:",
        optionA: "Support them but don't feel romantic attraction",
        optionB: "Could potentially be attracted to them romantically",
        exploring: "B"
    },
    {
        question: "Your understanding of attraction is:",
        optionA: "Based on traditional gender roles and categories",
        optionB: "Fluid and not limited by gender boundaries",
        exploring: "B"
    },
    {
        question: "When you imagine your future relationships, you see:",
        optionA: "Yourself with people of specific genders",
        optionB: "Yourself with people of any gender identity",
        exploring: "B"
    },
    {
        question: "Your feelings about gender expression in partners are:",
        optionA: "I prefer traditional masculine or feminine expression",
        optionB: "I'm attracted to all forms of gender expression",
        exploring: "B"
    },
    {
        question: "When you think about physical attraction, you:",
        optionA: "Are attracted to specific gender presentations",
        optionB: "Can be attracted to people regardless of their gender presentation",
        exploring: "B"
    },
    {
        question: "Your emotional connections tend to be:",
        optionA: "Stronger with people of certain genders",
        optionB: "Equally strong regardless of someone's gender identity",
        exploring: "B"
    },
    {
        question: "When you hear the term 'pansexual', you:",
        optionA: "Understand it but don't relate to it personally",
        optionB: "Feel a connection or curiosity about it",
        exploring: "B"
    },
    {
        question: "Your attraction patterns throughout your life have been:",
        optionA: "Consistent toward specific genders",
        optionB: "Varied and inclusive of different gender identities",
        exploring: "B"
    },
    {
        question: "When choosing a partner, you prioritize:",
        optionA: "Finding someone who fits certain gender preferences",
        optionB: "Finding someone with the right personality, regardless of gender",
        exploring: "B"
    },
    {
        question: "Your feelings about gender fluidity in attraction are:",
        optionA: "I prefer more defined gender categories",
        optionB: "I'm comfortable with and attracted to gender fluidity",
        exploring: "B"
    },
    {
        question: "When you think about labels for your sexuality:",
        optionA: "Traditional labels feel right to me",
        optionB: "Pansexual resonates or I'm exploring inclusive labels",
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
        description = "You're on a journey of pansexual self-discovery";
        explanation = `Your responses suggest you may be <strong>actively exploring your pansexual identity</strong>. This is a brave and important journey of self-discovery. You're asking important questions about your attractions to people regardless of gender, which shows great self-awareness and courage. Pansexuality is about loving the person, not their gender. Take your time, be patient with yourself, and know that whatever you discover about yourself is valid and worthy of celebration.`;
    } else if (score >= 40) {
        level = "Questioning & Reflecting";
        description = "You may be questioning your attractions across all genders";
        explanation = `Your responses indicate you might be <strong>questioning and reflecting</strong> on your attractions to people of all gender identities. This is completely normal and healthy. You may be experiencing some uncertainty or curiosity about pansexual identity. This phase of questioning is an important part of self-discovery for many people. Consider giving yourself space to explore these feelings without pressure to label yourself immediately.`;
    } else if (score >= 20) {
        level = "Beginning to Wonder";
        description = "You might be starting to question gender boundaries in attraction";
        explanation = `Your responses suggest you may be <strong>beginning to wonder</strong> about your attractions beyond traditional gender boundaries. Perhaps you're noticing some feelings that are making you question what you previously thought about yourself. This is the beginning of what could be an important journey of self-discovery. Be gentle with yourself and know that questioning is normal and healthy.`;
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
    const text = `I just took a Pansexual Identity Exploration Quiz for self-reflection. 🌈 Remember: your identity is valid whatever it may be! Explore at ricepurity-test.app`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Pansexual Identity Exploration',
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