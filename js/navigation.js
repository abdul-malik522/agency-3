// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', function () {

    // Smooth scroll to sections
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Only handle internal links
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();

                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const navHeight = document.querySelector('.nav')?.offsetHeight || 80;
                    const targetPosition = targetElement.offsetTop - navHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    const navButton = document.querySelector('.w-nav-button');
                    if (navButton && navButton.classList.contains('w--open')) {
                        navButton.click();
                    }
                }
            }
        });
    });

    // Sticky navigation on scroll
    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    if (nav) {
        window.addEventListener('scroll', function () {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                nav.classList.add('is-sticky');
            } else {
                nav.classList.remove('is-sticky');
            }

            lastScroll = currentScroll;
        });
    }

    // Enhanced dropdown behavior
    const dropdowns = document.querySelectorAll('.w-dropdown');

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.w-dropdown-toggle');
        const list = dropdown.querySelector('.w-dropdown-list');

        if (toggle && list) {
            // Desktop hover behavior
            if (window.innerWidth > 991) {
                dropdown.addEventListener('mouseenter', function () {
                    dropdown.classList.add('w--open');
                });

                dropdown.addEventListener('mouseleave', function () {
                    dropdown.classList.remove('w--open');
                });
            }

            // Click behavior for mobile
            toggle.addEventListener('click', function (e) {
                if (window.innerWidth <= 991) {
                    e.preventDefault();
                    dropdown.classList.toggle('w--open');
                }
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.w-dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('w--open');
            });
        }
    });

    // Add animation classes on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Mobile menu toggle animation
    const mobileMenuButton = document.querySelector('.nav_mobile-menu-button');
    const navMenu = document.querySelector('.nav_menu');

    if (mobileMenuButton && navMenu) {
        mobileMenuButton.addEventListener('click', function () {
            this.classList.toggle('w--open');
            navMenu.classList.toggle('w--open');
        });
    }

    // Prevent body scroll when mobile menu is open
    const navButton = document.querySelector('.w-nav-button');
    if (navButton) {
        navButton.addEventListener('click', function () {
            if (this.classList.contains('w--open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Add active state to current section in nav
    window.addEventListener('scroll', function () {
        const sections = document.querySelectorAll('section[id]');
        const navHeight = document.querySelector('.nav')?.offsetHeight || 80;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const scrollPosition = window.pageYOffset;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const id = section.getAttribute('id');
                const activeLink = document.querySelector(`a[href="#${id}"]`);

                // Remove active class from all links
                document.querySelectorAll('.nav_link').forEach(link => {
                    link.classList.remove('active');
                });

                // Add active class to current link
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    });

});
