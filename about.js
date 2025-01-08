document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const header = document.querySelector('.main-header');
    const nav = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');
    const tabs = document.querySelectorAll('.tab');
    const slides = document.querySelectorAll('.slide');
    const techSection = document.querySelector('.technology-section');
    const searchButton = document.querySelector('.search-button');

    // Mobile Menu Setup
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M3 12h18M3 6h18M3 18h18" stroke-width="2" stroke-linecap="round"/>
        </svg>
    `;
    nav.appendChild(mobileMenuBtn);

    // Mobile Menu Toggle
    function toggleMobileMenu(show) {
        navLinks.classList.toggle('active', show);
        mobileMenuBtn.innerHTML = show ? 
            `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M18 6L6 18M6 6l12 12" stroke-width="2" stroke-linecap="round"/>
            </svg>` :
            `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M3 12h18M3 6h18M3 18h18" stroke-width="2" stroke-linecap="round"/>
            </svg>`;
    }

    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = navLinks.classList.contains('active');
        toggleMobileMenu(!isActive);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('.mobile-menu-btn')) {
            toggleMobileMenu(false);
        }
    });

    // Navigation Links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.textContent.trim() === 'Technology') {
            link.classList.add('active');
        }

        link.addEventListener('click', (e) => {
            document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            toggleMobileMenu(false);
        });
    });

    // Tab and Slide Functionality
    function scrollToSlide(index) {
        const targetSlide = slides[index];
        if (targetSlide) {
            targetSlide.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    tabs.forEach((tab, index) => {
        // Touch events for tabs
        tab.addEventListener('touchstart', () => {
            tab.style.transform = 'scale(0.98)';
        });
        
        tab.addEventListener('touchend', () => {
            tab.style.transform = 'scale(1)';
        });

        // Click events for tabs
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            if (slides[index + 1]) {
                scrollToSlide(index + 1);
            }
        });
    });

    // Scroll Handling
    let touchStart = 0;
    let lastScroll = 0;

    document.addEventListener('touchstart', (e) => {
        touchStart = e.touches[0].pageY;
    });

    document.addEventListener('touchmove', (e) => {
        const touchEnd = e.touches[0].pageY;
        const diff = touchStart - touchEnd;
        
        if (Math.abs(diff) > 50) {
            const currentSlide = Math.floor(window.scrollY / window.innerHeight);
            const nextSlide = diff > 0 ? currentSlide + 1 : currentSlide - 1;
            
            if (nextSlide >= 0 && nextSlide < slides.length) {
                scrollToSlide(nextSlide);
            }
        }
    });

    // Header Observer
    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                header.style.backgroundColor = '#007bff';
                header.style.color = '#ffffff';
            } else {
                header.style.backgroundColor = '';
                header.style.color = '';
            }
        });
    }, { threshold: 0.1 });

    if (techSection) {
        headerObserver.observe(techSection);
    }

    // Scroll Effects
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        header.style.boxShadow = currentScroll > 50 ? '0 2px 5px rgba(0,0,0,0.2)' : 'none';
        lastScroll = currentScroll;
    });

    // Search Button
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            console.log('Search clicked');
        });
    }

    // Content Animation
    const contentObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.slide > main').forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        contentObserver.observe(section);
    });

    // Observe content sections for animation
    document.querySelectorAll('.content > div').forEach(element => {
        contentObserver.observe(element);
    });
});