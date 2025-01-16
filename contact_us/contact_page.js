// Add scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-4');
        }
    });
}, observerOptions);

// Observe all major sections
document.querySelectorAll('main > div').forEach(section => {
    section.classList.add('opacity-0', 'translate-y-4', 'transition-all', 'duration-700');
    observer.observe(section);
});






// Add event listeners for service buttons
document.addEventListener('DOMContentLoaded', () => {
    // Handle service tag button clicks
    const serviceButtons = document.querySelectorAll('.service-tag');
    serviceButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('Button clicked:', button.textContent);
            button.classList.toggle('bg-gray-800'); // Toggle background color
            button.classList.toggle('text-white'); // Toggle text color
        });
    });

    // Handle budget tag button clicks
    const budgetButtons = document.querySelectorAll('.budget-tag');
    budgetButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('Button clicked:', button.textContent);
            // Remove active state from all budget buttons
            budgetButtons.forEach(b => b.classList.remove('bg-gray-800', 'text-white'));
            console.log('Button unclicked:', button.textContent);
            // Add active state to the clicked button
            button.classList.add('bg-gray-800', 'text-white');
        });
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


