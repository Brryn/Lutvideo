document.addEventListener('DOMContentLoaded', () => {
    // Initialize elements
    const nav = document.querySelector('header nav');
    const navLinks = document.querySelector('.nav-links');
    const productGrid = document.getElementById('productGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Add hamburger menu
    const createHamburger = () => {
        const hamburger = document.createElement('div');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = `<span></span><span></span><span></span>`;
        nav.appendChild(hamburger);
        return hamburger;
    };
    
    const hamburger = createHamburger();
    
    // Hamburger animation functions
    const toggleHamburger = (isActive) => {
        const spans = hamburger.getElementsByTagName('span');
        if (isActive) {
            spans[0].style.transform = 'rotate(-45deg) translate(-6px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(45deg) translate(-6px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    };
    
    const resetMobileMenu = () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        toggleHamburger(false);
    };

    // Mobile menu handlers
    hamburger.addEventListener('click', function() {
        const isActive = !this.classList.contains('active');
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        toggleHamburger(isActive);
    });

    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
            resetMobileMenu();
        }
    });

    // Debounced window resize handler
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    window.addEventListener('resize', debounce(() => {
        if (window.innerWidth > 768) {
            resetMobileMenu();
        }
    }, 250));

    // Product data
    const products = [
        {
            id: 1,
            name: "Paket LUT Sinema Pro",
            description: "Tampilan sinematik profesional untuk produksi kelas atas",
            price: "GRATIS",
            category: "cinema",
            image: "cine.jpg"
        },
        {
            id: 2,
            name: "LUT Siaran Esensial",
            description: "Paket LUT siap siaran standar",
            price: "GRATIS",
            category: "broadcast",
            image: "tone.jpg"
        },
        {
            id: 3,
            name: "S-Log3 ke Rec.709",
            description: "LUT teknis untuk konversi S-Log3",
            price: "GRATIS",
            category: "slog",
            image: "slog3.jpg"
        },
        {
            id: 4,
            name: "Paket Emulasi Film",
            description: "LUT emulasi stok film klasik",
            price: "GRATIS",
            category: "cinema",
            image: "apaini.jpg"
        },
        {
            id: 5,
            name: "Paket Produksi Langsung",
            description: "LUT waktu-nyata untuk siaran langsung",
            price: "GRATIS",
            category: "broadcast",
            image: "live.jpg"
        },
        {
            id: 6,
            name: "Paket Kreatif S-Log2",
            description: "Tampilan kreatif untuk footage S-Log2",
            price: "GRATIS",
            category: "slog",
            image: "slog2.jpg"
        }
    ];

    // Product card creation and display
    const createProductCard = (product) => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">${product.price}</div>
                <a href="https://drive.google.com/file/d/1H613ZJsKk9AtRBxdRThWneXtkiyD-tbf/view?usp=drive_link" class="product-button">DOWNLOAD</a>
            </div>
        </div>
    `;

    const animateCards = () => {
        const cards = document.querySelectorAll('.product-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            requestAnimationFrame(() => {
                setTimeout(() => {
                    card.style.transition = 'all 0.3s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 50);
            });
        });
    };

    const displayProducts = (category = 'all') => {
        const filteredProducts = category === 'all' 
            ? products 
            : products.filter(product => product.category === category);
        
        productGrid.innerHTML = filteredProducts
            .map(createProductCard)
            .join('');

        animateCards();
        initializeTouchHandlers();
    };

    // Touch handlers for mobile
    const initializeTouchHandlers = () => {
        const cards = document.querySelectorAll('.product-card');
        const touchHandler = (card, scale) => {
            if (window.matchMedia('(hover: none)').matches) {
                card.style.transform = `scale(${scale})`;
            }
        };

        cards.forEach(card => {
            card.addEventListener('touchstart', () => touchHandler(card, 0.98));
            card.addEventListener('touchend', () => touchHandler(card, 1));
            card.addEventListener('touchcancel', () => touchHandler(card, 1));
        });
    };

    // Filter handlers
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            displayProducts(button.dataset.category);
        });
    });

    // Navigation active state
    const handleNavigation = () => {
        const navLinksItems = document.querySelectorAll('.nav-links a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', (e) => {
                navLinksItems.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                if (window.innerWidth <= 768) {
                    resetMobileMenu();
                }
            });
        });
    };

    // Smooth scroll
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
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
    };

    // Initialize
    handleNavigation();
    initSmoothScroll();
    displayProducts();
});