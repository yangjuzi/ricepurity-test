// Love Language Quiz Questions
const questions = [
    {
        question: "What makes you feel most loved by your partner?",
        optionA: "When they tell you how much they appreciate you",
        optionB: "When they spend uninterrupted time with you",
        language: "words"
    },
    {
        question: "You feel most appreciated when your partner:",
        optionA: "Helps you with tasks without being asked",
        optionB: "Gives you a meaningful hug or kiss",
        language: "service"
    },
    {
        question: "Your ideal way to show love is:",
        optionA: "Giving thoughtful gifts that show you care",
        optionB: "Saying 'I love you' and giving compliments",
        language: "gifts"
    },
    {
        question: "When you're stressed, you most want your partner to:",
        optionA: "Sit with you and give you their full attention",
        optionB: "Hold you close and offer physical comfort",
        language: "time"
    },
    {
        question: "You feel most connected to your partner when:",
        optionA: "They do something helpful for you",
        optionB: "They surprise you with a small gift",
        language: "service"
    },
    {
        question: "The most meaningful gesture from a partner would be:",
        optionA: "A handwritten note expressing their feelings",
        optionB: "Planning a special day just for the two of you",
        language: "words"
    },
    {
        question: "You feel most loved when your partner:",
        optionA: "Holds your hand or touches you affectionately",
        optionB: "Takes care of something you've been worried about",
        language: "touch"
    },
    {
        question: "Your favorite type of gift is:",
        optionA: "Something that shows they really know you",
        optionB: "A heartfelt card with personal words",
        language: "gifts"
    },
    {
        question: "When your partner is busy, you feel most loved if they:",
        optionA: "Still make time to really talk and connect with you",
        optionB: "Send you sweet messages throughout the day",
        language: "time"
    },
    {
        question: "Physical affection is important to you because:",
        optionA: "It makes you feel secure and connected",
        optionB: "It's nice, but words mean more to you",
        language: "touch"
    },
    {
        question: "You show love by:",
        optionA: "Doing things to make your partner's life easier",
        optionB: "Giving them your undivided attention",
        language: "service"
    },
    {
        question: "The best surprise from your partner would be:",
        optionA: "A thoughtful gift that reminds them of you",
        optionB: "A genuine compliment about something you did",
        language: "gifts"
    },
    {
        question: "You feel most appreciated when your partner:",
        optionA: "Acknowledges your efforts with kind words",
        optionB: "Spends quality one-on-one time with you",
        language: "words"
    },
    {
        question: "When you're feeling down, you most want:",
        optionA: "Physical comfort like hugs or cuddling",
        optionB: "Your partner to help solve your problems",
        language: "touch"
    },
    {
        question: "Your ideal date would involve:",
        optionA: "Focused conversation and connection",
        optionB: "Your partner surprising you with something special",
        language: "time"
    }
];

let currentQuestion = 0;
let loveLanguageScores = {
    words: 0,
    time: 0,
    touch: 0,
    service: 0,
    gifts: 0
};

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
    
    // Determine which love language this question represents
    let language;
    if (choice === 'A') {
        // Option A maps to different languages based on question
        if (currentQuestion === 0) language = 'words';
        else if (currentQuestion === 1) language = 'service';
        else if (currentQuestion === 2) language = 'gifts';
        else if (currentQuestion === 3) language = 'time';
        else if (currentQuestion === 4) language = 'service';
        else if (currentQuestion === 5) language = 'words';
        else if (currentQuestion === 6) language = 'touch';
        else if (currentQuestion === 7) language = 'gifts';
        else if (currentQuestion === 8) language = 'time';
        else if (currentQuestion === 9) language = 'touch';
        else if (currentQuestion === 10) language = 'service';
        else if (currentQuestion === 11) language = 'gifts';
        else if (currentQuestion === 12) language = 'words';
        else if (currentQuestion === 13) language = 'touch';
        else if (currentQuestion === 14) language = 'time';
    } else {
        // Option B maps to different languages
        if (currentQuestion === 0) language = 'time';
        else if (currentQuestion === 1) language = 'touch';
        else if (currentQuestion === 2) language = 'words';
        else if (currentQuestion === 3) language = 'touch';
        else if (currentQuestion === 4) language = 'gifts';
        else if (currentQuestion === 5) language = 'time';
        else if (currentQuestion === 6) language = 'service';
        else if (currentQuestion === 7) language = 'words';
        else if (currentQuestion === 8) language = 'words';
        else if (currentQuestion === 9) language = 'words';
        else if (currentQuestion === 10) language = 'time';
        else if (currentQuestion === 11) language = 'words';
        else if (currentQuestion === 12) language = 'time';
        else if (currentQuestion === 13) language = 'service';
        else if (currentQuestion === 14) language = 'gifts';
    }
    
    loveLanguageScores[language]++;
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
    // Find the highest scoring love language
    const primaryLanguage = Object.keys(loveLanguageScores).reduce((a, b) => 
        loveLanguageScores[a] > loveLanguageScores[b] ? a : b
    );
    
    displayResults(primaryLanguage);
}

function displayResults(primaryLanguage) {
    // Hide quiz section and show results
    document.getElementById('quiz-section').classList.add('hidden');
    document.getElementById('intro-section').classList.add('hidden');
    document.getElementById('results-section').classList.remove('hidden');
    
    // Calculate percentages for each love language
    const totalQuestions = questions.length;
    const wordsPercent = Math.round((loveLanguageScores.words / totalQuestions) * 100 * 5); // Multiply by 5 since each language appears 3 times
    const timePercent = Math.round((loveLanguageScores.time / totalQuestions) * 100 * 5);
    const touchPercent = Math.round((loveLanguageScores.touch / totalQuestions) * 100 * 5);
    const servicePercent = Math.round((loveLanguageScores.service / totalQuestions) * 100 * 5);
    const giftsPercent = Math.round((loveLanguageScores.gifts / totalQuestions) * 100 * 5);
    
    // Update all love language scores
    document.getElementById('words-score').textContent = Math.min(wordsPercent, 100) + '%';
    document.getElementById('words-bar').style.width = Math.min(wordsPercent, 100) + '%';
    
    document.getElementById('time-score').textContent = Math.min(timePercent, 100) + '%';
    document.getElementById('time-bar').style.width = Math.min(timePercent, 100) + '%';
    
    document.getElementById('touch-score').textContent = Math.min(touchPercent, 100) + '%';
    document.getElementById('touch-bar').style.width = Math.min(touchPercent, 100) + '%';
    
    document.getElementById('service-score').textContent = Math.min(servicePercent, 100) + '%';
    document.getElementById('service-bar').style.width = Math.min(servicePercent, 100) + '%';
    
    document.getElementById('gifts-score').textContent = Math.min(giftsPercent, 100) + '%';
    document.getElementById('gifts-bar').style.width = Math.min(giftsPercent, 100) + '%';
    
    // Get love language info
    const languageInfo = getLoveLanguageInfo(primaryLanguage);
    
    // Update display elements
    document.getElementById('love-icon').className = `fas ${languageInfo.icon} text-4xl`;
    document.getElementById('love-language').textContent = languageInfo.name;
    document.getElementById('score-description').textContent = languageInfo.description;
    document.getElementById('score-explanation').innerHTML = languageInfo.explanation;
    
    // Update star ratings (using primary language score)
    const primaryScore = Math.min(loveLanguageScores[primaryLanguage] * 33, 100); // Convert to percentage
    updateStarRating('expression-stars', 100);
    updateStarRating('understanding-stars', 80);
    updateStarRating('empathy-stars', 75);
    updateStarRating('connection-stars', 90);
}

function getLoveLanguageInfo(language) {
    const languages = {
        'words': {
            name: 'Words of Affirmation',
            icon: 'fa-comments',
            description: 'You express love through encouraging words',
            explanation: `Your primary love language is <strong>Words of Affirmation</strong>! You express and receive love best through encouraging words, compliments, and verbal appreciation. You value communication and feel most loved when your partner expresses their feelings verbally. Simple phrases like "I love you," "I'm proud of you," or "You look beautiful" mean the world to you.`
        },
        'time': {
            name: 'Quality Time',
            icon: 'fa-clock',
            description: 'You express love through focused attention',
            explanation: `Your primary love language is <strong>Quality Time</strong>! You express and receive love best through focused, uninterrupted time together. You value your partner's undivided attention and feel most loved when they prioritize spending meaningful time with you. Whether it's deep conversations or shared activities, presence is your love language.`
        },
        'touch': {
            name: 'Physical Touch',
            icon: 'fa-hand-holding-heart',
            description: 'You express love through physical connection',
            explanation: `Your primary love language is <strong>Physical Touch</strong>! You express and receive love best through appropriate physical connection like hugs, kisses, holding hands, and cuddling. Physical affection makes you feel secure and connected to your partner. Simple touches throughout the day help you feel loved and appreciated.`
        },
        'service': {
            name: 'Acts of Service',
            icon: 'fa-hands-helping',
            description: 'You express love through helpful actions',
            explanation: `Your primary love language is <strong>Acts of Service</strong>! You express and receive love best through helpful actions and thoughtful gestures. When your partner does things to make your life easier or takes care of tasks for you, it speaks volumes about their love. Actions truly speak louder than words for you.`
        },
        'gifts': {
            name: 'Receiving Gifts',
            icon: 'fa-gift',
            description: 'You express love through thoughtful presents',
            explanation: `Your primary love language is <strong>Receiving Gifts</strong>! You express and receive love best through thoughtful presents and symbols of love. It's not about the cost - it's about the thought and effort behind the gift. When someone takes time to pick out something special for you, it shows they were thinking of you.`
        }
    };
    
    return languages[language] || languages['words']; // Default fallback
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
    const loveLanguage = document.getElementById('love-language').textContent;
    const text = `I just took the Love Language Quiz and my love language is ${loveLanguage}! 💕 What's your love language? Take the quiz at ricepurity-test.app`;
    
    if (navigator.share) {
        navigator.share({
            title: 'My Love Language Quiz Results',
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
    loveLanguageScores = {
        words: 0,
        time: 0,
        touch: 0,
        service: 0,
        gifts: 0
    };
    
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