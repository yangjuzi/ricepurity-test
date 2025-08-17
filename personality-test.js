// Personality Test Questions (MBTI-based)
const questions = [
    {
        question: "At a party, you're more likely to:",
        optionA: "Interact with many people, including strangers",
        optionB: "Interact with a few people you know well",
        dimension: "E" // Extraversion
    },
    {
        question: "You prefer to focus on:",
        optionA: "The big picture and future possibilities",
        optionB: "Details and current realities",
        dimension: "N" // Intuition
    },
    {
        question: "When making decisions, you tend to:",
        optionA: "Consider people's feelings and values",
        optionB: "Use logic and objective analysis",
        dimension: "F" // Feeling
    },
    {
        question: "You prefer to:",
        optionA: "Keep your options open and be flexible",
        optionB: "Have things decided and organized",
        dimension: "P" // Perceiving
    },
    {
        question: "You get energized by:",
        optionA: "Being around other people",
        optionB: "Spending time alone",
        dimension: "E" // Extraversion
    },
    {
        question: "You're more interested in:",
        optionA: "What could be - possibilities and potential",
        optionB: "What is - facts and reality",
        dimension: "N" // Intuition
    },
    {
        question: "You're more convinced by:",
        optionA: "Personal stories and emotional appeals",
        optionB: "Statistical evidence and logical arguments",
        dimension: "F" // Feeling
    },
    {
        question: "You prefer to:",
        optionA: "Go with the flow and adapt as needed",
        optionB: "Stick to a schedule and plan ahead",
        dimension: "P" // Perceiving
    },
    {
        question: "In group settings, you:",
        optionA: "Speak up and share your thoughts readily",
        optionB: "Listen more and speak when you have something important to say",
        dimension: "E" // Extraversion
    },
    {
        question: "You're more drawn to:",
        optionA: "Theoretical concepts and abstract ideas",
        optionB: "Practical applications and concrete examples",
        dimension: "N" // Intuition
    },
    {
        question: "When someone is upset, you're more likely to:",
        optionA: "Offer emotional support and empathy",
        optionB: "Try to solve their problem logically",
        dimension: "F" // Feeling
    },
    {
        question: "You feel more comfortable when:",
        optionA: "Plans can change and you can be spontaneous",
        optionB: "You know what to expect and have a clear plan",
        dimension: "P" // Perceiving
    },
    {
        question: "You prefer to work:",
        optionA: "In a team with lots of interaction",
        optionB: "Independently with minimal interruptions",
        dimension: "E" // Extraversion
    },
    {
        question: "You're more interested in:",
        optionA: "Innovation and new ways of doing things",
        optionB: "Proven methods and established procedures",
        dimension: "N" // Intuition
    },
    {
        question: "You value:",
        optionA: "Harmony and cooperation",
        optionB: "Truth and competence",
        dimension: "F" // Feeling
    },
    {
        question: "You prefer:",
        optionA: "To keep your options open until the last minute",
        optionB: "To make decisions quickly and move forward",
        dimension: "P" // Perceiving
    }
];

let currentQuestion = 0;
let scores = { E: 0, N: 0, F: 0, P: 0 };

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
    
    // Score based on the dimension and choice
    if (choice === 'A') {
        scores[question.dimension]++;
    }
    // Choice B doesn't add to the score (represents the opposite preference)
    
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
    // Calculate personality type
    const personalityType = calculatePersonalityType();
    displayResults(personalityType);
}

function calculatePersonalityType() {
    // Each dimension has 4 questions, so scores range from 0-4
    const E_score = scores.E;
    const N_score = scores.N;
    const F_score = scores.F;
    const P_score = scores.P;
    
    // Determine type based on majority (>2 means preference for that dimension)
    const type = 
        (E_score > 2 ? 'E' : 'I') +
        (N_score > 2 ? 'N' : 'S') +
        (F_score > 2 ? 'F' : 'T') +
        (P_score > 2 ? 'P' : 'J');
    
    return {
        type: type,
        scores: {
            E: E_score,
            N: N_score,
            F: F_score,
            P: P_score
        }
    };
}

function displayResults(result) {
    // Hide quiz section and show results
    document.getElementById('quiz-section').classList.add('hidden');
    document.getElementById('intro-section').classList.add('hidden');
    document.getElementById('results-section').classList.remove('hidden');
    
    // Get personality info
    const personalityInfo = getPersonalityInfo(result.type);
    
    // Update score display
    document.getElementById('score-display').textContent = result.type;
    document.getElementById('personality-type').textContent = personalityInfo.name;
    document.getElementById('score-description').textContent = personalityInfo.description;
    
    // Calculate percentages for each dimension
    const extraversionPercent = Math.round((result.scores.E / 4) * 100);
    const intuitionPercent = Math.round((result.scores.N / 4) * 100);
    const feelingPercent = Math.round((result.scores.F / 4) * 100);
    const perceivingPercent = Math.round((result.scores.P / 4) * 100);
    
    // Update dimensional scores
    document.getElementById('extraversion-score').textContent = extraversionPercent >= 50 ? `${extraversionPercent}% E` : `${100-extraversionPercent}% I`;
    document.getElementById('extraversion-bar').style.width = extraversionPercent + '%';
    
    document.getElementById('intuition-score').textContent = intuitionPercent >= 50 ? `${intuitionPercent}% N` : `${100-intuitionPercent}% S`;
    document.getElementById('intuition-bar').style.width = intuitionPercent + '%';
    
    document.getElementById('feeling-score').textContent = feelingPercent >= 50 ? `${feelingPercent}% F` : `${100-feelingPercent}% T`;
    document.getElementById('feeling-bar').style.width = feelingPercent + '%';
    
    document.getElementById('perceiving-score').textContent = perceivingPercent >= 50 ? `${perceivingPercent}% P` : `${100-perceivingPercent}% J`;
    document.getElementById('perceiving-bar').style.width = perceivingPercent + '%';
    
    // Update star ratings
    updateStarRating('extraversion-stars', extraversionPercent);
    updateStarRating('intuition-stars', intuitionPercent);
    updateStarRating('feeling-stars', feelingPercent);
    updateStarRating('perceiving-stars', perceivingPercent);
    
    // Update explanation
    document.getElementById('score-explanation').innerHTML = personalityInfo.explanation;
}

function getPersonalityInfo(type) {
    const personalities = {
        'ENFP': {
            name: 'The Campaigner',
            description: 'Enthusiastic, creative, and sociable',
            explanation: `Your personality type is <span class="font-bold text-primary">ENFP - The Campaigner</span>! You are enthusiastic, creative, and sociable. You love exploring new possibilities and inspiring others with your vision and energy. ENFPs are known for their warmth, creativity, and ability to see potential in people and situations.`
        },
        'ENFJ': {
            name: 'The Protagonist',
            description: 'Charismatic and inspiring leaders',
            explanation: `Your personality type is <span class="font-bold text-primary">ENFJ - The Protagonist</span>! You are charismatic, inspiring, and natural leaders. You're passionate about helping others reach their potential and creating positive change in the world.`
        },
        'ENTP': {
            name: 'The Debater',
            description: 'Smart and curious thinkers',
            explanation: `Your personality type is <span class="font-bold text-primary">ENTP - The Debater</span>! You are smart, curious, and love intellectual challenges. You enjoy exploring ideas and possibilities, often playing devil's advocate to test concepts.`
        },
        'ENTJ': {
            name: 'The Commander',
            description: 'Bold, imaginative, and strong-willed',
            explanation: `Your personality type is <span class="font-bold text-primary">ENTJ - The Commander</span>! You are bold, imaginative, and strong-willed leaders. You're natural at organizing people and resources to achieve your vision.`
        },
        'INFP': {
            name: 'The Mediator',
            description: 'Poetic, kind, and altruistic',
            explanation: `Your personality type is <span class="font-bold text-primary">INFP - The Mediator</span>! You are poetic, kind, and altruistic. You're guided by your values and always looking for ways to help humanity and find harmony.`
        },
        'INFJ': {
            name: 'The Advocate',
            description: 'Creative and insightful',
            explanation: `Your personality type is <span class="font-bold text-primary">INFJ - The Advocate</span>! You are creative, insightful, and principled. You're motivated by a desire to help others and make the world a better place.`
        },
        'INTP': {
            name: 'The Thinker',
            description: 'Innovative inventors with thirst for knowledge',
            explanation: `Your personality type is <span class="font-bold text-primary">INTP - The Thinker</span>! You are innovative, inventive, and have an unquenchable thirst for knowledge. You love exploring theoretical concepts and understanding how things work.`
        },
        'INTJ': {
            name: 'The Architect',
            description: 'Imaginative and strategic thinkers',
            explanation: `Your personality type is <span class="font-bold text-primary">INTJ - The Architect</span>! You are imaginative, strategic, and highly independent. You have a clear vision of the future and work systematically to achieve your goals.`
        },
        'ESFP': {
            name: 'The Entertainer',
            description: 'Spontaneous, energetic, and enthusiastic',
            explanation: `Your personality type is <span class="font-bold text-primary">ESFP - The Entertainer</span>! You are spontaneous, energetic, and enthusiastic. You love being around people and bringing joy and excitement to every situation.`
        },
        'ESFJ': {
            name: 'The Consul',
            description: 'Extraordinarily caring and social',
            explanation: `Your personality type is <span class="font-bold text-primary">ESFJ - The Consul</span>! You are extraordinarily caring, social, and popular. You're always eager to help others and create harmony in your environment.`
        },
        'ESTP': {
            name: 'The Entrepreneur',
            description: 'Smart, energetic, and perceptive',
            explanation: `Your personality type is <span class="font-bold text-primary">ESTP - The Entrepreneur</span>! You are smart, energetic, and perceptive. You love living in the moment and taking action to solve problems as they arise.`
        },
        'ESTJ': {
            name: 'The Executive',
            description: 'Excellent administrators and managers',
            explanation: `Your personality type is <span class="font-bold text-primary">ESTJ - The Executive</span>! You are excellent at managing people and projects. You're organized, practical, and focused on getting results efficiently.`
        },
        'ISFP': {
            name: 'The Adventurer',
            description: 'Flexible and charming artists',
            explanation: `Your personality type is <span class="font-bold text-primary">ISFP - The Adventurer</span>! You are flexible, charming, and artistic. You're always ready to explore new possibilities and live life to the fullest.`
        },
        'ISFJ': {
            name: 'The Protector',
            description: 'Very dedicated and warm protectors',
            explanation: `Your personality type is <span class="font-bold text-primary">ISFJ - The Protector</span>! You are very dedicated, warm, and protective of the people you care about. You're reliable and always willing to help others.`
        },
        'ISTP': {
            name: 'The Virtuoso',
            description: 'Bold and practical experimenters',
            explanation: `Your personality type is <span class="font-bold text-primary">ISTP - The Virtuoso</span>! You are bold, practical, and love experimenting with tools and techniques. You're great at understanding how things work and solving practical problems.`
        },
        'ISTJ': {
            name: 'The Logistician',
            description: 'Practical and fact-minded',
            explanation: `Your personality type is <span class="font-bold text-primary">ISTJ - The Logistician</span>! You are practical, fact-minded, and reliable. You value tradition, loyalty, and hard work, and you always follow through on your commitments.`
        }
    };
    
    return personalities[type] || personalities['ENFP']; // Default fallback
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
    const personalityType = document.getElementById('score-display').textContent;
    const personalityName = document.getElementById('personality-type').textContent;
    const text = `I just took the Personality Test and I'm ${personalityType} - ${personalityName}! 🧠 What's your personality type? Take the test at ricepurity-test.app`;
    
    if (navigator.share) {
        navigator.share({
            title: 'My Personality Test Results',
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
    scores = { E: 0, N: 0, F: 0, P: 0 };
    
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