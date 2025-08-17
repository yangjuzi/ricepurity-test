document.addEventListener('DOMContentLoaded', function() {
    const score = parseInt(localStorage.getItem('dirtyMindScore')) || 75;
    const totalDirty = parseInt(localStorage.getItem('dirtyMindTotal')) || 15;
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
    const naughtyScore = Math.min(100, score + Math.floor(Math.random() * 10));
    const humorScore = Math.max(60, Math.min(100, score + Math.floor(Math.random() * 20)));
    const creativityScore = Math.max(40, Math.min(100, score + Math.floor(Math.random() * 15) - 5));
    
    // Update dimensional scores
    document.getElementById('innocence-score').textContent = innocenceScore + '%';
    document.getElementById('innocence-bar').style.width = innocenceScore + '%';
    
    document.getElementById('naughty-score').textContent = naughtyScore + '%';
    document.getElementById('naughty-bar').style.width = naughtyScore + '%';
    
    document.getElementById('humor-score').textContent = humorScore + '%';
    document.getElementById('humor-bar').style.width = humorScore + '%';
    
    document.getElementById('creativity-score').textContent = creativityScore + '%';
    document.getElementById('creativity-bar').style.width = creativityScore + '%';
    
    // Update star ratings based on scores
    updateStarRating('innocence-stars', innocenceScore);
    updateStarRating('naughty-stars', naughtyScore);
    updateStarRating('humor-stars', humorScore);
    updateStarRating('creativity-stars', creativityScore);
    
    // Determine dirty level and description
    let level, description, explanation;
    
    if (score >= 80) {
        level = "Extremely Dirty";
        description = "Your mind is in the gutter most of the time!";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> shows you have an <strong>extremely dirty mind</strong>! You see innuendo and double meanings everywhere, and you're not afraid to embrace your naughty thoughts. You probably make your friends blush with your witty and suggestive observations. Your mind naturally gravitates toward the risqué interpretation of innocent situations.`;
    } else if (score >= 60) {
        level = "Pretty Dirty";
        description = "Your mind goes to naughty places often";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> indicates you have a <strong>pretty dirty mind</strong>! You tend to catch double entendres and aren't shy about adult humor. You have a good balance of innocence and naughtiness, making you fun to be around while still maintaining some boundaries.`;
    } else if (score >= 40) {
        level = "Moderately Dirty";
        description = "You have some naughty thoughts but stay mostly clean";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> shows you have a <strong>moderately dirty mind</strong>. You occasionally think naughty thoughts but generally keep things clean. You appreciate adult humor when it's obvious but don't always look for hidden meanings in innocent situations.`;
    } else if (score >= 20) {
        level = "Mostly Clean";
        description = "Your mind stays pretty innocent most of the time";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> indicates you have a <strong>mostly clean mind</strong>. You tend to see the innocent side of situations and don't often think dirty thoughts. You might miss some double entendres but that's because your mind naturally goes to wholesome interpretations.`;
    } else {
        level = "Pure as Snow";
        description = "Your mind is remarkably innocent and clean";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> shows you have an incredibly <strong>pure and innocent mind</strong>! You rarely think dirty thoughts and almost always interpret situations in the most wholesome way possible. Your innocence is refreshing and endearing to those around you.`;
    }
    
    // Update display elements
    document.getElementById('dirty-level').textContent = level;
    document.getElementById('score-description').textContent = description;
    document.getElementById('score-explanation').innerHTML = explanation + `<p>Remember, having a dirty mind isn't necessarily good or bad - it's just one aspect of your personality and sense of humor! Whether you're innocent or naughty, what matters is that you're comfortable with yourself.</p>`;
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
    const score = localStorage.getItem('dirtyMindScore') || 75;
    const text = `I just took the Dirty Mind Test and scored ${score}%! 🧠 How dirty is your mind? Take the test at ricepurity-test.app`;
    
    if (navigator.share) {
        navigator.share({
            title: 'My Dirty Mind Test Results',
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