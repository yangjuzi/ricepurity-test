// Freaky Quiz Questions
const questions = [
    {
        question: "Your ideal weekend adventure would be:",
        optionA: "A quiet day at home or familiar activities",
        optionB: "Something wild and completely out of your comfort zone",
        freaky: "B"
    },
    {
        question: "When it comes to trying new experiences, you:",
        optionA: "Prefer to stick with what you know works",
        optionB: "Love experimenting and pushing boundaries",
        freaky: "B"
    },
    {
        question: "Your approach to fashion and style is:",
        optionA: "Classic and conventional",
        optionB: "Bold, unique, and attention-grabbing",
        freaky: "B"
    },
    {
        question: "At parties, you're most likely to:",
        optionA: "Have normal conversations and enjoy quietly",
        optionB: "Be the center of attention doing something outrageous",
        freaky: "B"
    },
    {
        question: "Your reaction to weird or unusual suggestions is:",
        optionA: "Skeptical and prefer normal activities",
        optionB: "Excited and ready to try something new",
        freaky: "B"
    },
    {
        question: "When people describe you, they're most likely to say:",
        optionA: "Reliable, normal, and down-to-earth",
        optionB: "Unpredictable, wild, and exciting",
        freaky: "B"
    },
    {
        question: "Your comfort level with being the center of attention is:",
        optionA: "I prefer to blend in and not stand out",
        optionB: "I love being noticed and making an impression",
        freaky: "B"
    },
    {
        question: "When it comes to expressing yourself, you:",
        optionA: "Keep things private and conventional",
        optionB: "Express yourself boldly and uniquely",
        freaky: "B"
    },
    {
        question: "Your approach to social norms is:",
        optionA: "Follow them because they exist for good reasons",
        optionB: "Question them and create your own rules",
        freaky: "B"
    },
    {
        question: "When someone dares you to do something unusual, you:",
        optionA: "Politely decline and suggest something normal",
        optionB: "Accept the challenge and go even further",
        freaky: "B"
    },
    {
        question: "Your ideal vacation would involve:",
        optionA: "Relaxing activities and familiar comforts",
        optionB: "Extreme adventures and unique experiences",
        freaky: "B"
    },
    {
        question: "How do you handle unexpected situations?",
        optionA: "Prefer routine and predictability",
        optionB: "Thrive on chaos and unpredictability",
        freaky: "B"
    },
    {
        question: "Your attitude toward taboo topics is:",
        optionA: "Avoid them and stick to safe conversations",
        optionB: "Dive right in and explore controversial subjects",
        freaky: "B"
    },
    {
        question: "When it comes to personal boundaries, you:",
        optionA: "Have clear, traditional boundaries",
        optionB: "Constantly push and redefine your limits",
        freaky: "B"
    },
    {
        question: "Your approach to shocking or surprising others is:",
        optionA: "I prefer not to shock people",
        optionB: "I love surprising people and keeping them guessing",
        freaky: "B"
    },
    {
        question: "How do you feel about being called 'weird' or 'different'?",
        optionA: "I'd prefer to be seen as normal",
        optionB: "I take it as a compliment",
        freaky: "B"
    },
    {
        question: "Your comfort with unconventional ideas is:",
        optionA: "I prefer traditional and proven approaches",
        optionB: "I love exploring unconventional and creative ideas",
        freaky: "B"
    },
    {
        question: "When it comes to living life, your philosophy is:",
        optionA: "Play it safe and follow the conventional path",
        optionB: "Life's too short to be normal - embrace the wild side",
        freaky: "B"
    }
];

let currentQuestion = 0;
let freakyAnswers = 0;

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
    
    // Check if the chosen answer is the "freaky" one
    if (question.freaky === choice) {
        freakyAnswers++;
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
    // Calculate final score (percentage of freaky answers)
    const score = Math.round((freakyAnswers / questions.length) * 100);
    
    displayResults(score, freakyAnswers);
}

function displayResults(score, totalFreaky) {
    // Hide quiz section and show results
    document.getElementById('quiz-section').classList.add('hidden');
    document.getElementById('intro-section').classList.add('hidden');
    document.getElementById('results-section').classList.remove('hidden');
    
    // Update score display
    document.getElementById('score-display').textContent = score + '%';
    document.getElementById('overall-score').textContent = score + '%';
    document.getElementById('overall-bar').style.width = score + '%';
    
    // Calculate dimensional scores
    const wildnessScore = Math.min(100, score + Math.floor(Math.random() * 15));
    const adventureScore = Math.max(30, Math.min(100, score + Math.floor(Math.random() * 20) + 5));
    const spontaneityScore = Math.min(100, score + Math.floor(Math.random() * 25) + 10);
    const confidenceScore = Math.max(40, Math.min(100, score + Math.floor(Math.random() * 20)));
    
    // Update dimensional scores
    document.getElementById('wildness-score').textContent = wildnessScore + '%';
    document.getElementById('wildness-bar').style.width = wildnessScore + '%';
    
    document.getElementById('adventure-score').textContent = adventureScore + '%';
    document.getElementById('adventure-bar').style.width = adventureScore + '%';
    
    document.getElementById('spontaneity-score').textContent = spontaneityScore + '%';
    document.getElementById('spontaneity-bar').style.width = spontaneityScore + '%';
    
    document.getElementById('confidence-score').textContent = confidenceScore + '%';
    document.getElementById('confidence-bar').style.width = confidenceScore + '%';
    
    // Update star ratings based on scores
    updateStarRating('wildness-stars', wildnessScore);
    updateStarRating('adventure-stars', adventureScore);
    updateStarRating('spontaneity-stars', spontaneityScore);
    updateStarRating('confidence-stars', confidenceScore);
    
    // Determine freaky level and description
    let level, description, explanation;
    
    if (score >= 80) {
        level = "Extremely Freaky";
        description = "You're wildly adventurous and love pushing boundaries";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> shows you're <strong>Extremely Freaky</strong>! You're wildly adventurous and love pushing boundaries in every aspect of life. You thrive on unconventional experiences and aren't afraid to shock people. Your bold personality and willingness to try anything makes you incredibly exciting to be around. You live life on your own terms and inspire others to break free from convention.`;
    } else if (score >= 60) {
        level = "Wild & Adventurous";
        description = "You love excitement and new experiences";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> indicates you're <strong>Wild & Adventurous</strong>! You love excitement, new experiences, and aren't afraid to step outside your comfort zone. You have a bold personality and enjoy living life to the fullest. People probably see you as the fun, spontaneous one who's always up for an adventure.`;
    } else if (score >= 40) {
        level = "Moderately Wild";
        description = "You enjoy some adventure but know your limits";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> shows you're <strong>Moderately Wild</strong>! You enjoy some adventure and excitement but know your limits. You're willing to try new things but prefer to stay within reasonable boundaries. You have a good balance between being adventurous and being responsible.`;
    } else if (score >= 20) {
        level = "Mildly Adventurous";
        description = "You occasionally step outside your comfort zone";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> indicates you're <strong>Mildly Adventurous</strong>! You occasionally step outside your comfort zone but generally prefer familiar experiences. You might try something new once in a while, but you're more comfortable with routine and predictability.`;
    } else {
        level = "Conventional";
        description = "You prefer traditional and familiar experiences";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> shows you're <strong>Conventional</strong>! You prefer traditional approaches and familiar experiences. You value stability, routine, and conventional ways of doing things. There's nothing wrong with this - you appreciate the beauty in classic, time-tested approaches to life.`;
    }
    
    // Update display elements
    document.getElementById('freaky-level').textContent = level;
    document.getElementById('score-description').textContent = description;
    document.getElementById('score-explanation').innerHTML = explanation + `<p>Remember, whether you're conventional or extremely freaky, both approaches to life have their own unique advantages. What matters most is being true to yourself and comfortable with your choices!</p>`;
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
    const level = document.getElementById('freaky-level').textContent;
    const text = `I just took the Freaky Quiz and I'm ${level}! 🎭 How adventurous are you? Take the quiz at ricepurity-test.app`;
    
    if (navigator.share) {
        navigator.share({
            title: 'My Freaky Quiz Results',
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
    freakyAnswers = 0;
    
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