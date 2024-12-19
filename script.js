document.addEventListener('DOMContentLoaded', () => {
    const trail = document.getElementById('mouse-trail');
    const maxTrails = 20;
    let hue = 0;

    document.addEventListener('mousemove', (e) => {
        hue = (hue + 1) % 360;

        const dot = document.createElement('div');
        dot.classList.add('trail-dot');
        
        dot.style.left = `${e.clientX}px`;
        dot.style.top = `${e.clientY}px`;
        
        dot.style.background = `radial-gradient(circle, 
            hsla(${hue}, 100%, 50%, 0.7) 0%, 
            hsla(${hue}, 100%, 50%, 0) 70%)`;
        
        const size = Math.random() * 10 + 5;
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        dot.style.position = 'fixed';
        dot.style.borderRadius = '50%';
        dot.style.pointerEvents = 'none';
        dot.style.zIndex = '9999';
        dot.style.transform = 'translate(-50%, -50%)';

        trail.appendChild(dot);

        if (trail.children.length > maxTrails) {
            trail.removeChild(trail.firstChild);
        }

        setTimeout(() => {
            dot.style.opacity = '0';
            dot.style.transform = 'translate(-50%, -50%) scale(2)';
        }, 100);

        setTimeout(() => {
            dot.remove();
        }, 500);
    });

    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const downloadButtons = document.querySelectorAll('.download-buttons a');
    downloadButtons.forEach(button => {
        button.addEventListener('mouseenter', (e) => {
            button.style.transform = 'translateY(-3px)';
            button.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        });

        button.addEventListener('mouseleave', (e) => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = 'none';
        });
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const sectionsToAnimate = document.querySelectorAll('section');
    sectionsToAnimate.forEach(section => {
        fadeInObserver.observe(section);
    });
});