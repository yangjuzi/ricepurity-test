document.addEventListener('DOMContentLoaded', function() {
    const score = parseInt(localStorage.getItem('simpTestScore')) || 45;
    const totalSimp = parseInt(localStorage.getItem('simpTestTotal')) || 9;
    displayResults(score, totalSimp);
    
    // Share functionality
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', shareResults);
    }
});

function displayResults(score, totalSimp) {
    // Update score display
    document.getElementById('score-display').textContent = score + '%';
    document.getElementById('overall-score').textContent = score + '%';
    document.getElementById('overall-bar').style.width = score + '%';
    
    // Calculate dimensional scores
    const selfRespectScore = Math.max(20, Math.min(100, 100 - score + Math.floor(Math.random() * 20)));
    const boundariesScore = Math.max(15, Math.min(100, 100 - score + Math.floor(Math.random() * 25)));
    const generosityScore = Math.min(100, score + Math.floor(Math.random() * 20) + 20);
    const independenceScore = Math.max(25, Math.min(100, 100 - score + Math.floor(Math.random() * 15)));
    
    // Update dimensional scores
    document.getElementById('selfrespect-score').textContent = selfRespectScore + '%';
    document.getElementById('selfrespect-bar').style.width = selfRespectScore + '%';
    
    document.getElementById('boundaries-score').textContent = boundariesScore + '%';
    document.getElementById('boundaries-bar').style.width = boundariesScore + '%';
    
    document.getElementById('generosity-score').textContent = generosityScore + '%';
    document.getElementById('generosity-bar').style.width = generosityScore + '%';
    
    document.getElementById('independence-score').textContent = independenceScore + '%';
    document.getElementById('independence-bar').style.width = independenceScore + '%';
    
    // Update star ratings based on scores
    updateStarRating('selfrespect-stars', selfRespectScore);
    updateStarRating('boundaries-stars', boundariesScore);
    updateStarRating('generosity-stars', generosityScore);
    updateStarRating('independence-stars', independenceScore);
    
    // Determine simp level and description
    let level, description, explanation;
    
    if (score >= 80) {
        level = "Ultimate Simp";
        description = "You go to extreme lengths for romantic attention";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> shows you're an <strong>Ultimate Simp</strong>! You tend to put others' needs far above your own and may sacrifice your self-respect for romantic attention. You're incredibly generous, but this might be taken advantage of. Consider setting stronger boundaries and valuing yourself more.`;
    } else if (score >= 60) {
        level = "Overly Generous";
        description = "You're very giving but might be overdoing it";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> indicates you're <strong>Overly Generous</strong>! You have a big heart and love to make others happy, but you might be going overboard. You tend to prioritize others' happiness over your own needs, which can lead to unbalanced relationships.`;
    } else if (score >= 40) {
        level = "People Pleaser";
        description = "You're generous but maintain some boundaries";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> shows you're a <strong>People Pleaser</strong>! You're caring and generous in relationships, but sometimes you might bend over backwards to make others happy. You have some boundaries, but they can be flexible when you really like someone.`;
    } else if (score >= 20) {
        level = "Slightly Generous";
        description = "You're caring but maintain good self-respect";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> indicates you're <strong>Slightly Generous</strong>! You're kind and caring in relationships while maintaining healthy boundaries. You know how to be generous without sacrificing your self-respect or independence.`;
    } else {
        level = "Confident & Balanced";
        description = "You have excellent boundaries and self-respect";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> shows you're <strong>Confident & Balanced</strong>! You have excellent self-respect and maintain healthy boundaries in relationships. You're generous when appropriate but never at the expense of your own well-being. You understand that healthy relationships require mutual respect and balance.`;
    }
    
    // Update display elements
    document.getElementById('simp-level').textContent = level;
    document.getElementById('score-description').textContent = description;
    document.getElementById('score-explanation').innerHTML = explanation + `<p>Remember, being generous and caring is wonderful, but healthy relationships require balance, mutual respect, and maintaining your own self-worth!</p>`;
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
    const score = localStorage.getItem('simpTestScore') || 45;
    const text = `I just took the Simp Test and scored ${score}%! 👑 How generous are you in relationships? Take the test at ricepurity-test.app`;
    
    if (navigator.share) {
        navigator.share({
            title: 'My Simp Test Results',
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