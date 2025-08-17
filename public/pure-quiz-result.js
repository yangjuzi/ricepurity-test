document.addEventListener('DOMContentLoaded', function() {
    const score = parseInt(localStorage.getItem('pureQuizScore')) || 85;
    const totalPure = parseInt(localStorage.getItem('pureQuizTotal')) || 14;
    displayResults(score, totalPure);
    
    // Share functionality
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', shareResults);
    }
});

function displayResults(score, totalPure) {
    // Update score display
    document.getElementById('score-display').textContent = score + '%';
    document.getElementById('overall-score').textContent = score + '%';
    document.getElementById('overall-bar').style.width = score + '%';
    
    // Calculate dimensional scores
    const innocenceScore = Math.min(100, score + Math.floor(Math.random() * 10));
    const moralScore = Math.max(60, Math.min(100, score + Math.floor(Math.random() * 15) - 5));
    const experienceScore = Math.max(10, Math.min(80, 100 - score + Math.floor(Math.random() * 20)));
    const wisdomScore = Math.max(50, Math.min(100, score + Math.floor(Math.random() * 20) - 10));
    
    // Update dimensional scores
    document.getElementById('innocence-score').textContent = innocenceScore + '%';
    document.getElementById('innocence-bar').style.width = innocenceScore + '%';
    
    document.getElementById('moral-score').textContent = moralScore + '%';
    document.getElementById('moral-bar').style.width = moralScore + '%';
    
    document.getElementById('experience-score').textContent = experienceScore + '%';
    document.getElementById('experience-bar').style.width = experienceScore + '%';
    
    document.getElementById('wisdom-score').textContent = wisdomScore + '%';
    document.getElementById('wisdom-bar').style.width = wisdomScore + '%';
    
    // Update star ratings based on scores
    updateStarRating('innocence-stars', innocenceScore);
    updateStarRating('moral-stars', moralScore);
    updateStarRating('experience-stars', experienceScore);
    updateStarRating('wisdom-stars', wisdomScore);
    
    // Determine purity level and description
    let level, description, explanation;
    
    if (score >= 90) {
        level = "Absolutely Pure";
        description = "You have an incredibly pure and innocent heart";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> shows you are <strong>Absolutely Pure</strong>! You have an incredibly innocent and pure heart. You consistently choose the moral high ground and see the best in people and situations. Your purity is a rare and beautiful quality that brings light to those around you.`;
    } else if (score >= 75) {
        level = "Very Pure";
        description = "You have a beautiful, innocent heart";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> indicates you are <strong>Very Pure</strong>! You have a beautiful, innocent heart and strong moral compass. You tend to make decisions based on your values rather than convenience, and you maintain your integrity even in difficult situations.`;
    } else if (score >= 60) {
        level = "Moderately Pure";
        description = "You balance purity with life experience";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> shows you are <strong>Moderately Pure</strong>! You have a good balance between maintaining your moral values and learning from life experiences. You're pure-hearted but not naive about the world around you.`;
    } else if (score >= 40) {
        level = "Somewhat Experienced";
        description = "You've learned from life while keeping your good heart";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> indicates you are <strong>Somewhat Experienced</strong>! You've gained wisdom through various life experiences while still maintaining a fundamentally good heart. You understand the complexities of life but try to do the right thing.`;
    } else {
        level = "Worldly Wise";
        description = "You're experienced in life's complexities";
        explanation = `Your score of <span class="font-bold text-primary">${score}%</span> shows you are <strong>Worldly Wise</strong>! You've experienced many aspects of life and have a realistic understanding of human nature. Your wisdom comes from experience, and you've learned to navigate life's complexities with practical knowledge.`;
    }
    
    // Update display elements
    document.getElementById('purity-level').textContent = level;
    document.getElementById('score-description').textContent = description;
    document.getElementById('score-explanation').innerHTML = explanation + `<p>Remember, purity comes in many forms, and there's beauty in both innocence and experience. Your results reflect your unique perspective on life and moral choices.</p>`;
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
    const score = localStorage.getItem('pureQuizScore') || 85;
    const text = `I just took the "How Pure Are You Quiz" and scored ${score}%! 😇 How pure are you? Take the quiz at ricepurity-test.app`;
    
    if (navigator.share) {
        navigator.share({
            title: 'My How Pure Are You Quiz Results',
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