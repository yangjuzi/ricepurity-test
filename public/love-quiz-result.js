document.addEventListener('DOMContentLoaded', function() {
    const score = parseInt(localStorage.getItem('loveQuizScore')) || 75;
    const totalLove = parseInt(localStorage.getItem('loveQuizTotal')) || 13;
    displayResults(score, totalLove);
    
    // Share functionality
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', shareResults);
    }
});

function displayResults(score, totalLove) {
    // Update score display
    document.getElementById('score-display').textContent = score + '%';
    document.getElementById('overall-score').textContent = score + '%';
    document.getElementById('overall-bar').style.width = score + '%';
    
    // Calculate dimensional scores
    const emotionalScore = Math.min(100, score + Math.floor(Math.random() * 15));
    const futureScore = Math.max(40, Math.min(100, score + Math.floor(Math.random() * 20) - 5));
    const physicalScore = Math.min(100, score + Math.floor(Math.random() * 20) + 5);
    const growthScore = Math.max(30, Math.min(100, score + Math.floor(Math.random() * 25) - 10));
    
    // Update dimensional scores
    document.getElementById('emotional-score').textContent = emotionalScore + '%';
    document.getElementById('emotional-bar').style.width = emotionalScore + '%';
    
    document.getElementById('future-score').textContent = futureScore + '%';
    document.getElementById('future-bar').style.width = futureScore + '%';
    
    document.getElementById('physical-score').textContent = physicalScore + '%';
    document.getElementById('physical-bar').style.width = physicalScore + '%';
    
    document.getElementById('growth-score').textContent = growthScore + '%';
    document.getElementById('growth-bar').style.width = growthScore + '%';
    
    // Update star ratings based on scores
    updateStarRating('emotional-stars', emotionalScore);
    updateStarRating('future-stars', futureScore);
    updateStarRating('physical-stars', physicalScore);
    updateStarRating('growth-stars', growthScore);
    
    // Determine love level and description
    let level, description, explanation;
    
    if (score >= 85) {
        level = "Deep Love";
        description = "You are deeply and completely in love";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> shows you are experiencing <strong>Deep Love</strong>! You have found someone who completes you in every way. Your feelings are intense, genuine, and all-encompassing. You can't imagine life without them, and they inspire you to be your best self. This is the kind of love that lasts a lifetime.`;
    } else if (score >= 70) {
        level = "Strong Feelings";
        description = "You have deep romantic feelings";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> indicates you have <strong>Strong Feelings</strong>! You have deep romantic feelings that go beyond simple attraction. You care deeply about this person and can envision a future together, though you might still be exploring the full depth of your emotions. This suggests genuine love with room for even deeper connection.`;
    } else if (score >= 50) {
        level = "Growing Attraction";
        description = "Your feelings are developing into something deeper";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> shows you have <strong>Growing Attraction</strong>! Your feelings are developing beyond initial attraction into something more meaningful. You're drawn to this person and enjoy their company, but you're still discovering the depth of your emotions. This could be the beginning of love.`;
    } else if (score >= 30) {
        level = "Infatuation";
        description = "You're experiencing strong attraction and excitement";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> indicates you're experiencing <strong>Infatuation</strong>! You're attracted to this person and excited by the possibility of romance. Your feelings are real but may be based more on fantasy and physical attraction than deep emotional connection. Time will tell if this develops into love.`;
    } else {
        level = "Friendship";
        description = "Your feelings seem more platonic than romantic";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> suggests your feelings are more like <strong>Friendship</strong>. While you care about this person, your feelings appear to be more platonic than romantic. You may admire them and enjoy their company, but the intense emotions associated with romantic love aren't strongly present.`;
    }
    
    // Update display elements
    document.getElementById('love-level').textContent = level;
    document.getElementById('score-description').textContent = description;
    document.getElementById('score-explanation').innerHTML = explanation + `<p>Remember, love is a complex emotion that develops differently for everyone. Trust your heart and give your feelings time to grow and develop naturally.</p>`;
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
    const score = localStorage.getItem('loveQuizScore') || 75;
    const text = `I just took the "Am I In Love Quiz" and scored ${score}%! 💕 Are you in love? Take the quiz at ricepurity-test.app`;
    
    if (navigator.share) {
        navigator.share({
            title: 'My Am I In Love Quiz Results',
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