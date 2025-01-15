import Shery from "sheryjs";

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

var crsr=document.querySelector("#cursor")

document.addEventListener("mousemove",function(dets){  
    crsr.style.left=dets.x+"px"
    crsr.style.top=dets.y+"px"
    
    
})

Shery.mouseFollower({
    //Parameters are optional.
    skew: true,
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,
  });