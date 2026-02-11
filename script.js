document.addEventListener('DOMContentLoaded', () => {
    // === Variables ===
    const initialView = document.getElementById('initial-view');
    const successView = document.getElementById('success-view');
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    const body = document.body;

    // === No Button Logic ===
    noBtn.addEventListener('click', () => {
        // Disappear the No button
        noBtn.style.opacity = '0';
        noBtn.style.pointerEvents = 'none';
        
        // Make the Yes button bigger and more prominent
        yesBtn.style.transform = 'scale(1.4)';
        yesBtn.innerText = "S'il te plaît ? ❤️";
        
        // Wait and change back text if user delays
        setTimeout(() => {
            if (successView.classList.contains('hidden')) {
                 yesBtn.innerText = "Oui ❤️";
            }
        }, 3000);
    });

    // === Yes Button Logic ===
    yesBtn.addEventListener('click', () => {
        // Hide initial view
        initialView.classList.add('hidden');
        
        // Show success view with animation
        successView.classList.remove('hidden');
        successView.style.opacity = 0;
        successView.style.display = 'block';
        
        // Fade in
        let op = 0;
        const fadeInterval = setInterval(() => {
            if (op >= 1) {
                clearInterval(fadeInterval);
            }
            successView.style.opacity = op;
            op += 0.05;
        }, 30);
        
        // Launch confetti!
        createConfetti();
    });

    // === Floating Hearts Animation ===
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart-bg');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 2 + 's'; // 2-5s
        heart.style.opacity = Math.random();
        body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000); // Clean up
    }
    
    setInterval(createHeart, 500);

    // === Confetti Effect ===
    function createConfetti() {
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + 'vw'; /* Random X position */
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`; /* Random color */
            confetti.style.animationDuration = (Math.random() * 3) + 2 + "s";
            
            body.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }
});
