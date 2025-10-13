// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
const navLinkItems = navLinks.querySelectorAll('a');
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Carousel Functionality
const carouselTrack = document.getElementById('carouselTrack');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');
const carouselItems = document.querySelectorAll('.carousel-item');

let currentIndex = 0;
let itemsPerView = 1;

// Calculate items per view based on screen width
function updateItemsPerView() {
    if (window.innerWidth >= 1024) {
        itemsPerView = 4;
    } else if (window.innerWidth >= 768) {
        itemsPerView = 2;
    } else {
        itemsPerView = 1;
    }
}

// Update carousel position
function updateCarousel() {
    const itemWidth = carouselItems[0].offsetWidth;
    const gap = 27;
    const offset = -(currentIndex * (itemWidth + gap));
    carouselTrack.style.transform = `translateX(${offset}px)`;
}

// Previous button
carouselPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

// Next button
carouselNext.addEventListener('click', () => {
    const maxIndex = carouselItems.length - itemsPerView;
    if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
    }
});

// Update on resize
window.addEventListener('resize', () => {
    updateItemsPerView();
    currentIndex = 0;
    updateCarousel();
});

// Initialize
updateItemsPerView();
updateCarousel();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Optional: Auto-advance carousel
let autoAdvance = null;

function startAutoAdvance() {
    autoAdvance = setInterval(() => {
        const maxIndex = carouselItems.length - itemsPerView;
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    }, 5000); // Change every 5 seconds
}

function stopAutoAdvance() {
    if (autoAdvance) {
        clearInterval(autoAdvance);
    }
}

// Start auto-advance (optional - uncomment to enable)
// startAutoAdvance();

// Pause auto-advance on user interaction
carouselPrev.addEventListener('click', () => {
    stopAutoAdvance();
});

carouselNext.addEventListener('click', () => {
    stopAutoAdvance();
});

