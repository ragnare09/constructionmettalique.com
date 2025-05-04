document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links ul');

    mobileMenuBtn.addEventListener('click', function() {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });

    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;

    // Create dots
    slides.forEach((slide, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dots .dot');

    function goToSlide(slideIndex) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        currentSlide = (slideIndex + slides.length) % slides.length;

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Auto slide change
    let slideInterval = setInterval(nextSlide, 5000);

    // Pause on hover
    const heroSlider = document.querySelector('.hero-slider');
    heroSlider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    heroSlider.addEventListener('mouseleave', () => slideInterval = setInterval(nextSlide, 5000));

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const testimonialDotsContainer = document.querySelector('.testimonial-dots');
    let currentTestimonial = 0;

    // Create testimonial dots
    testimonials.forEach((testimonial, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToTestimonial(index));
        testimonialDotsContainer.appendChild(dot);
    });

    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');

    function goToTestimonial(testimonialIndex) {
        testimonials[currentTestimonial].classList.remove('active');
        testimonialDots[currentTestimonial].classList.remove('active');

        currentTestimonial = (testimonialIndex + testimonials.length) % testimonials.length;

        testimonials[currentTestimonial].classList.add('active');
        testimonialDots[currentTestimonial].classList.add('active');
    }

    // Auto testimonial change
    setInterval(() => {
        goToTestimonial(currentTestimonial + 1);
    }, 7000);

    // Countdown Timer
    function updateCountdown() {
        const now = new Date();
        const weekend = new Date();

        // Set to next Saturday at 00:00:00
        weekend.setDate(now.getDate() + (6 - now.getDay()));
        weekend.setHours(0, 0, 0, 0);

        const diff = weekend - now;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.querySelector('.days').textContent = days.toString().padStart(2, '0');
        document.querySelector('.hours').textContent = hours.toString().padStart(2, '0');
        document.querySelector('.minutes').textContent = minutes.toString().padStart(2, '0');
        document.querySelector('.seconds').textContent = seconds.toString().padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Product Data
    const products = [{
            id: 1,
            name: "Organic Apples",
            price: 2.99,
            oldPrice: 3.49,
            image: "https://via.placeholder.com/300x200?text=Organic+Apples",
            rating: 4,
            badge: "Sale"
        },
        {
            id: 2,
            name: "Fresh Milk",
            price: 1.99,
            oldPrice: null,
            image: "https://via.placeholder.com/300x200?text=Fresh+Milk",
            rating: 5,
            badge: null
        },
        {
            id: 3,
            name: "Whole Grain Bread",
            price: 3.49,
            oldPrice: 3.99,
            image: "https://via.placeholder.com/300x200?text=Whole+Grain+Bread",
            rating: 4,
            badge: "New"
        },
        {
            id: 4,
            name: "Free Range Eggs",
            price: 4.99,
            oldPrice: null,
            image: "https://via.placeholder.com/300x200?text=Free+Range+Eggs",
            rating: 5,
            badge: null
        },
        {
            id: 5,
            name: "Organic Tomatoes",
            price: 3.29,
            oldPrice: 3.79,
            image: "https://via.placeholder.com/300x200?text=Organic+Tomatoes",
            rating: 4,
            badge: "Sale"
        },
        {
            id: 6,
            name: "Greek Yogurt",
            price: 2.49,
            oldPrice: null,
            image: "https://via.placeholder.com/300x200?text=Greek+Yogurt",
            rating: 4,
            badge: null
        },
        {
            id: 7,
            name: "Avocados",
            price: 1.99,
            oldPrice: 2.49,
            image: "https://via.placeholder.com/300x200?text=Avocados",
            rating: 5,
            badge: "Popular"
        },
        {
            id: 8,
            name: "Almond Milk",
            price: 3.99,
            oldPrice: null,
            image: "https://via.placeholder.com/300x200?text=Almond+Milk",
            rating: 4,
            badge: null
        }
    ];

    // Render Products
    const productGrid = document.querySelector('.product-grid');

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        let badgeHTML = '';
        if (product.badge) {
            badgeHTML = `<div class="product-badge">${product.badge}</div>`;
        }

        let oldPriceHTML = '';
        if (product.oldPrice) {
            oldPriceHTML = `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>`;
        }

        let ratingHTML = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= product.rating) {
                ratingHTML += '<i class="fas fa-star"></i>';
            } else {
                ratingHTML += '<i class="far fa-star"></i>';
            }
        }

        productCard.innerHTML = `
            <div class="product-image">
                ${badgeHTML}
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${oldPriceHTML}
                </div>
                <div class="product-rating">
                    ${ratingHTML}
                </div>
                <div class="product-actions">
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                    <button class="add-to-wishlist"><i class="far fa-heart"></i></button>
                </div>
            </div>
        `;

        productGrid.appendChild(productCard);
    });

    // Cart Functionality
    let cartCount = 0;
    const cartCountElement = document.querySelector('.cart-count');

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            addToCart(productId);
        });
    });

    function addToCart(productId) {
        cartCount++;
        cartCountElement.textContent = cartCount;

        // Add animation
        cartCountElement.classList.add('pulse');
        setTimeout(() => {
            cartCountElement.classList.remove('pulse');
        }, 300);

        // In a real app, you would add the product to a cart array
        console.log(`Product ${productId} added to cart`);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Responsive adjustments
    function handleResize() {
        if (window.innerWidth > 992) {
            navLinks.style.display = 'flex';
        } else {
            navLinks.style.display = 'none';
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize();
});