// Flirt Quiz Questions
const questions = [
    {
        question: "When you see someone attractive, you:",
        optionA: "Feel too shy to approach them",
        optionB: "Make eye contact and smile confidently",
        flirty: "B"
    },
    {
        question: "Your approach to starting conversations is:",
        optionA: "Wait for them to talk to you first",
        optionB: "Use a clever line or interesting question",
        flirty: "B"
    },
    {
        question: "When someone compliments you, you:",
        optionA: "Blush and say thank you quietly",
        optionB: "Smile and give them a compliment back",
        flirty: "B"
    },
    {
        question: "Your body language when talking to someone you like is:",
        optionA: "Reserved and careful not to seem too interested",
        optionB: "Open, leaning in, and making good eye contact",
        flirty: "B"
    },
    {
        question: "When texting someone you're interested in, you:",
        optionA: "Keep messages short and straightforward",
        optionB: "Use playful emojis and teasing messages",
        flirty: "B"
    },
    {
        question: "Your sense of humor when flirting is:",
        optionA: "Gentle and safe, avoiding risky jokes",
        optionB: "Playful and teasing with clever banter",
        flirty: "B"
    },
    {
        question: "When someone is flirting with you, you:",
        optionA: "Sometimes don't notice or feel unsure how to respond",
        optionB: "Pick up on it immediately and flirt back",
        flirty: "B"
    },
    {
        question: "Your confidence level in romantic situations is:",
        optionA: "Low - I often second-guess myself",
        optionB: "High - I feel comfortable and natural",
        flirty: "B"
    },
    {
        question: "When you want to show interest, you:",
        optionA: "Hope they notice through subtle hints",
        optionB: "Make it clear through words and actions",
        flirty: "B"
    },
    {
        question: "Your approach to physical flirting (like light touches) is:",
        optionA: "Very cautious and rare",
        optionB: "Natural and appropriate when there's mutual interest",
        flirty: "B"
    },
    {
        question: "When someone seems interested in you, you:",
        optionA: "Feel nervous and might pull back",
        optionB: "Feel excited and engage more",
        flirty: "B"
    },
    {
        question: "Your ability to read romantic signals is:",
        optionA: "Poor - I often miss when someone is interested",
        optionB: "Good - I can usually tell when there's mutual attraction",
        flirty: "B"
    },
    {
        question: "When you like someone, your friends would say you:",
        optionA: "Become quiet and shy around them",
        optionB: "Turn on the charm and become more animated",
        flirty: "B"
    },
    {
        question: "Your comfort with playful teasing is:",
        optionA: "Low - I prefer serious conversations",
        optionB: "High - I love playful banter and teasing",
        flirty: "B"
    },
    {
        question: "When asking someone out, you:",
        optionA: "Feel very nervous and might avoid doing it",
        optionB: "Feel confident and make it fun and exciting",
        flirty: "B"
    },
    {
        question: "Your overall approach to romance is:",
        optionA: "Cautious and traditional",
        optionB: "Bold and playfully confident",
        flirty: "B"
    }
];

let currentQuestion = 0;
let flirtyAnswers = 0;

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
    
    // Check if the chosen answer is the "flirty" one
    if (question.flirty === choice) {
        flirtyAnswers++;
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
    // Calculate final score (percentage of flirty answers)
    const score = Math.round((flirtyAnswers / questions.length) * 100);
    
    displayResults(score, flirtyAnswers);
}

function displayResults(score, totalFlirty) {
    // Hide quiz section and show results
    document.getElementById('quiz-section').classList.add('hidden');
    document.getElementById('intro-section').classList.add('hidden');
    document.getElementById('results-section').classList.remove('hidden');
    
    // Update score display
    document.getElementById('score-display').textContent = score + '%';
    document.getElementById('overall-score').textContent = score + '%';
    document.getElementById('overall-bar').style.width = score + '%';
    
    // Calculate dimensional scores
    const charmScore = Math.min(100, score + Math.floor(Math.random() * 15));
    const confidenceScore = Math.max(30, Math.min(100, score + Math.floor(Math.random() * 20) - 5));
    const playfulnessScore = Math.min(100, score + Math.floor(Math.random() * 20) + 5);
    const socialScore = Math.max(40, Math.min(100, score + Math.floor(Math.random() * 25)));
    
    // Update dimensional scores
    document.getElementById('charm-score').textContent = charmScore + '%';
    document.getElementById('charm-bar').style.width = charmScore + '%';
    
    document.getElementById('confidence-score').textContent = confidenceScore + '%';
    document.getElementById('confidence-bar').style.width = confidenceScore + '%';
    
    document.getElementById('playfulness-score').textContent = playfulnessScore + '%';
    document.getElementById('playfulness-bar').style.width = playfulnessScore + '%';
    
    document.getElementById('social-score').textContent = socialScore + '%';
    document.getElementById('social-bar').style.width = socialScore + '%';
    
    // Update star ratings based on scores
    updateStarRating('charm-stars', charmScore);
    updateStarRating('confidence-stars', confidenceScore);
    updateStarRating('playfulness-stars', playfulnessScore);
    updateStarRating('social-stars', socialScore);
    
    // Determine flirt level and description
    let level, description, explanation;
    
    if (score >= 85) {
        level = "Irresistible Charmer";
        description = "You're a master of charm and attraction";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> shows you're an <strong>Irresistible Charmer</strong>! You have exceptional flirting skills and natural magnetism that draws people to you. You're confident, playful, and know exactly how to make someone feel special. Your charm is effortless and people probably fall for you easily. You're the type of person who can make anyone feel like the most important person in the room.`;
    } else if (score >= 70) {
        level = "Charming Flirt";
        description = "You have natural charm and confidence";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> indicates you're a <strong>Charming Flirt</strong>! You have natural charm and confidence that makes you attractive to others. You know how to make people feel special and create romantic connections. You're comfortable with playful banter and can read social cues well. People probably enjoy your company and find you engaging.`;
    } else if (score >= 50) {
        level = "Naturally Charming";
        description = "You have good social skills with growing confidence";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> shows you're <strong>Naturally Charming</strong>! You have good social skills and growing confidence in romantic situations. You can flirt when you feel comfortable, but you might still feel nervous sometimes. You have natural charm that comes out when you're relaxed and being yourself.`;
    } else if (score >= 30) {
        level = "Sweet & Modest";
        description = "You have a gentle, understated charm";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> indicates you're <strong>Sweet & Modest</strong>! You have a gentle, understated charm that's very appealing. You might not be the most obvious flirt, but your sincerity and sweetness draw people to you. Your approach is more subtle and genuine, which many people find refreshing and attractive.`;
    } else {
        level = "Shy & Sweet";
        description = "You have a quiet charm that's endearing";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> shows you're <strong>Shy & Sweet</strong>! You have a quiet charm that's very endearing. You might feel nervous in romantic situations, but your genuine nature and sweetness are attractive qualities. Your shy smile and authentic personality draw the right people to you. Sometimes the most genuine connections come from being yourself rather than trying to be overly charming.`;
    }
    
    // Update display elements
    document.getElementById('flirt-level').textContent = level;
    document.getElementById('score-description').textContent = description;
    document.getElementById('score-explanation').innerHTML = explanation + `<p>Remember, the best flirting comes from being authentic and confident in who you are. Whether you're naturally charming or more reserved, your genuine personality is your greatest asset!</p>`;
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
    const level = document.getElementById('flirt-level').textContent;
    const score = document.getElementById('score-display').textContent;
    const text = `I just took the Flirt Quiz and I'm a ${level} with ${score}! 😉 How good are you at flirting? Take the quiz at ricepurity-test.app`;
    
    if (navigator.share) {
        navigator.share({
            title: 'My Flirt Quiz Results',
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
    flirtyAnswers = 0;
    
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