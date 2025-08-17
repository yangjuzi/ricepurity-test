document.addEventListener('DOMContentLoaded', function() {
    const score = parseInt(localStorage.getItem('innocentDirtyScore')) || 60;
    const totalDirty = parseInt(localStorage.getItem('innocentDirtyTotal')) || 9;
    displayResults(score, totalDirty);
    
    // Share functionality
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', shareResults);
    }
});

function displayResults(score, totalDirty) {
    // Update score display
    document.getElementById('score-display').textContent = score + '%';
    document.getElementById('overall-score').textContent = score + '%';
    document.getElementById('overall-bar').style.width = score + '%';
    
    // Calculate dimensional scores
    const innocenceScore = Math.max(0, 100 - score);
    const mischiefScore = Math.min(100, score + Math.floor(Math.random() * 10));
    const curiosityScore = Math.max(50, Math.min(100, score + Math.floor(Math.random() * 20)));
    const adventureScore = Math.max(30, Math.min(100, score + Math.floor(Math.random() * 15) - 5));
    
    // Update dimensional scores
    document.getElementById('innocence-score').textContent = innocenceScore + '%';
    document.getElementById('innocence-bar').style.width = innocenceScore + '%';
    
    document.getElementById('mischief-score').textContent = mischiefScore + '%';
    document.getElementById('mischief-bar').style.width = mischiefScore + '%';
    
    document.getElementById('curiosity-score').textContent = curiosityScore + '%';
    document.getElementById('curiosity-bar').style.width = curiosityScore + '%';
    
    document.getElementById('adventure-score').textContent = adventureScore + '%';
    document.getElementById('adventure-bar').style.width = adventureScore + '%';
    
    // Update star ratings based on scores
    updateStarRating('innocence-stars', innocenceScore);
    updateStarRating('mischief-stars', mischiefScore);
    updateStarRating('curiosity-stars', curiosityScore);
    updateStarRating('adventure-stars', adventureScore);
    
    // Determine personality type and description
    let type, description, explanation;
    
    if (score >= 80) {
        type = "Dirty Devil";
        description = "You're definitely on the naughty side!";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> shows you're a <strong>Dirty Devil</strong>! You have a mischievous mind and aren't shy about adult topics. You probably make your friends blush with your bold comments and suggestive humor. You see the world through a playful, naughty lens and embrace your wild side.`;
    } else if (score >= 60) {
        type = "Mischievous";
        description = "You have a playful, naughty side";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> indicates you're <strong>Mischievous</strong>! You have a good balance but lean toward the naughty side. You enjoy adult humor and aren't easily embarrassed, but you still maintain some innocence. You're fun to be around and know how to spice up conversations.`;
    } else if (score >= 40) {
        type = "Balanced";
        description = "You have a good mix of innocence and mischief";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> shows you're perfectly <strong>Balanced</strong>! You have a healthy mix of innocence and mischief. You can appreciate both wholesome and adult humor, making you relatable to many people. You're mature enough to handle adult topics while maintaining a sense of wonder.`;
    } else if (score >= 20) {
        type = "Sweet & Pure";
        description = "You're mostly innocent with occasional mischief";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> indicates you're <strong>Sweet & Pure</strong>! You lean heavily toward innocence but have occasional moments of mischief. You prefer wholesome content and might blush at adult humor, but you're not completely naive about the world.`;
    } else {
        type = "Innocent Angel";
        description = "You're pure-hearted and wonderfully innocent";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> shows you're an <strong>Innocent Angel</strong>! You have a beautifully pure mind and see the world through innocent eyes. You prefer wholesome content and might not catch double meanings right away. Your innocence is refreshing and endearing to those around you.`;
    }
    
    // Update display elements
    document.getElementById('personality-type').textContent = type;
    document.getElementById('score-description').textContent = description;
    document.getElementById('score-explanation').innerHTML = explanation + `<p>Remember, whether you're innocent or mischievous, both personality types are wonderful! Your results simply reflect how your mind processes different situations and humor.</p>`;
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
    const score = localStorage.getItem('innocentDirtyScore') || 60;
    const text = `I just took the "Am I Innocent or Dirty Quiz" and scored ${score}%! 😇😈 Are you more innocent or dirty? Take the quiz at ricepurity-test.app`;
    
    if (navigator.share) {
        navigator.share({
            title: 'My Innocent or Dirty Quiz Results',
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