// How Old Do You Act Quiz Questions
const questions = [
    {
        question: "Your ideal Friday night is:",
        optionA: "Going out to parties or clubs",
        optionB: "Staying home with a good book or movie",
        mature: "B"
    },
    {
        question: "When you get excited about something, you:",
        optionA: "Jump around and tell everyone immediately",
        optionB: "Share it calmly with close friends",
        mature: "B"
    },
    {
        question: "Your approach to social media is:",
        optionA: "Post frequently about everything you do",
        optionB: "Post occasionally and thoughtfully",
        mature: "B"
    },
    {
        question: "When you disagree with someone, you:",
        optionA: "Get passionate and argue your point loudly",
        optionB: "Discuss it calmly and respectfully",
        mature: "B"
    },
    {
        question: "Your shopping habits are:",
        optionA: "Buy things impulsively when you want them",
        optionB: "Research and plan purchases carefully",
        mature: "B"
    },
    {
        question: "When you're bored, you:",
        optionA: "Look for immediate entertainment or distraction",
        optionB: "Use the time productively or for reflection",
        mature: "B"
    },
    {
        question: "Your reaction to new trends is:",
        optionA: "Jump on them immediately to stay current",
        optionB: "Observe first and adopt what genuinely appeals to you",
        mature: "B"
    },
    {
        question: "When planning events, you:",
        optionA: "Wing it and see what happens",
        optionB: "Plan ahead and have backup options",
        mature: "B"
    },
    {
        question: "Your approach to relationships is:",
        optionA: "Intense and all-consuming",
        optionB: "Balanced with other life priorities",
        mature: "B"
    },
    {
        question: "When you make mistakes, you:",
        optionA: "Get embarrassed and try to hide them",
        optionB: "Learn from them and move forward",
        mature: "B"
    },
    {
        question: "Your conversation topics usually include:",
        optionA: "Gossip, celebrities, and current drama",
        optionB: "Ideas, experiences, and meaningful subjects",
        mature: "B"
    },
    {
        question: "When you're upset, you:",
        optionA: "Express it dramatically and immediately",
        optionB: "Process it privately before discussing",
        mature: "B"
    },
    {
        question: "Your approach to money is:",
        optionA: "Spend it on fun things now",
        optionB: "Save and invest for the future",
        mature: "B"
    },
    {
        question: "When someone annoys you, you:",
        optionA: "React immediately and show your irritation",
        optionB: "Stay calm and address it diplomatically",
        mature: "B"
    },
    {
        question: "Your humor style is:",
        optionA: "Silly, random, and sometimes inappropriate",
        optionB: "Witty, thoughtful, and situationally appropriate",
        mature: "B"
    },
    {
        question: "When making life decisions, you:",
        optionA: "Follow your heart and impulses",
        optionB: "Carefully weigh pros and cons",
        mature: "B"
    },
    {
        question: "Your energy levels throughout the day are:",
        optionA: "High and bouncy, like you could run a marathon",
        optionB: "Steady and controlled, conserving energy wisely",
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
    // Calculate behavioral age based on mature answers
    const maturityPercentage = (matureAnswers / questions.length) * 100;
    let behavioralAge;
    
    if (maturityPercentage >= 80) {
        behavioralAge = Math.floor(Math.random() * 20) + 45; // 45-65
    } else if (maturityPercentage >= 60) {
        behavioralAge = Math.floor(Math.random() * 15) + 30; // 30-45
    } else if (maturityPercentage >= 40) {
        behavioralAge = Math.floor(Math.random() * 10) + 20; // 20-30
    } else if (maturityPercentage >= 20) {
        behavioralAge = Math.floor(Math.random() * 5) + 15; // 15-20
    } else {
        behavioralAge = Math.floor(Math.random() * 3) + 12; // 12-15
    }
    
    displayResults(behavioralAge, matureAnswers);
}

function displayResults(behavioralAge, totalMature) {
    // Hide quiz section and show results
    document.getElementById('quiz-section').classList.add('hidden');
    document.getElementById('intro-section').classList.add('hidden');
    document.getElementById('results-section').classList.remove('hidden');
    
    // Update score display
    document.getElementById('score-display').textContent = behavioralAge;
    document.getElementById('overall-score').textContent = behavioralAge + ' years';
    
    // Calculate progress bar width (assuming max age of 70 for visualization)
    const progressWidth = Math.min((behavioralAge / 70) * 100, 100);
    document.getElementById('overall-bar').style.width = progressWidth + '%';
    
    // Calculate dimensional scores
    const energyScore = Math.max(20, Math.min(100, 120 - behavioralAge + Math.floor(Math.random() * 30)));
    const responsibilityScore = Math.min(100, (totalMature / questions.length) * 100 + Math.floor(Math.random() * 25));
    const spontaneityScore = Math.max(30, Math.min(100, 130 - behavioralAge + Math.floor(Math.random() * 25)));
    const socialScore = Math.max(40, Math.min(100, 70 + Math.floor(Math.random() * 40)));
    
    // Update dimensional scores
    document.getElementById('energy-score').textContent = Math.round(energyScore) + '%';
    document.getElementById('energy-bar').style.width = energyScore + '%';
    
    document.getElementById('responsibility-score').textContent = Math.round(responsibilityScore) + '%';
    document.getElementById('responsibility-bar').style.width = responsibilityScore + '%';
    
    document.getElementById('spontaneity-score').textContent = Math.round(spontaneityScore) + '%';
    document.getElementById('spontaneity-bar').style.width = spontaneityScore + '%';
    
    document.getElementById('social-score').textContent = Math.round(socialScore) + '%';
    document.getElementById('social-bar').style.width = socialScore + '%';
    
    // Update star ratings based on scores
    updateStarRating('energy-stars', energyScore);
    updateStarRating('responsibility-stars', responsibilityScore);
    updateStarRating('spontaneity-stars', spontaneityScore);
    updateStarRating('social-stars', socialScore);
    
    // Determine age category and description
    let category, description, explanation;
    
    if (behavioralAge >= 45) {
        category = "Senior";
        description = "You act with the wisdom and composure of someone in their golden years";
        explanation = `Your behavioral age of <span class="font-bold text-primary">${behavioralAge} years</span> shows you act like a <strong>Senior</strong>! You approach life with wisdom, patience, and thoughtful consideration. You prefer meaningful conversations over small talk, value stability over excitement, and have learned to appreciate life's simple pleasures. Your mature behavior commands respect and makes others feel comfortable seeking your advice.`;
    } else if (behavioralAge >= 30) {
        category = "Middle-aged";
        description = "You act with the balanced perspective of middle age";
        explanation = `Your behavioral age of <span class="font-bold text-primary">${behavioralAge} years</span> indicates you act <strong>Middle-aged</strong>! You've found a good balance between responsibility and enjoyment. You're practical in your approach to life while still maintaining some spontaneity. You handle stress well, make thoughtful decisions, and have developed strong social skills through experience.`;
    } else if (behavioralAge >= 20) {
        category = "Young Adult";
        description = "You act like someone in their twenties";
        explanation = `Your behavioral age of <span class="font-bold text-primary">${behavioralAge} years</span> shows you act like a <strong>Young Adult</strong>! You have a good balance of youthful energy and growing responsibility. You're learning to navigate adult life while still maintaining enthusiasm and spontaneity. You're social, adaptable, and approach challenges with optimism and energy.`;
    } else if (behavioralAge >= 15) {
        category = "Late Teenager";
        description = "You act like someone just entering adulthood";
        explanation = `Your behavioral age of <span class="font-bold text-primary">${behavioralAge} years</span> indicates you act like a <strong>Late Teenager</strong>! You're at an exciting stage where you're developing independence while still maintaining a youthful outlook. You're energetic, social, and eager to experience new things. You're learning to balance freedom with responsibility.`;
    } else {
        category = "Teenager";
        description = "You act with youthful energy and spontaneity";
        explanation = `Your behavioral age of <span class="font-bold text-primary">${behavioralAge} years</span> shows you act like a <strong>Teenager</strong>! You approach life with incredible energy, enthusiasm, and spontaneity. You're social, fun-loving, and always ready for new adventures. You live in the moment and bring youthful excitement to everything you do. Your energetic spirit is contagious and inspiring!`;
    }
    
    // Update display elements
    document.getElementById('age-category').textContent = category;
    document.getElementById('score-description').textContent = description;
    document.getElementById('score-explanation').innerHTML = explanation + `<p>Remember, behavioral age is just one aspect of your personality. Every age has its own unique strengths and perspectives that contribute to who you are!</p>`;
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
    const behavioralAge = document.getElementById('score-display').textContent;
    const category = document.getElementById('age-category').textContent;
    const text = `I just took the "How Old Do You Act Quiz" and my behavioral age is ${behavioralAge} years - ${category}! 🎭 How old do you act? Take the test at ricepurity-test.app`;
    
    if (navigator.share) {
        navigator.share({
            title: 'My How Old Do You Act Quiz Results',
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