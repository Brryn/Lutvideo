document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Setup
    const nav = document.querySelector('nav');
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    nav.appendChild(hamburger);

    const navLinks = document.querySelector('.nav-links');
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Animate hamburger
        const spans = this.getElementsByTagName('span');
        this.classList.toggle('active');
        if (this.classList.contains('active')) {
            spans[0].style.transform = 'rotate(-45deg) translate(-6px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(45deg) translate(-6px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            const spans = hamburger.getElementsByTagName('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Existing Slider functionality
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const dotsContainer = document.querySelector('.dots');
    
    let currentSlide = 0;
    const totalSlides = slides.length;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    // Navigation functions
    function updateSlider() {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    // Event listeners
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    // Auto-advance slider
    let slideInterval = setInterval(nextSlide, 5000);

    // Pause auto-advance on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });

    // Navigation active state
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinksItems.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Close mobile menu after clicking a link
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                const spans = hamburger.getElementsByTagName('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });

    // Scroll effects for header
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // Smooth scroll for anchor links
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

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            const spans = hamburger.getElementsByTagName('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});