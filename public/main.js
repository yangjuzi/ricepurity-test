// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const showMoreBtn = document.getElementById('show-more-btn');
    const showLessBtn = document.getElementById('show-less-btn');
    const additionalQuizzes = document.getElementById('additional-quizzes');

    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Show more/less functionality for quizzes
    if (showMoreBtn && additionalQuizzes) {
        showMoreBtn.addEventListener('click', function() {
            additionalQuizzes.classList.remove('hidden');
            showMoreBtn.classList.add('hidden');
            showLessBtn.classList.remove('hidden');
        });
    }

    if (showLessBtn && additionalQuizzes) {
        showLessBtn.addEventListener('click', function() {
            additionalQuizzes.classList.add('hidden');
            showLessBtn.classList.add('hidden');
            showMoreBtn.classList.remove('hidden');
        });
    }

    // FAQ functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            answer.classList.toggle('hidden');
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});