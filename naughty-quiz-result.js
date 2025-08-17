document.addEventListener('DOMContentLoaded', function() {
    const score = parseInt(localStorage.getItem('naughtyQuizScore')) || 70;
    const totalNaughty = parseInt(localStorage.getItem('naughtyQuizTotal')) || 12;
    displayResults(score, totalNaughty);
    
    // Share functionality
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', shareResults);
    }
});

function displayResults(score, totalNaughty) {
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
    const score = localStorage.getItem('naughtyQuizScore') || 70;
    const text = `I just took the "Am I Naughty Quiz" and scored ${score}%! 😈 How naughty are you? Take the quiz at ricepurity-test.app`;
    
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