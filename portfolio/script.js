document.addEventListener('DOMContentLoaded', () => {
    
    const navToggle = document.querySelector('.nav-toggle');
    const header = document.querySelector('.main-header');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', () => {
        header.classList.toggle('nav-open');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            header.classList.remove('nav-open');
        });
    });


    const typewriterElement = document.querySelector('.typewriter-text');
    const roles = ["Web Developer", "IT Student", "Front-End Enthusiast"];
    let roleIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < roles[roleIndex].length) {
            typewriterElement.textContent += roles[roleIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 1500);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typewriterElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(type, 500);
        }
    }
    
    type(); 

    const scrollToTopBtn = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) { 
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    const skillItems = document.querySelectorAll('.skill-item');

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillFill = entry.target.querySelector('.skill-fill');
                const skillLevel = entry.target.getAttribute('data-skill');
                
                skillFill.style.width = `${skillLevel}%`;
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.5 
    });

    skillItems.forEach(item => {
        skillObserver.observe(item);
    });

    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            projectCards.forEach(card => {
                const cardTech = card.getAttribute('data-tech');
                
                if (filter === 'all' || cardTech.includes(filter)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    const timelineItems = document.querySelectorAll('.timeline-item');

    const timelineObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 
    });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
    
    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;

    const setTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            modeToggle.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            modeToggle.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        }
    };

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (body.classList.contains('dark-mode')) {
        setTheme('dark'); 
    } else {
        setTheme('light');
    }

    modeToggle.addEventListener('click', () => {
        const isDarkMode = body.classList.contains('dark-mode');
        setTheme(isDarkMode ? 'light' : 'dark');
    });

});