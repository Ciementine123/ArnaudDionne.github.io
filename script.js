document.addEventListener('DOMContentLoaded', () => {
    // === Background Slideshow Logic ===
    const mosaicContainer = document.getElementById('mosaic-background');
    if (mosaicContainer) {
        const images = [];
        let activeIndex = 0;

        // Helper to add image
        const addImage = (src) => {
            const img = document.createElement('img');
            img.src = src;
            // Don't error out, just remove if fails
            img.onerror = () => { img.remove(); removeImageFromArray(img); };
            img.onload = () => {
                // First image loaded becomes active
                if (images.length === 1) img.classList.add('active');
            };
            mosaicContainer.appendChild(img);
            images.push(img);
        };

        const removeImageFromArray = (imgToRemove) => {
            const index = images.indexOf(imgToRemove);
            if (index > -1) {
                images.splice(index, 1);
            }
        };

        // Try load photo1 to photo50
        for (let i = 1; i <= 50; i++) {
            addImage(`images/photo${i}.jpg`);
        }

        // Cycle images
        setInterval(() => {
            if (images.length > 1) {
                // Remove active from current
                images[activeIndex].classList.remove('active');

                // Next index
                activeIndex = (activeIndex + 1) % images.length;

                // Add active to next
                images[activeIndex].classList.add('active');
            }
        }, 3500); // 3.5 seconds per photo
    }

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
        successView.style.display = 'block';
        successView.style.opacity = '1';

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
