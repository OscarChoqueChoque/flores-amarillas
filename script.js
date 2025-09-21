
                                let cardState = 0;
const card = document.getElementById('card');
const hintText = document.getElementById('hint-text');
const particlesContainer = document.getElementById('particles-container');

function createClickParticles(e) {
    const x = e.clientX;
    const y = e.clientY;

    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';

        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;

        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 50 + 50;

        const targetX = Math.cos(angle) * distance;
        const targetY = Math.sin(angle) * distance;

        requestAnimationFrame(() => {
            sparkle.style.transform = `translate(${targetX}px, ${targetY}px) scale(0)`;
            sparkle.style.opacity = '0';
        });

        particlesContainer.appendChild(sparkle);
        setTimeout(() => {
            sparkle.remove();
        }, 800);
    }
}

window.animateCard = function (event) {

    if (event.target.tagName === 'A' || event.target.tagName === 'BUTTON') {
        return;
    }

    createClickParticles(event);

    if (cardState === 2) {
        card.classList.add('is-closing');
    }

    cardState = (cardState + 1) % 3;
    card.classList.remove('leaf-opened', 'flipped-over');

    switch (cardState) {
        case 0:
            hintText.textContent = 'Toca para abrir 🌻';

            setTimeout(() => {
                card.classList.remove('is-closing');
            }, 1200);
            break;
        case 1:
            card.classList.add('leaf-opened');
            hintText.textContent = 'Toca para leer más 💛';
            break;
        case 2:
            card.classList.add('flipped-over');
            hintText.textContent = 'Toca para cerrar ☀️';
            break;
    }
}

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.animationDuration = (Math.random() * 8 + 10) + 's';
    particle.style.animationDelay = (Math.random() * 2) + 's';
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particlesContainer.appendChild(particle);

    setTimeout(() => { particle.remove(); }, 18000);
}

setInterval(createParticle, 350);


document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    const moveX = (clientX / innerWidth - 0.5) * 2;
    const moveY = (clientY / innerHeight - 0.5) * 2;

    particlesContainer.style.transform = `translate(${moveX * -15}px, ${moveY * -15}px)`;
});
                            