// Dominant or Submissive Quiz Questions
const questions = [
    {
        question: "In group projects, you typically:",
        optionA: "Take charge and organize everyone's tasks",
        optionB: "Wait for someone else to assign you a role",
        dominant: "A"
    },
    {
        question: "When making plans with friends, you:",
        optionA: "Usually suggest activities and take the lead",
        optionB: "Go along with whatever others want to do",
        dominant: "A"
    },
    {
        question: "In conversations, you tend to:",
        optionA: "Guide the direction and ask lots of questions",
        optionB: "Listen more and respond to what others bring up",
        dominant: "A"
    },
    {
        question: "When there's a disagreement, you:",
        optionA: "Stand firm in your position and argue your point",
        optionB: "Try to find compromise or defer to others",
        dominant: "A"
    },
    {
        question: "Your approach to decision-making is:",
        optionA: "Make decisions quickly and confidently",
        optionB: "Prefer when others make decisions for the group",
        dominant: "A"
    },
    {
        question: "In relationships, you prefer to:",
        optionA: "Take the initiative in planning dates and activities",
        optionB: "Let your partner take the lead on most things",
        dominant: "A"
    },
    {
        question: "When someone needs help, you:",
        optionA: "Jump in and take control of the situation",
        optionB: "Offer support but let them lead their own solution",
        dominant: "A"
    },
    {
        question: "Your communication style is:",
        optionA: "Direct and assertive about what you want",
        optionB: "Gentle and accommodating to others' needs",
        dominant: "A"
    },
    {
        question: "In new social situations, you:",
        optionA: "Introduce yourself and start conversations",
        optionB: "Wait for others to approach you first",
        dominant: "A"
    },
    {
        question: "When planning a vacation, you:",
        optionA: "Research and organize the entire itinerary",
        optionB: "Let others plan and go along with their ideas",
        dominant: "A"
    },
    {
        question: "Your approach to conflict resolution is:",
        optionA: "Address issues head-on and work toward solutions",
        optionB: "Avoid conflict or let others handle it",
        dominant: "A"
    },
    {
        question: "In intimate relationships, you prefer to:",
        optionA: "Take the lead and guide experiences",
        optionB: "Follow your partner's lead and preferences",
        dominant: "A"
    },
    {
        question: "When giving feedback, you:",
        optionA: "Speak directly and clearly about what needs to change",
        optionB: "Give gentle suggestions and positive reinforcement",
        dominant: "A"
    },
    {
        question: "Your natural instinct in leadership situations is to:",
        optionA: "Step up and take charge immediately",
        optionB: "Support whoever emerges as the leader",
        dominant: "A"
    },
    {
        question: "When someone asks for your opinion, you:",
        optionA: "Give your honest thoughts confidently",
        optionB: "Ask what they think first or give diplomatic answers",
        dominant: "A"
    },
    {
        question: "Your comfort level with being in control is:",
        optionA: "High - I feel natural when I'm in charge",
        optionB: "Low - I prefer when others take responsibility",
        dominant: "A"
    }
];

let currentQuestion = 0;
let dominantAnswers = 0;

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
    
    // Check if the chosen answer is the "dominant" one
    if (question.dominant === choice) {
        dominantAnswers++;
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
    // Calculate final score (percentage of dominant answers)
    const score = Math.round((dominantAnswers / questions.length) * 100);
    
    displayResults(score, dominantAnswers);
}

function displayResults(score, totalDominant) {
    // Hide quiz section and show results
    document.getElementById('quiz-section').classList.add('hidden');
    document.getElementById('intro-section').classList.add('hidden');
    document.getElementById('results-section').classList.remove('hidden');
    
    // Update score display
    document.getElementById('dominant-score').textContent = score + '%';
    document.getElementById('dominant-bar').style.width = score + '%';
    
    // Calculate dimensional scores
    const leadershipScore = Math.min(100, score + Math.floor(Math.random() * 20));
    const adaptabilityScore = Math.max(60, Math.min(100, 80 + Math.floor(Math.random() * 20)));
    const communicationScore = Math.max(50, Math.min(100, score + Math.floor(Math.random() * 30)));
    const confidenceScore = Math.max(40, Math.min(100, score + Math.floor(Math.random() * 25)));
    
    // Update dimensional scores
    document.getElementById('leadership-score').textContent = leadershipScore + '%';
    document.getElementById('leadership-bar').style.width = leadershipScore + '%';
    
    document.getElementById('adaptability-score').textContent = adaptabilityScore + '%';
    document.getElementById('adaptability-bar').style.width = adaptabilityScore + '%';
    
    document.getElementById('communication-score').textContent = communicationScore + '%';
    document.getElementById('communication-bar').style.width = communicationScore + '%';
    
    document.getElementById('confidence-score').textContent = confidenceScore + '%';
    document.getElementById('confidence-bar').style.width = confidenceScore + '%';
    
    // Update star ratings based on scores
    updateStarRating('leadership-stars', leadershipScore);
    updateStarRating('adaptability-stars', adaptabilityScore);
    updateStarRating('communication-stars', communicationScore);
    updateStarRating('confidence-stars', confidenceScore);
    
    // Determine dynamic type and description
    let type, description, explanation, displayType;
    
    if (score >= 80) {
        type = "Dominant";
        displayType = "Dom";
        description = "You naturally take charge and lead in relationships";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> shows you are <strong>Dominant</strong>! You naturally take charge and lead in relationships and social situations. You're confident in making decisions, comfortable with responsibility, and others often look to you for guidance. You communicate directly and aren't afraid to express your needs and desires clearly.`;
    } else if (score >= 60) {
        type = "Mostly Dominant";
        displayType = "Dom";
        description = "You often take the lead but can be flexible";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> indicates you're <strong>Mostly Dominant</strong>! You often take the lead in relationships and situations, but you're also flexible when needed. You're comfortable with leadership roles and making decisions, while still being able to adapt to your partner's needs and preferences.`;
    } else if (score >= 40) {
        type = "Balanced Switch";
        displayType = "Switch";
        description = "You adapt your style based on the situation";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> shows you're a <strong>Balanced Switch</strong>! You adapt your communication and relationship style based on the situation and your partner's needs. You're equally comfortable taking charge or following someone else's lead, making you a versatile and emotionally intelligent partner.`;
    } else if (score >= 20) {
        type = "Mostly Submissive";
        displayType = "Sub";
        description = "You prefer to follow but can lead when necessary";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> indicates you're <strong>Mostly Submissive</strong>! You generally prefer to follow your partner's lead and support their decisions, but you can step up when necessary. You value harmony and are excellent at providing emotional support and encouragement to others.`;
    } else {
        type = "Submissive";
        displayType = "Sub";
        description = "You prefer to follow and support others";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> shows you are <strong>Submissive</strong>! You prefer to follow and support others in relationships and social situations. You're excellent at providing emotional support, you value harmony, and you're comfortable letting others take the lead. Your caring and supportive nature makes you a wonderful partner.`;
    }
    
    // Update display elements
    document.getElementById('score-display').textContent = displayType;
    document.getElementById('dynamic-type').textContent = type;
    document.getElementById('score-description').textContent = description;
    document.getElementById('score-explanation').innerHTML = explanation + `<p>Remember, all relationship dynamics are healthy when based on mutual respect, consent, and communication. Your natural style is just one aspect of your personality!</p>`;
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
    const type = document.getElementById('dynamic-type').textContent;
    const text = `I just took the "Are You Dominant or Submissive Quiz" and I'm ${type}! ⚖️ What's your relationship dynamic? Take the quiz at ricepurity-test.app`;
    
    if (navigator.share) {
        navigator.share({
            title: 'My Dominant or Submissive Quiz Results',
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
    dominantAnswers = 0;
    
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