// Navegación móvil
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú móvil al hacer clic en un enlace
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navegación suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Ajuste para la navbar fija
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Efecto de scroll en la navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animaciones de entrada con Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animaciones a elementos
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .platform-card, .stat, .contact-form, .about-text, .about-image');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Efecto parallax en el hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Animación de las barras del visualizador de música
function animateMusicBars() {
    const bars = document.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        const randomHeight = Math.random() * 100 + 20;
        bar.style.height = `${randomHeight}px`;
    });
}

// Iniciar animación de barras
setInterval(animateMusicBars, 200);

// Reproductor de música para proyectos
let currentAudio = null;
let currentPlayButton = null;

document.querySelectorAll('.project-card').forEach(card => {
    const playButton = card.querySelector('.play-button');
    const audio = card.querySelector('.project-audio');
    const icon = playButton.querySelector('i');
    
    // Efecto hover
    card.addEventListener('mouseenter', () => {
        playButton.style.transform = 'scale(1.1)';
        playButton.style.background = 'white';
    });
    
    card.addEventListener('mouseleave', () => {
        if (currentAudio !== audio) {
            playButton.style.transform = 'scale(1)';
            playButton.style.background = 'rgba(255, 255, 255, 0.9)';
        }
    });
    
    // Control de reproducción
    playButton.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Si hay otra canción reproduciéndose, la pausamos
        if (currentAudio && currentAudio !== audio) {
            currentAudio.pause();
            currentPlayButton.querySelector('i').className = 'fas fa-play';
            currentPlayButton.style.background = 'rgba(255, 255, 255, 0.9)';
            currentPlayButton.style.transform = 'scale(1)';
        }
        
        // Reproducir o pausar la canción actual
        if (audio.paused) {
            audio.play();
            icon.className = 'fas fa-pause';
            playButton.style.background = 'white';
            playButton.style.transform = 'scale(1.1)';
            currentAudio = audio;
            currentPlayButton = playButton;
        } else {
            audio.pause();
            icon.className = 'fas fa-play';
            playButton.style.background = 'rgba(255, 255, 255, 0.9)';
            playButton.style.transform = 'scale(1)';
            currentAudio = null;
            currentPlayButton = null;
        }
    });
    
    // Cuando termine la canción, resetear el botón
    audio.addEventListener('ended', () => {
        icon.className = 'fas fa-play';
        playButton.style.background = 'rgba(255, 255, 255, 0.9)';
        playButton.style.transform = 'scale(1)';
        currentAudio = null;
        currentPlayButton = null;
    });
});

// Formulario de contacto
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Obtener datos del formulario
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelector('input[placeholder="Asunto del proyecto"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Validación básica
        if (!name || !email || !message) {
            showNotification('Por favor, completa todos los campos obligatorios.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Por favor, introduce un email válido.', 'error');
            return;
        }
        
        // Simular envío (aquí conectarías con tu backend)
        showNotification('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
        contactForm.reset();
    });
}

// Función para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Estilos para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Añadir al DOM
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Función para cerrar
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Efecto de escritura en el título principal
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Inicializar efecto de escritura cuando la página carga
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        // Solo aplicar si el texto no contiene HTML complejo
        if (!originalText.includes('<span')) {
            typeWriter(heroTitle, originalText, 50);
        }
    }
});

// Contador animado para las estadísticas
function animateCounters() {
    const counters = document.querySelectorAll('.stat h4');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                const suffix = counter.textContent.includes('M') ? 'M+' : 
                              counter.textContent.includes('K') ? 'K+' : '+';
                counter.textContent = Math.ceil(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = counter.textContent; // Mantener formato original
            }
        };
        
        updateCounter();
    });
}

// Activar contadores cuando la sección sea visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Efecto de partículas en el hero (opcional)
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            animation: float ${Math.random() * 10 + 10}s infinite linear;
        `;
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        
        hero.appendChild(particle);
    }
}

// Añadir CSS para animación de partículas
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Inicializar partículas
createParticles();

// Smooth scroll mejorado para navegadores que no lo soportan nativamente
if (!('scrollBehavior' in document.documentElement.style)) {
    // Polyfill para smooth scroll
    const smoothScrollPolyfill = (target, duration = 1000) => {
        const targetPosition = target.offsetTop - 80;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    };

    // Aplicar polyfill a todos los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                smoothScrollPolyfill(target);
            }
        });
    });
}

console.log('🎵 Página del productor musical cargada correctamente');
