// Mental Age Test Questions
const questions = [
    {
        question: "How do you prefer to spend your weekend?",
        optionA: "Going out to parties or social events",
        optionB: "Staying home with a good book or movie",
        mature: "B"
    },
    {
        question: "When making important decisions, you:",
        optionA: "Go with your gut feeling immediately",
        optionB: "Carefully weigh all pros and cons",
        mature: "B"
    },
    {
        question: "Your ideal vacation would be:",
        optionA: "An adventure-packed trip with lots of activities",
        optionB: "A peaceful retreat where you can relax and reflect",
        mature: "B"
    },
    {
        question: "When someone disagrees with you, you:",
        optionA: "Get defensive and argue your point",
        optionB: "Listen to their perspective and try to understand",
        mature: "B"
    },
    {
        question: "Your approach to money is:",
        optionA: "Spend it on things that make you happy now",
        optionB: "Save and invest for the future",
        mature: "B"
    },
    {
        question: "When you're stressed, you:",
        optionA: "Act impulsively or emotionally",
        optionB: "Take time to calm down and think clearly",
        mature: "B"
    },
    {
        question: "Your favorite type of entertainment is:",
        optionA: "Action movies, video games, or exciting shows",
        optionB: "Documentaries, news, or educational content",
        mature: "B"
    },
    {
        question: "In relationships, you value:",
        optionA: "Excitement, passion, and spontaneity",
        optionB: "Stability, trust, and deep connection",
        mature: "B"
    },
    {
        question: "When facing a problem, you:",
        optionA: "Hope it will resolve itself",
        optionB: "Actively work to find a solution",
        mature: "B"
    },
    {
        question: "Your ideal living situation is:",
        optionA: "Living with friends or roommates for fun",
        optionB: "Having your own peaceful, organized space",
        mature: "B"
    },
    {
        question: "When it comes to health, you:",
        optionA: "Don't think about it much, you feel fine",
        optionB: "Actively maintain healthy habits",
        mature: "B"
    },
    {
        question: "Your reaction to criticism is:",
        optionA: "Take it personally and feel hurt",
        optionB: "Consider if there's truth in it and learn",
        mature: "B"
    },
    {
        question: "You prefer conversations about:",
        optionA: "Gossip, celebrities, or current trends",
        optionB: "Life experiences, ideas, or meaningful topics",
        mature: "B"
    },
    {
        question: "When planning for the future, you:",
        optionA: "Live in the moment and don't plan much",
        optionB: "Set goals and work steadily toward them",
        mature: "B"
    },
    {
        question: "Your approach to learning new things is:",
        optionA: "Only learn what's required or immediately useful",
        optionB: "Continuously seek knowledge and personal growth",
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
    // Calculate mental age based on mature answers
    const maturityPercentage = (matureAnswers / questions.length) * 100;
    let mentalAge;
    
    if (maturityPercentage >= 80) {
        mentalAge = Math.floor(Math.random() * 15) + 50; // 50-65
    } else if (maturityPercentage >= 60) {
        mentalAge = Math.floor(Math.random() * 15) + 35; // 35-50
    } else if (maturityPercentage >= 40) {
        mentalAge = Math.floor(Math.random() * 10) + 25; // 25-35
    } else if (maturityPercentage >= 20) {
        mentalAge = Math.floor(Math.random() * 7) + 18; // 18-25
    } else {
        mentalAge = Math.floor(Math.random() * 5) + 13; // 13-18
    }
    
    displayResults(mentalAge, matureAnswers);
}

function displayResults(mentalAge, totalMature) {
    // Hide quiz section and show results
    document.getElementById('quiz-section').classList.add('hidden');
    document.getElementById('intro-section').classList.add('hidden');
    document.getElementById('results-section').classList.remove('hidden');
    
    // Update score display
    document.getElementById('score-display').textContent = mentalAge;
    document.getElementById('overall-score').textContent = mentalAge + ' years';
    
    // Calculate progress bar width (assuming max age of 70 for visualization)
    const progressWidth = Math.min((mentalAge / 70) * 100, 100);
    document.getElementById('overall-bar').style.width = progressWidth + '%';
    
    // Calculate dimensional scores
    const maturityScore = Math.min(100, (totalMature / questions.length) * 100 + Math.floor(Math.random() * 20));
    const wisdomScore = Math.max(30, Math.min(100, mentalAge * 1.5 + Math.floor(Math.random() * 20)));
    const playfulnessScore = Math.max(20, Math.min(100, 120 - mentalAge + Math.floor(Math.random() * 30)));
    const responsibilityScore = Math.min(100, (totalMature / questions.length) * 100 + Math.floor(Math.random() * 25));
    
    // Update dimensional scores
    document.getElementById('maturity-score').textContent = Math.round(maturityScore) + '%';
    document.getElementById('maturity-bar').style.width = maturityScore + '%';
    
    document.getElementById('wisdom-score').textContent = Math.round(wisdomScore) + '%';
    document.getElementById('wisdom-bar').style.width = wisdomScore + '%';
    
    document.getElementById('playfulness-score').textContent = Math.round(playfulnessScore) + '%';
    document.getElementById('playfulness-bar').style.width = playfulnessScore + '%';
    
    document.getElementById('responsibility-score').textContent = Math.round(responsibilityScore) + '%';
    document.getElementById('responsibility-bar').style.width = responsibilityScore + '%';
    
    // Update star ratings based on scores
    updateStarRating('maturity-stars', maturityScore);
    updateStarRating('wisdom-stars', wisdomScore);
    updateStarRating('playfulness-stars', playfulnessScore);
    updateStarRating('responsibility-stars', responsibilityScore);
    
    // Determine age category and description
    let category, description, explanation;
    
    if (mentalAge >= 50) {
        category = "Wise Elder";
        description = "You have the wisdom and maturity of someone in their golden years";
        explanation = `Your mental age of <span class="font-bold text-primary">${mentalAge} years</span> shows you have the <strong>wisdom of a Wise Elder</strong>! You approach life with deep thoughtfulness, patience, and accumulated wisdom. You value stability, meaningful relationships, and have learned to appreciate life's simple pleasures. Your mature perspective helps you navigate challenges with grace and understanding.`;
    } else if (mentalAge >= 35) {
        category = "Middle-aged";
        description = "You think with the balanced perspective of middle age";
        explanation = `Your mental age of <span class="font-bold text-primary">${mentalAge} years</span> indicates you have a <strong>middle-aged</strong> mindset! You've found a good balance between responsibility and enjoyment. You're practical in your approach to life while still maintaining some spontaneity. You value both security and personal growth, making decisions based on experience and wisdom.`;
    } else if (mentalAge >= 25) {
        category = "Young Adult";
        description = "You think like someone in their mid-twenties";
        explanation = `Your mental age of <span class="font-bold text-primary">${mentalAge} years</span> shows you think like a <strong>Young Adult</strong>! You have a good balance of maturity and playfulness. You're starting to take life more seriously but still maintain a youthful spirit. You're learning to balance responsibility with fun, and you approach challenges with both enthusiasm and growing wisdom.`;
    } else if (mentalAge >= 18) {
        category = "Late Teenager";
        description = "You have the mindset of someone just entering adulthood";
        explanation = `Your mental age of <span class="font-bold text-primary">${mentalAge} years</span> indicates you think like a <strong>Late Teenager</strong>! You're at an exciting stage where you're developing independence while still maintaining a youthful outlook. You're curious about the world and eager to experience new things. You're learning to balance freedom with responsibility.`;
    } else {
        category = "Teenager";
        description = "You have a youthful, energetic approach to life";
        explanation = `Your mental age of <span class="font-bold text-primary">${mentalAge} years</span> shows you have a <strong>Teenager's</strong> mindset! You approach life with enthusiasm, spontaneity, and optimism. You're full of energy and always ready for new adventures. You live in the moment and aren't weighed down by too many worries about the future. Your youthful spirit is refreshing and inspiring!`;
    }
    
    // Update display elements
    document.getElementById('age-category').textContent = category;
    document.getElementById('score-description').textContent = description;
    document.getElementById('score-explanation').innerHTML = explanation + `<p>Remember, mental age is just one aspect of your personality. Every age has its own unique strengths and perspectives that contribute to who you are!</p>`;
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
    const mentalAge = document.getElementById('score-display').textContent;
    const text = `I just took the Mental Age Test and my mental age is ${mentalAge} years! 🎂 What's your mental age? Take the test at ricepurity-test.app`;
    
    if (navigator.share) {
        navigator.share({
            title: 'My Mental Age Test Results',
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