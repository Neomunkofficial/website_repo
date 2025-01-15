// Store selected values
import $ from 'jquery'
let selectedServices = new Set();
let selectedBudget = 'More than 50K'; // Default value


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

function rippleEffect(){
    $('#header').ripples({
        resolution: 512,
        dropRadius: 20,
        perturbance: 0.04
      });
}

if(width>1200){
    rippleEffect();
}

if(width>550){                                                
    Shery.mouseFollower({
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        skew: true,
        duration: 1,
    });
    
}
