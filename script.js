document.addEventListener('DOMContentLoaded', () => {
    // === SLIDESHOW LOGIC ===
    const slides = document.querySelectorAll('#slideshow-bg img');
    let currentSlide = 0;

    if (slides.length > 1) {
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 4000); // Change every 4 seconds
    }

    // === ELEMENTS ===
    const initialView = document.getElementById('initial-view');
    const successView = document.getElementById('success-view');
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');

    // === NO BUTTON ===
    noBtn.addEventListener('click', () => {
        noBtn.style.opacity = '0';
        noBtn.style.pointerEvents = 'none';
        setTimeout(() => { noBtn.style.display = 'none'; }, 300);

        yesBtn.style.transform = 'scale(1.4)';
        yesBtn.innerText = "S'il te plaît ? ❤️";

        setTimeout(() => {
            if (successView.classList.contains('hidden')) {
                yesBtn.innerText = "Oui ❤️";
            }
        }, 3000);
    });

    // === YES BUTTON ===
    yesBtn.addEventListener('click', () => {
        initialView.classList.add('hidden');
        successView.classList.remove('hidden');
        createConfetti();
    });

    // === FLOATING HEARTS ===
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart-bg');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 6000);
    }
    setInterval(createHeart, 600);

    // === CONFETTI ===
    function createConfetti() {
        for (let i = 0; i < 80; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 60%)`;
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 5000);
        }
    }
});
