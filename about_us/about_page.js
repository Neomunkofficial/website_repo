document.addEventListener('DOMContentLoaded', function() {
    // Get all team cards
    const teamCards = document.querySelectorAll('.team-card');
    
    // Add click event listeners to each card
    teamCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't flip if clicking LinkedIn icon
            if (e.target.closest('.fa-linkedin')) {
                return;
            }
            
            // Remove flipped class from other cards
            teamCards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.classList.remove('flipped');
                }
            });
            
            // Toggle flip on clicked card
            this.classList.toggle('flipped');
        });
    });
    
    // Close cards when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.team-card')) {
            teamCards.forEach(card => {
                card.classList.remove('flipped');
            });
        }
    });
});