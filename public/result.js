document.addEventListener('DOMContentLoaded', function() {
    const score = localStorage.getItem('ricePurityScore') || 85;
    displayResults(parseInt(score));
    
    // Share functionality
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', shareResults);
    }
});

function displayResults(score) {
    // Update score display
    document.getElementById('score-display').textContent = score;
    document.getElementById('overall-score').textContent = `${score}/100`;
    document.getElementById('overall-bar').style.width = `${score}%`;
    
    // Calculate dimensional scores
    const socialScore = Math.max(10, Math.min(100, score + Math.floor(Math.random() * 20) - 10));
    const romanceScore = Math.max(10, Math.min(100, score + Math.floor(Math.random() * 30) - 15));
    const adventureScore = Math.max(10, Math.min(100, score + Math.floor(Math.random() * 25) - 12));
    const maturityScore = Math.max(10, Math.min(100, score + Math.floor(Math.random() * 20) - 10));
    
    // Update dimensional scores
    document.getElementById('social-score').textContent = `${socialScore}/100`;
    document.getElementById('social-bar').style.width = `${socialScore}%`;
    
    document.getElementById('romance-score').textContent = `${romanceScore}/100`;
    document.getElementById('romance-bar').style.width = `${romanceScore}%`;
    
    document.getElementById('adventure-score').textContent = `${adventureScore}/100`;
    document.getElementById('adventure-bar').style.width = `${adventureScore}%`;
    
    document.getElementById('maturity-score').textContent = `${maturityScore}/100`;
    document.getElementById('maturity-bar').style.width = `${maturityScore}%`;
    
    // Update star ratings based on scores
    updateStarRating('social-stars', socialScore);
    updateStarRating('romance-stars', romanceScore);
    updateStarRating('adventure-stars', adventureScore);
    updateStarRating('maturity-stars', maturityScore);
    
    // Determine purity level and description
    let level, description, explanation;
    
    if (score >= 90) {
        level = "Extremely Pure";
        description = "You're incredibly innocent and pure-hearted";
        explanation = `Your score of <span class="font-bold text-primary">${score}</span> places you in the <strong>extremely pure</strong> category. You've maintained a very innocent approach to life and likely haven't engaged in many risky or adult behaviors. This suggests strong moral values and careful decision-making. You're someone who thinks before acting and prioritizes long-term consequences over immediate gratification.`;
    } else if (score >= 75) {
        level = "Quite Pure";
        description = "You're relatively innocent with room for adventure";
        explanation = `Your score of <span class="font-bold text-primary">${score}</span> indicates you're <strong>quite pure</strong> but have experienced some aspects of adult life. You've likely had some romantic experiences and social adventures while maintaining relatively traditional values. This balance suggests you're open to new experiences but approach them thoughtfully.`;
    } else if (score >= 60) {
        level = "Moderately Pure";
        description = "You've had a balanced mix of experiences";
        explanation = `Your score of <span class="font-bold text-primary">${score}</span> shows you're <strong>moderately pure</strong> with a good balance of life experiences. You've explored various aspects of social, romantic, and adventurous activities while still maintaining some boundaries. This suggests you're comfortable with both conservative and liberal approaches to life.`;
    } else if (score >= 40) {
        level = "Somewhat Experienced";
        description = "You've explored many aspects of life";
        explanation = `Your score of <span class="font-bold text-primary">${score}</span> indicates you're <strong>somewhat experienced</strong> and have explored many different aspects of life. You've likely had diverse social, romantic, and adventurous experiences. This suggests you're open-minded and willing to try new things while still maintaining some personal boundaries.`;
    } else if (score >= 20) {
        level = "Very Experienced";
        description = "You've had extensive life experiences";
        explanation = `Your score of <span class="font-bold text-primary">${score}</span> shows you're <strong>very experienced</strong> in many areas of life. You've likely engaged in a wide variety of social, romantic, and adventurous activities. This suggests you're highly open to new experiences and comfortable exploring different aspects of adult life.`;
    } else {
        level = "Extremely Experienced";
        description = "You've experienced most aspects of adult life";
        explanation = `Your score of <span class="font-bold text-primary">${score}</span> indicates you're <strong>extremely experienced</strong> and have engaged in most aspects of adult life covered by this test. You're likely very open-minded, adventurous, and comfortable with a wide range of experiences. This suggests you approach life with curiosity and minimal inhibitions.`;
    }
    
    // Update display elements
    document.getElementById('purity-level').textContent = level;
    document.getElementById('score-description').textContent = description;
    document.getElementById('score-explanation').innerHTML = explanation + `<p>Remember, there's no "right" or "wrong" score - this is simply a fun way to reflect on your life experiences! Your score is just one way to look at your journey, and every person's path is unique and valid.</p>`;
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
    const score = localStorage.getItem('ricePurityScore') || 85;
    const text = `I just took the Rice Purity Test and scored ${score}/100! 🎉 Take yours at ricepurity-test.app`;
    
    if (navigator.share) {
        navigator.share({
            title: 'My Rice Purity Test Results',
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