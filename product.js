document.addEventListener('DOMContentLoaded', () => {
    // Add mobile menu button (hamburger)
    const nav = document.querySelector('header nav');
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    nav.appendChild(hamburger);

    // Mobile menu toggle
    const navLinks = document.querySelector('.nav-links');
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

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            const spans = hamburger.getElementsByTagName('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                const spans = hamburger.getElementsByTagName('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }, 250);
    });

    // Add touch support for product cards
    const addTouchSupport = () => {
        const cards = document.querySelectorAll('.product-card');
        cards.forEach(card => {
            card.addEventListener('touchstart', () => {
                card.style.transform = 'scale(0.98)';
            });
            card.addEventListener('touchend', () => {
                card.style.transform = 'scale(1)';
            });
        });
    };

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

    // Initialize touch support
    addTouchSupport();

    // Sample product data
    const products = [
        {
            id: 1,
            name: "Cinema LUT Package Pro",
            description: "Professional cinematic looks for high-end production",
            price: "FREE",
            category: "cinema",
            image: "cine.jpg"
        },
        {
            id: 2,
            name: "Broadcast LUT Essential",
            description: "Standard broadcast-ready LUT package",
            price: "FREE",
            category: "broadcast",
            image: "tone.jpg"
        },
        {
            id: 3,
            name: "S-Log3 to Rec.709",
            description: "Technical LUT for S-Log3 conversion",
            price: "FREE",
            category: "slog",
            image: "slog3.jpg"
        },
        {
            id: 4,
            name: "Film Emulation Pack",
            description: "Classic film stock emulation LUTs",
            price: "FREE",
            category: "cinema",
            image: "apaini.jpg"
        },
        {
            id: 5,
            name: "Live Production Suite",
            description: "Real-time LUTs for live broadcasting",
            price: "FREE",
            category: "broadcast",
            image: "live.jpg"
        },
        {
            id: 6,
            name: "S-Log2 Creative Pack",
            description: "Creative looks for S-Log2 footage",
            price: "FREE",
            category: "slog",
            image: "slog2.jpg"
        }
    ];

    const productGrid = document.getElementById('productGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Create product card
    function createProductCard(product) {
        return `
            <div class="product-card" data-category="${product.category}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="product-price">${product.price}</div>
                    <a href="#" class="product-button">Learn More</a>
                </div>
            </div>
        `;
    }

    // Display all products
    function displayProducts(category = 'all') {
        const filteredProducts = category === 'all' 
            ? products 
            : products.filter(product => product.category === category);
        
        productGrid.innerHTML = filteredProducts
            .map(product => createProductCard(product))
            .join('');

        // Reinitialize touch support after displaying new products
        addTouchSupport();
    }

    // Filter button click handlers
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter products
            const category = button.dataset.category;
            displayProducts(category);

            // Add animation to new cards
            const cards = document.querySelectorAll('.product-card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.transition = 'all 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        });
    });

    // Initialize product display
    displayProducts();

    // Add smooth scroll for navigation
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
});