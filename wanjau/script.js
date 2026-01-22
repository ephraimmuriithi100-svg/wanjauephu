document.addEventListener('DOMContentLoaded', () => {
    // Buttons and Inputs
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const continueBtn = document.getElementById('continue-btn');
    const nameInput = document.getElementById('name-input');
    // Screens
    const landingScreen = document.getElementById('landing-screen');
    const nameScreen = document.getElementById('name-screen');
    const finalScreen = document.getElementById('final-screen');
    // Text Elements
    const finalMessage = document.getElementById('final-message');
    // Runaway "NO" Button Logic
    const moveNoButton = () => {
        const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - 20); // -20 padding
        const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - 20);
        
        noBtn.style.position = 'fixed'; // Change to fixed to allow free movement over the whole screen
        noBtn.style.left = `${x}px`;
        noBtn.style.top = `${y}px`;
    };
    noBtn.addEventListener('mouseover', moveNoButton);
    noBtn.addEventListener('click', moveNoButton); // Just in case they manage to click it
    noBtn.addEventListener('touchstart', (e) => { e.preventDefault(); moveNoButton(); }); // Mobile support
    // Navigation Logic
    yesBtn.addEventListener('click', () => {
        switchScreen(landingScreen, nameScreen);
    });
    continueBtn.addEventListener('click', () => {
        const name = nameInput.value.trim();
        if (name) {
            finalMessage.innerText = `So you managed to reach here, ${name} 💕🥹`;
            switchScreen(nameScreen, finalScreen);
            createConfetti(); // Optional extra fun
        } else {
            // Shake animation for input if empty
            nameInput.style.animation = "bounce 0.5s";
            setTimeout(() => nameInput.style.animation = "none", 500);
            nameInput.placeholder = "Please tell me your name! 🥺";
        }
    });
    
    // Helper to switch screens
    function switchScreen(from, to) {
        from.classList.remove('active');
        from.classList.add('hidden');
        setTimeout(() => {
            to.classList.remove('hidden');
            to.classList.add('active');
        }, 300); // Small delay for exit animation
    }
    // Optional: Extra floating hearts for background
    function createConfetti() {
        for (let i = 0; i < 50; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '💖';
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '-10vh';
            heart.style.fontSize = Math.random() * 20 + 20 + 'px';
            heart.style.animation = `float ${Math.random() * 3 + 2}s linear`;
            heart.style.zIndex = '1000';
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 5000);
        }
    }
});