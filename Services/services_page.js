const carousel = document.querySelector(".carousel");
const cards = document.querySelectorAll(".card");

// Variables for drag scrolling
let isDown = false;
let startX;
let scrollLeft;

function activateCard(index) {
    cards.forEach((card) => card.classList.remove("active"));
    cards[index].classList.add("active");
    
    const card = cards[index];
    const carouselRect = carousel.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    
    const scrollLeft = carousel.scrollLeft + cardRect.left - 
                      carouselRect.left - 
                      (carouselRect.width - cardRect.width) / 2;
    
    carousel.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
    });
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
    card.addEventListener("click", () => {
        if (card.classList.contains("active")) {
            card.classList.remove("active");
        } else {
            activateCard(index);
        }
    });
});
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

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
