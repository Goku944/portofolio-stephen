// ========================================
// SCRIPT.JS - Portfolio Stephen Cabrol
// ========================================

// ===== SMOOTH SCROLL NAVIGATION =====
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

// ===== ANIMATION AU SCROLL (FADE-IN) =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Ne déclenche qu'une seule fois
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Applique l'animation aux cartes projets, services et compétences
document.querySelectorAll('.project-card, .skill-category, .service-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    fadeInObserver.observe(el);
});

// ===== EFFET TYPING (MACHINE À ÉCRIRE) =====
const typingWords = [
    "Développeur Web Junior", 
    "Créateur de sites modernes", 
    "Passionné de code"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 75;

function typeEffect() {
    const typingElement = document.getElementById("typing");
    
    if (!typingElement) return; // Sécurité si l'élément n'existe pas
    
    const currentWord = typingWords[wordIndex];
    
    if (isDeleting) {
        // Mode suppression
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        // Mode écriture
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 75;
    }
    
    // Curseur clignotant
    typingElement.textContent += '|';
    
    // Logique de changement de mot
    if (!isDeleting && charIndex === currentWord.length) {
        // Mot complètement écrit, pause puis suppression
        typingSpeed = 1000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        // Mot complètement supprimé, passe au suivant
        isDeleting = false;
        wordIndex = (wordIndex + 1) % typingWords.length;
        typingSpeed = 200;
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// Lance l'effet typing au chargement
document.addEventListener('DOMContentLoaded', typeEffect);

// ===== NAVIGATION ACTIVE AU SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function highlightNavigation() {
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===== OPTIMISATION PERFORMANCE =====
// Debounce pour les événements de scroll
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        highlightNavigation();
    }, 10);
}, { passive: true });

// ===== LOG DE BIENVENUE (OPTIONNEL) =====
console.log(`
╔═══════════════════════════════════════╗
║                                       ║
║     🚀 SC WebCODE - Portfolio         ║
║     💻 Développé par Stephen Cabrol   ║
║     📧 Dev-web.cabrol@gmail.com       ║
║                                       ║
╔═══════════════════════════════════════╗
`);