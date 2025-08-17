// Am I Naughty Quiz Questions
const questions = [
    {
        question: "When you see a 'Wet Paint' sign, you:",
        optionA: "Carefully avoid touching it and warn others",
        optionB: "Can't resist touching it to see if it's really wet",
        naughty: "B"
    },
    {
        question: "Your approach to rules is:",
        optionA: "Rules exist for good reasons and should be followed",
        optionB: "Rules are more like guidelines that can be bent",
        naughty: "B"
    },
    {
        question: "When you were a child, you were most likely to:",
        optionA: "Always do your homework before playing",
        optionB: "Sneak extra cookies from the jar",
        naughty: "B"
    },
    {
        question: "At a party, you're the person who:",
        optionA: "Helps clean up and makes sure everyone gets home safely",
        optionB: "Suggests the wildest games and activities",
        naughty: "B"
    },
    {
        question: "When you find money on the ground, you:",
        optionA: "Turn it in to the nearest authority or lost and found",
        optionB: "Look around, and if no one's watching, keep it",
        naughty: "B"
    },
    {
        question: "Your friends would describe you as:",
        optionA: "The responsible one who keeps everyone in line",
        optionB: "The troublemaker who leads everyone into mischief",
        naughty: "B"
    },
    {
        question: "When you're running late, you:",
        optionA: "Call ahead to apologize and explain",
        optionB: "Speed a little and hope you don't get caught",
        naughty: "B"
    },
    {
        question: "Your ideal prank is:",
        optionA: "I don't really do pranks, they might hurt someone",
        optionB: "Something harmless but definitely embarrassing",
        naughty: "B"
    },
    {
        question: "When someone tells you not to do something, you:",
        optionA: "Respect their wishes and avoid doing it",
        optionB: "Immediately want to do it even more",
        naughty: "B"
    },
    {
        question: "Your browser's incognito mode is used for:",
        optionA: "Online shopping for surprise gifts",
        optionB: "Things you'd rather not have in your history",
        naughty: "B"
    },
    {
        question: "When you're home alone, you:",
        optionA: "Do productive things like cleaning or reading",
        optionB: "Do all the things you can't do when others are around",
        naughty: "B"
    },
    {
        question: "Your reaction to gossip is:",
        optionA: "Change the subject or walk away",
        optionB: "Lean in closer and ask for more details",
        naughty: "B"
    },
    {
        question: "When you make a mistake, you:",
        optionA: "Immediately confess and try to make it right",
        optionB: "Hope no one notices and try to cover it up",
        naughty: "B"
    },
    {
        question: "Your approach to white lies is:",
        optionA: "Honesty is always the best policy",
        optionB: "Little white lies make life easier sometimes",
        naughty: "B"
    },
    {
        question: "When you see a 'Do Not Touch' sign at a museum, you:",
        optionA: "Keep your hands firmly to yourself",
        optionB: "Really, really want to touch it",
        naughty: "B"
    },
    {
        question: "Your guilty pleasure is:",
        optionA: "An extra piece of cake occasionally",
        optionB: "Something you'd be embarrassed to admit",
        naughty: "B"
    },
    {
        question: "When playing games, you:",
        optionA: "Always play fair and by the rules",
        optionB: "Might bend the rules if you can get away with it",
        naughty: "B"
    },
    {
        question: "Your idea of rebellion is:",
        optionA: "Staying up past your usual bedtime",
        optionB: "Doing something you know you shouldn't",
        naughty: "B"
    }
];

let currentQuestion = 0;
let naughtyAnswers = 0;

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
    
    // Check if the chosen answer is the "naughty" one
    if (question.naughty === choice) {
        naughtyAnswers++;
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
    // Calculate final score (percentage of naughty answers)
    const score = Math.round((naughtyAnswers / questions.length) * 100);
    
    displayResults(score, naughtyAnswers);
}

function displayResults(score, totalNaughty) {
    // Hide quiz section and show results
    document.getElementById('quiz-section').classList.add('hidden');
    document.getElementById('intro-section').classList.add('hidden');
    document.getElementById('results-section').classList.remove('hidden');
    
    // Update score display
    document.getElementById('score-display').textContent = score + '%';
    document.getElementById('overall-score').textContent = score + '%';
    document.getElementById('overall-bar').style.width = score + '%';
    
    // Calculate dimensional scores
    const goodScore = Math.max(0, 100 - score);
    const mischiefScore = Math.min(100, score + Math.floor(Math.random() * 10));
    const rebellionScore = Math.max(30, Math.min(100, score + Math.floor(Math.random() * 15) - 5));
    const ruleBreakingScore = Math.max(20, Math.min(100, score + Math.floor(Math.random() * 20) - 10));
    
    // Update dimensional scores
    document.getElementById('good-score').textContent = goodScore + '%';
    document.getElementById('good-bar').style.width = goodScore + '%';
    
    document.getElementById('mischief-score').textContent = mischiefScore + '%';
    document.getElementById('mischief-bar').style.width = mischiefScore + '%';
    
    document.getElementById('rebellion-score').textContent = rebellionScore + '%';
    document.getElementById('rebellion-bar').style.width = rebellionScore + '%';
    
    document.getElementById('rulebreaking-score').textContent = ruleBreakingScore + '%';
    document.getElementById('rulebreaking-bar').style.width = ruleBreakingScore + '%';
    
    // Update star ratings based on scores
    updateStarRating('good-stars', goodScore);
    updateStarRating('mischief-stars', mischiefScore);
    updateStarRating('rebellion-stars', rebellionScore);
    updateStarRating('rulebreaking-stars', ruleBreakingScore);
    
    // Determine naughty level and description
    let level, description, explanation;
    
    if (score >= 85) {
        level = "Naughty Devil";
        description = "You're a master of mischief and rule-breaking!";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> shows you're a <strong>Naughty Devil</strong>! You have a rebellious spirit and aren't afraid to break rules or cause a little chaos. You probably lead others into mischief and have a reputation for being the troublemaker. Your naughty nature makes life exciting and unpredictable.`;
    } else if (score >= 65) {
        level = "Quite Mischievous";
        description = "You love causing harmless trouble and bending rules";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> indicates you're <strong>Quite Mischievous</strong>! You have a strong naughty streak and enjoy pushing boundaries. You're not afraid to bend rules when it suits you and probably have a collection of funny stories about your mischievous adventures.`;
    } else if (score >= 45) {
        level = "Playfully Naughty";
        description = "You have a mischievous streak but know your limits";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> shows you're <strong>Playfully Naughty</strong>! You enjoy a bit of harmless mischief and aren't always a rule-follower, but you know when to stop. You have a good balance between being responsible and letting your playful, rebellious side show.`;
    } else if (score >= 25) {
        level = "Mostly Good";
        description = "You're generally well-behaved with occasional naughty moments";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> indicates you're <strong>Mostly Good</strong>! You generally follow rules and behave well, but you have your moments of minor rebellion. You might occasionally bend a rule or engage in harmless mischief, but it's not your usual behavior.`;
    } else {
        level = "Perfect Angel";
        description = "You're incredibly well-behaved and rule-abiding";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> shows you're a <strong>Perfect Angel</strong>! You're extremely well-behaved and almost never break rules or cause trouble. You prefer to do the right thing and probably feel uncomfortable when others are being naughty. Your good behavior is admirable and sets a great example for others.`;
    }
    
    // Update display elements
    document.getElementById('naughty-level').textContent = level;
    document.getElementById('score-description').textContent = description;
    document.getElementById('score-explanation').innerHTML = explanation + `<p>Remember, whether you're naughty or well-behaved, both personality types have their own charm! Your results simply reflect your approach to rules and mischief-making.</p>`;
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
    const text = `I just took the "Am I Naughty Quiz" and scored ${score}! 😈 How naughty are you? Take the quiz at ricepurity-test.app`;
    
    if (navigator.share) {
        navigator.share({
            title: 'My Am I Naughty Quiz Results',
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
    naughtyAnswers = 0;
    
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