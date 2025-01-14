const carousel = document.querySelector(".carousel");
const cards = document.querySelectorAll(".card");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
var box=document.querySelectorAll(".box");



// Variables for drag scrolling
let isDown = false;
let startX;
let scrollLeft;

// Function to toggle a card's active state
function toggleCard(index) {
    const selectedCard = cards[index];
    const description = selectedCard.querySelector(".card-description");

    if (selectedCard.classList.contains("active")) {
        // If the card is already active, remove the active state
        selectedCard.classList.remove("active");
        description.style.display = 'none';
        description.style.opacity = '0';
        description.style.visibility = 'hidden';
    } else {
        // Deactivate all other cards first
        cards.forEach((card) => {
            card.classList.remove("active");
            const otherDescription = card.querySelector(".card-description");
            otherDescription.style.display = 'none';
            otherDescription.style.opacity = '0';
            otherDescription.style.visibility = 'hidden';
        });

        // Activate the selected card
        selectedCard.classList.add("active");
        description.style.display = 'block';
        description.style.opacity = '1';
        description.style.visibility = 'visible';

        // Center the card in the carousel
        const carouselRect = carousel.getBoundingClientRect();
        const cardRect = selectedCard.getBoundingClientRect();
        const scrollLeft = carousel.scrollLeft + cardRect.left - 
                          carouselRect.left - 
                          (carouselRect.width - cardRect.width) / 2;

        carousel.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
        });
    }
}

// Mouse wheel scrolling
carousel.addEventListener('wheel', (e) => {
    e.preventDefault();
    carousel.scrollLeft += e.deltaY;
}, { passive: false });

// Mouse drag scrolling
carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    carousel.classList.add('grabbing');
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener('mouseleave', () => {
    isDown = false;
    carousel.classList.remove('grabbing');
});

carousel.addEventListener('mouseup', () => {
    isDown = false;
    carousel.classList.remove('grabbing');
});

carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    carousel.scrollLeft = scrollLeft - walk;
});

// Card click handling
cards.forEach((card, index) => {
    card.addEventListener("click", () => toggleCard(index));
});

// Scroll amount for arrows
const scrollAmount = 300; // Amount to scroll when an arrow is clicked

// Left arrow functionality
leftArrow.addEventListener("click", () => {
    carousel.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
    });
});

// Right arrow functionality
rightArrow.addEventListener("click", () => {
    carousel.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
    });
});

for(let i=0;i<box.length;i++){
    box[i].addEventListener("click",function(){
        this.classList.toggle("active");
    })
}