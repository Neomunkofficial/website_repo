document.addEventListener('DOMContentLoaded', function() {
    const accordionButtons = document.querySelectorAll('.accordion-btn');
    
    function closeAllAccordions() {
        document.querySelectorAll('.accordion-content').forEach(content => {
            content.classList.remove('active');
        });
        document.querySelectorAll('.chevron').forEach(chevron => {
            chevron.classList.remove('active');
        });
    }
    
    accordionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const content = document.getElementById(targetId);
            const chevron = this.querySelector('.chevron');
            
            if (content.classList.contains('active')) {
                // If clicking on an open accordion, just close it
                content.classList.remove('active');
                chevron.classList.remove('active');
            } else {
                // Close all accordions first
                closeAllAccordions();
                
                // Then open the clicked one
                content.classList.add('active');
                chevron.classList.add('active');
            }
        });
    });
});






document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const overlay = document.querySelector('.overlay');
    const closeBtn = document.querySelector('.close-btn');

    function expandCard(selectedCard) {
        selectedCard.classList.add('expanded');
        overlay.classList.add('active');
        closeBtn.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Shift other cards
        cards.forEach(card => {
            if (card !== selectedCard) {
                const cardRect = card.getBoundingClientRect();
                const selectedRect = selectedCard.getBoundingClientRect();
                
                if (cardRect.left < selectedRect.left) {
                    card.classList.add('shifted-left');
                } else {
                    card.classList.add('shifted-right');
                }
            }
        });
    }

    function closeExpandedCard() {
        const expandedCard = document.querySelector('.card.expanded');
        if (expandedCard) {
            expandedCard.classList.remove('expanded');
            overlay.classList.remove('active');
            closeBtn.classList.remove('active');
            document.body.style.overflow = '';

            // Remove shift classes
            cards.forEach(card => {
                card.classList.remove('shifted-left', 'shifted-right');
            });
        }
    }

    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (!card.classList.contains('expanded')) {
                expandCard(card);
            }
        });
    });

    closeBtn.addEventListener('click', closeExpandedCard);
    overlay.addEventListener('click', closeExpandedCard);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeExpandedCard();
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        closeExpandedCard();
    });
});




function initLocomotive() {
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize Locomotive Scroll
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true,
        multiplier: 1,
        class: "is-revealed",
        getDirection: true,
        smartphone: {
            smooth: true
        },
        tablet: {
            smooth: true
        }
    });

    // Each time Locomotive Scroll updates, tell ScrollTrigger to update too
    locoScroll.on("scroll", ScrollTrigger.update);

    // Tell ScrollTrigger to use these proxy methods for the ".main" element
    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        },
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });

    // Each time the window updates, refresh ScrollTrigger and then update LocomotiveScroll
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
}

// Initialize when the DOM is ready
document.addEventListener('DOMContentLoaded', initLocomotive);
