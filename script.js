// Smooth scroll pour navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Animation au scroll
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .skill-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

//Modifications chat GPT

// script.js
const words = ["Développeur Web", "Créateur d'expériences", "Passionné de design"];
let i = 0, j = 0, currentWord = '', isDeleting = false;

function type() {
  currentWord = words[i];
  document.getElementById("typing").textContent =
    currentWord.substring(0, j) + (isDeleting ? '|' : '|');
  if (!isDeleting && j++ === currentWord.length + 2) isDeleting = true;
  else if (isDeleting && j-- === 0) {
    isDeleting = false;
    i = (i + 1) % words.length;
  }
  setTimeout(type, isDeleting ? 50 : 120);
}
type();
