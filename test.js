// Rice Purity Test Questions
const questions = [
    "Have you ever been on a date?",
    "Have you ever been in a relationship?",
    "Have you ever kissed someone?",
    "Have you ever French kissed someone?",
    "Have you ever kissed someone of the same sex?",
    "Have you ever danced with someone?",
    "Have you ever danced with someone at a party?",
    "Have you ever been to a party with alcohol?",
    "Have you ever drunk alcohol?",
    "Have you ever been tipsy/drunk?",
    "Have you ever been hungover?",
    "Have you ever thrown up from drinking?",
    "Have you ever played drinking games?",
    "Have you ever smoked cigarettes?",
    "Have you ever smoked marijuana?",
    "Have you ever used recreational drugs?",
    "Have you ever been arrested?",
    "Have you ever been pulled over by the police?",
    "Have you ever snuck out of your house?",
    "Have you ever lied to your parents about where you were going?",
    "Have you ever skipped school?",
    "Have you ever failed a class?",
    "Have you ever cheated on a test?",
    "Have you ever plagiarized an assignment?",
    "Have you ever been in trouble with school administration?",
    "Have you ever been suspended or expelled?",
    "Have you ever had a crush on a teacher or professor?",
    "Have you ever had a romantic relationship with someone significantly older?",
    "Have you ever had a romantic relationship with someone significantly younger?",
    "Have you ever been on a blind date?",
    "Have you ever used a dating app?",
    "Have you ever had a one-night stand?",
    "Have you ever had multiple romantic partners at the same time?",
    "Have you ever cheated on a romantic partner?",
    "Have you ever been cheated on?",
    "Have you ever broken up with someone via text or social media?",
    "Have you ever had your heart broken?",
    "Have you ever broken someone's heart?",
    "Have you ever been in love?",
    "Have you ever said 'I love you' without meaning it?",
    "Have you ever lived with a romantic partner?",
    "Have you ever been engaged?",
    "Have you ever been married?",
    "Have you ever been divorced?",
    "Have you ever skinny dipped?",
    "Have you ever gone streaking?",
    "Have you ever sent a nude photo?",
    "Have you ever received a nude photo?",
    "Have you ever sexted?",
    "Have you ever had a friends with benefits relationship?",
    "Have you ever hooked up with someone you just met?",
    "Have you ever hooked up with a friend's ex?",
    "Have you ever been intimate in a public place?",
    "Have you ever been intimate in your parents' house?",
    "Have you ever been intimate in a car?",
    "Have you ever been caught being intimate?",
    "Have you ever walked in on someone being intimate?",
    "Have you ever fantasized about someone you know?",
    "Have you ever fantasized about a celebrity?",
    "Have you ever had an inappropriate dream?",
    "Have you ever masturbated?",
    "Have you ever been intimate with someone of the same sex?",
    "Have you ever questioned your sexuality?",
    "Have you ever been to a strip club?",
    "Have you ever gotten a lap dance?",
    "Have you ever given someone a lap dance?",
    "Have you ever been to an adult store?",
    "Have you ever owned adult toys?",
    "Have you ever watched adult content?",
    "Have you ever paid for adult content?",
    "Have you ever role-played in an intimate setting?",
    "Have you ever used food in an intimate way?",
    "Have you ever been handcuffed (not by police)?",
    "Have you ever been blindfolded in an intimate setting?",
    "Have you ever had an intimate encounter involving three or more people?",
    "Have you ever had an intimate encounter with someone in a relationship?",
    "Have you ever been intimate with someone much older than you?",
    "Have you ever been intimate with someone much younger than you?",
    "Have you ever been intimate with a friend's parent?",
    "Have you ever been intimate with your friend's sibling?",
    "Have you ever been intimate with a coworker?",
    "Have you ever been intimate with your boss?",
    "Have you ever been intimate with a teacher or professor?",
    "Have you ever made an intimate video?",
    "Have you ever shared intimate photos or videos of someone else?",
    "Have you ever stolen something worth more than $20?",
    "Have you ever shoplifted?",
    "Have you ever vandalized property?",
    "Have you ever trespassed on private property?",
    "Have you ever been in a physical fight?",
    "Have you ever bullied someone?",
    "Have you ever been bullied?",
    "Have you ever spread malicious rumors about someone?",
    "Have you ever cyber-bullied someone?",
    "Have you ever catfished someone?",
    "Have you ever lied about your age online?",
    "Have you ever pretended to be someone else online?",
    "Have you ever had a secret social media account?",
    "Have you ever posted something online that you later regretted?",
    "Have you ever been blocked by someone on social media?"
];

let currentQuestion = 0;
let answers = [];

function initializeTest() {
    // Check if returning to test
    const savedProgress = localStorage.getItem('ricePurityProgress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        currentQuestion = progress.currentQuestion;
        answers = progress.answers;
    }
    
    displayQuestion();
    updateProgress();
}

function displayQuestion() {
    if (currentQuestion >= questions.length) {
        finishTest();
        return;
    }
    
    const questionText = document.getElementById('question-text');
    
    questionText.textContent = questions[currentQuestion];
}

function updateProgress() {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = progress + '%';
    progressText.textContent = `${currentQuestion + 1} / ${questions.length}`;
}

function answerQuestion(answer) {
    answers[currentQuestion] = answer;
    currentQuestion++;
    
    // Save progress
    localStorage.setItem('ricePurityProgress', JSON.stringify({
        currentQuestion: currentQuestion,
        answers: answers
    }));
    
    // Add animation before moving to next question
    const card = document.querySelector('.bg-white.rounded-2xl');
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
    // Calculate final score
    const totalQuestions = questions.length;
    const yesAnswers = answers.filter(answer => answer === 'yes').length;
    const score = Math.round(((totalQuestions - yesAnswers) / totalQuestions) * 100);
    
    // Store results
    localStorage.setItem('ricePurityScore', score);
    localStorage.removeItem('ricePurityProgress');
    
    // Redirect to results
    window.location.href = 'result.html';
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    initializeTest();
    
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    
    yesBtn.addEventListener('click', () => answerQuestion('yes'));
    noBtn.addEventListener('click', () => answerQuestion('no'));
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'y' || e.key === 'Y') {
            answerQuestion('yes');
        } else if (e.key === 'n' || e.key === 'N') {
            answerQuestion('no');
        }
    });
});