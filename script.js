document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize Lucide Icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    /* -------------------------------------------------------------
       STICKY NAVBAR & MOBILE MENU
       ------------------------------------------------------------- */
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const links = document.querySelectorAll('.nav-link');
    const menuIcon = menuToggle.querySelector('.menu-icon');
    const closeIcon = menuToggle.querySelector('.close-icon');

    // Sticky Navbar on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        highlightActiveSection();
    });

    // Mobile Menu Toggle
    menuToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        if (isOpen) {
            menuIcon.style.display = 'none';
            closeIcon.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Lock scrolling when menu is open
        } else {
            menuIcon.style.display = 'block';
            closeIcon.style.display = 'none';
            document.body.style.overflow = ''; // Unlock scrolling
        }
    });

    // Close Menu on Link Click
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            menuIcon.style.display = 'block';
            closeIcon.style.display = 'none';
            document.body.style.overflow = '';
        });
    });

    // Highlight Active Link in Navbar based on current scroll position
    const sections = document.querySelectorAll('section');
    function highlightActiveSection() {
        let scrollPosition = window.scrollY + 120; // Offset for navbar height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                links.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    /* -------------------------------------------------------------
       TYPING EFFECT
       ------------------------------------------------------------- */
    const typingText = document.getElementById('typing-text');
    const roles = [
        "Full-Stack Developer",
        "Computer Science Student",
        "AI Agent Explorer",
        "Web3 DApp Engineer"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deleting is faster
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120; // Normal typing speed
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at full word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Brief pause before typing next word
        }

        setTimeout(typeEffect, typingSpeed);
    }
    
    // Start typing loop
    if (typingText) {
        setTimeout(typeEffect, 1000);
    }

    /* -------------------------------------------------------------
       INTERACTIVE CANVAS PARTICLES
       ------------------------------------------------------------- */
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null, radius: 120 };

        // Adjust Canvas Size
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        }

        // Mouse Tracker
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });

        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        // Particle Class
        class Particle {
            constructor(x, y, dx, dy, size, color) {
                this.x = x;
                this.y = y;
                this.dx = dx;
                this.dy = dy;
                this.size = size;
                this.color = color;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                // Bounce off edges
                if (this.x + this.size > canvas.width || this.x - this.size < 0) {
                    this.dx = -this.dx;
                }
                if (this.y + this.size > canvas.height || this.y - this.size < 0) {
                    this.dy = -this.dy;
                }

                this.x += this.dx;
                this.y += this.dy;

                // Mouse interaction
                if (mouse.x && mouse.y) {
                    let distanceX = mouse.x - this.x;
                    let distanceY = mouse.y - this.y;
                    let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
                    
                    if (distance < mouse.radius) {
                        if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                            this.x += 1.5;
                        }
                        if (mouse.x > this.x && this.x > this.size * 10) {
                            this.x -= 1.5;
                        }
                        if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                            this.y += 1.5;
                        }
                        if (mouse.y > this.y && this.y > this.size * 10) {
                            this.y -= 1.5;
                        }
                    }
                }

                this.draw();
            }
        }

        // Initialize Particle Cloud
        function initParticles() {
            particles = [];
            let numberOfParticles = Math.floor((canvas.width * canvas.height) / 16000);
            // Cap particles to prevent performance drag
            numberOfParticles = Math.min(numberOfParticles, 120);

            for (let i = 0; i < numberOfParticles; i++) {
                let size = Math.random() * 2 + 1;
                let x = Math.random() * (canvas.width - size * 2) + size;
                let y = Math.random() * (canvas.height - size * 2) + size;
                let dx = (Math.random() - 0.5) * 0.6;
                let dy = (Math.random() - 0.5) * 0.6;
                
                // Tech theme colors: Electric Blue, Cyan, Purple
                let colors = [
                    'rgba(0, 210, 255, 0.4)', 
                    'rgba(121, 40, 202, 0.4)', 
                    'rgba(0, 245, 255, 0.3)'
                ];
                let color = colors[Math.floor(Math.random() * colors.length)];

                particles.push(new Particle(x, y, dx, dy, size, color));
            }
        }

        // Draw connections between nearby nodes
        function connectParticles() {
            let maxDistance = 140;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let distance = Math.sqrt(
                        (particles[a].x - particles[b].x) ** 2 + 
                        (particles[a].y - particles[b].y) ** 2
                    );

                    if (distance < maxDistance) {
                        let opacity = 1 - (distance / maxDistance);
                        // Faint gradient connection between particles
                        ctx.strokeStyle = `rgba(0, 210, 255, ${opacity * 0.12})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        // Animation Loop
        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
            });
            connectParticles();
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        animate();
    }

    /* -------------------------------------------------------------
       SKILLS GRID FILTERING SYSTEM
       ------------------------------------------------------------- */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active to selected button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hidden');
                    // Simple animation reset
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    /* -------------------------------------------------------------
       SCROLL-REVEAL OBSERVER
       ------------------------------------------------------------- */
    const revealItems = document.querySelectorAll('.reveal-item');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Stop observing once revealed to improve scroll performance
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
        });

        revealItems.forEach(item => {
            revealObserver.observe(item);
        });
    } else {
        // Fallback for older browsers
        revealItems.forEach(item => item.classList.add('revealed'));
    }

    /* -------------------------------------------------------------
       EMAIL COPY-TO-CLIPBOARD WITH TOASTS
       ------------------------------------------------------------- */
    const copyEmailBtn = document.getElementById('btn-copy-email');
    const emailAddress = document.getElementById('email-address');
    const toastContainer = document.getElementById('toast-container');

    function copyToClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(text);
        } else {
            return new Promise((resolve, reject) => {
                try {
                    const textArea = document.createElement('textarea');
                    textArea.value = text;
                    textArea.style.position = 'fixed';
                    textArea.style.top = '0';
                    textArea.style.left = '0';
                    textArea.style.opacity = '0';
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    const successful = document.execCommand('copy');
                    document.body.removeChild(textArea);
                    if (successful) {
                        resolve();
                    } else {
                        reject(new Error('Fallback copy failed'));
                    }
                } catch (err) {
                    reject(err);
                }
            });
        }
    }

    if (copyEmailBtn && emailAddress && toastContainer) {
        copyEmailBtn.addEventListener('click', () => {
            const emailText = emailAddress.textContent.trim();
            
            copyToClipboard(emailText)
                .then(() => {
                    // Update button UI feedback
                    const copyTextEl = copyEmailBtn.querySelector('.copy-text');
                    const copyIconEl = copyEmailBtn.querySelector('.copy-icon');
                    
                    if (copyTextEl) copyTextEl.textContent = 'Copied!';
                    if (copyIconEl && window.lucide) {
                        copyIconEl.setAttribute('data-lucide', 'check');
                        window.lucide.createIcons();
                    }

                    // Show success toast
                    showToast('Email address copied to clipboard!');

                    // Reset button after 2.5 seconds
                    setTimeout(() => {
                        if (copyTextEl) copyTextEl.textContent = 'Copy';
                        if (copyIconEl && window.lucide) {
                            copyIconEl.setAttribute('data-lucide', 'copy');
                            window.lucide.createIcons();
                        }
                    }, 2500);
                })
                .catch(err => {
                    console.error('Failed to copy email: ', err);
                    showToast('Failed to copy email. Please copy manually.');
                });
        });
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        
        // Add dynamic lucide check icon inside toast
        toast.innerHTML = `
            <i data-lucide="check-circle" class="toast-success-icon"></i>
            <span>${message}</span>
        `;
        
        toastContainer.appendChild(toast);
        
        if (window.lucide) {
            window.lucide.createIcons();
        }

        // Auto remove toast from DOM after animations complete (3 seconds)
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
});
