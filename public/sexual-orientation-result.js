document.addEventListener('DOMContentLoaded', function() {
    const score = parseInt(localStorage.getItem('sexualOrientationScore')) || 40;
    const totalExploring = parseInt(localStorage.getItem('sexualOrientationTotal')) || 6;
    displayResults(score, totalExploring);
    
    // Share functionality
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', shareResults);
    }
});

function displayResults(score, totalExploring) {
    // Calculate dimensional scores
    const awarenessScore = Math.max(60, Math.min(100, score + Math.floor(Math.random() * 20)));
    const opennessScore = Math.max(70, Math.min(100, score + Math.floor(Math.random() * 15) + 10));
    const authenticityScore = Math.max(65, Math.min(100, score + Math.floor(Math.random() * 20) + 5));
    const courageScore = Math.max(75, Math.min(100, score + Math.floor(Math.random() * 15) + 15));
    
    // Update star ratings based on scores
    updateStarRating('awareness-stars', awarenessScore);
    updateStarRating('openness-stars', opennessScore);
    updateStarRating('authenticity-stars', authenticityScore);
    updateStarRating('courage-stars', courageScore);
    
    // Determine exploration level and description
    let level, description, explanation;
    
    if (score >= 70) {
        level = "Actively Exploring";
        description = "You're on a journey of self-discovery";
        explanation = `Your responses suggest you may be <strong>actively exploring your sexual orientation</strong>. This is a brave and important journey of self-discovery. You're asking important questions about your identity and attractions, which shows great self-awareness and courage. Remember that exploration is a process, and there's no rush to find all the answers immediately. Take your time, be patient with yourself, and know that whatever you discover about yourself is valid and worthy of celebration.`;
    } else if (score >= 40) {
        level = "Questioning & Reflecting";
        description = "You may be questioning aspects of your identity";
        explanation = `Your responses indicate you might be <strong>questioning and reflecting</strong> on your sexual orientation. This is completely normal and healthy. You may be experiencing some uncertainty or curiosity about your attractions and identity. This phase of questioning is an important part of self-discovery for many people. Consider giving yourself space to explore these feelings without pressure to label yourself immediately.`;
    } else if (score >= 20) {
        level = "Beginning to Wonder";
        description = "You might be starting to question your orientation";
        explanation = `Your responses suggest you may be <strong>beginning to wonder</strong> about your sexual orientation. Perhaps you're noticing some feelings or attractions that are making you question what you previously thought about yourself. This is the beginning of what could be an important journey of self-discovery. Be gentle with yourself and know that questioning is normal and healthy.`;
    } else {
        level = "Confident in Identity";
        description = "You seem confident in your current understanding";
        explanation = `Your responses suggest you feel <strong>confident in your current understanding</strong> of your sexual orientation. You may have a clear sense of your attractions and identity. Remember that sexual orientation can be fluid for some people, and it's okay if your understanding of yourself evolves over time. What matters most is that you feel authentic to yourself.`;
    }
    
    // Update display elements
    document.getElementById('exploration-level').textContent = level;
    document.getElementById('score-description').textContent = description;
    document.getElementById('score-explanation').innerHTML = explanation + `<p><strong>Remember:</strong> This quiz is just a tool for reflection. Only you can determine your sexual orientation, and whatever that may be, you are valid, loved, and deserving of respect and happiness.</p>`;
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
    const text = `I just took a Sexual Orientation Exploration Quiz for self-reflection. 🏳️‍🌈 Remember: your identity is valid whatever it may be! Explore at ricepurity-test.app`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Sexual Orientation Exploration',
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