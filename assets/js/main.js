const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Theme Toggle
const savedTheme = localStorage.getItem('theme') || 'light';
body.classList.add(savedTheme + '-mode');
themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    
    const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
    
    themeToggle.innerHTML = currentTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    
    refreshOceanLife();
});

// Ocean Life Animation
function createOceanLife() {
    const oceanLife = document.getElementById('oceanLife');
    oceanLife.innerHTML = '';
    
    // Create fish
    for (let i = 0; i < 8; i++) {
        const fish = document.createElement('div');
        fish.className = 'fish';
        fish.style.top = `${Math.random() * 80 + 10}%`;
        fish.style.left = `${Math.random() * 100}%`;
        fish.style.animationDuration = `${Math.random() * 15 + 10}s`;
        fish.style.animationDelay = `${Math.random() * 5}s`;
        fish.style.opacity = '0.7';
        fish.style.setProperty('--accent', getComputedStyle(document.documentElement).getPropertyValue('--accent'));
        fish.style.setProperty('--dark', getComputedStyle(document.documentElement).getPropertyValue('--dark'));
        oceanLife.appendChild(fish);
    }
    
    // Create bubbles (blue #1a73e8)
    for (let i = 0; i < 30; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.style.width = `${Math.random() * 15 + 5}px`;
        bubble.style.height = bubble.style.width;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.bottom = '-10px';
        bubble.style.animationDuration = `${Math.random() * 15 + 5}s`;
        bubble.style.animationDelay = `${Math.random() * 5}s`;
        oceanLife.appendChild(bubble);
    }
    
    // Create seaweed
    for (let i = 0; i < 5; i++) {
        const seaweed = document.createElement('div');
        seaweed.className = 'seaweed';
        seaweed.style.left = `${Math.random() * 100}%`;
        seaweed.style.bottom = '0';
        seaweed.style.height = `${Math.random() * 100 + 50}px`;
        seaweed.style.animation = `sway ${Math.random() * 5 + 3}s ease-in-out infinite alternate`;
        seaweed.style.setProperty('--secondary', getComputedStyle(document.documentElement).getPropertyValue('--secondary'));
        oceanLife.appendChild(seaweed);
    }
}

function refreshOceanLife() {
    createOceanLife();
}

// Smooth Scrolling
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('section');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = item.getAttribute('data-section');
        
        navItems.forEach(navItem => navItem.classList.remove('active'));
        item.classList.add('active');
        
        const targetSection = document.getElementById(sectionId);
        const offset = targetSection.offsetTop - 100;
        
        window.scrollTo({
            top: offset,
            behavior: 'smooth'
        });
    });
});

// Scroll Spy with Debouncing
let isScrolling;
window.addEventListener('scroll', () => {
    clearTimeout(isScrolling);
    
    isScrolling = setTimeout(() => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === current) {
                item.classList.add('active');
            }
        });
    }, 100);
});

// Animate Elements on Scroll with Intersection Observer
const animateOnScroll = () => {
    const skillItems = document.querySelectorAll('.skill-item');
    const projectCards = document.querySelectorAll('.project-card');
    const achievementCards = document.querySelectorAll('.achievement-card');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const contactItems = document.querySelectorAll('.contact-item');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('show');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    [...skillItems, ...projectCards, ...achievementCards, ...timelineItems, ...contactItems].forEach(item => {
        observer.observe(item);
    });
};

// Preload Assets
function preloadAssets() {
    const assets = [
        'assets/profile/profile.jpg',
        'assets/images/cv/Atchuta_Kumar_CV.pdf',
        'assets/images/projects/rohit-cares.jpg',
        'assets/images/projects/dev-a-chatbot.jpg',
        'assets/images/projects/sentiment-analysis.jpg'
    ];
    
    assets.forEach(asset => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = asset.endsWith('.pdf') ? 'document' : 'image';
        link.href = asset;
        document.head.appendChild(link);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    preloadAssets();
    createOceanLife();
    animateOnScroll();
});