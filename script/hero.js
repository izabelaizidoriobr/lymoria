// Efeito de escrita (typewriter)
const palavras = ["MARCAS", "PROPÓSITOS", "EXPERIÊNCIAS"];
let i = 0;
let j = 0;
let apagando = false;
const typedText = document.getElementById("typed-text");

function typeEffect() {
    const palavra = palavras[i];
    if (!apagando && j <= palavra.length) {
        typedText.textContent = palavra.substring(0, j++);
        setTimeout(typeEffect, 150);
    } else if (apagando && j >= 0) {
        typedText.textContent = palavra.substring(0, j--);
        setTimeout(typeEffect, 100);
    } else {
        apagando = !apagando;
        if (!apagando) i = (i + 1) % palavras.length;
        setTimeout(typeEffect, 800);
    }
}
typeEffect();

// Efeito do botão seguir o mouse dentro do slide ativo
const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.slide');

slides.forEach(slide => {
    const follower = slide.querySelector('.follower');

    slide.addEventListener('mousemove', (e) => {
        if (!slide.classList.contains('active')) return; // Só ativa no slide visível
        const rect = slide.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        follower.style.left = `${x}px`;
        follower.style.top = `${y}px`;
        follower.style.opacity = 1;
    });

    slide.addEventListener('mouseleave', () => {
        follower.style.opacity = 0;
    });
});

// Carrosel

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.hero-carousel .slide');
    const bars = document.querySelectorAll('.hero-carousel .bar');
    let current = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
            bars[i].classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        current = (current + 1) % slides.length;
        showSlide(current);
    }

    setInterval(nextSlide, 3000);
});
