const wrapper = document.getElementById('envelopeWrapper');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const btnGroup = document.getElementById('btnGroup');
const headline = document.getElementById('headline');
const subtext = document.getElementById('subtext');

let rejectionCount = 0;
const guiltPhrases = [
    "Are you completely sure? 🥺",
    "Think about it again! 💔",
    "But I bought chocolates! 🍫",
    "Pretty please? 🎀",
    "Error: Wrong choice detected! 👀"
];

// 1. Click envelope to open it
wrapper.addEventListener('click', function(e) {
    // Prevent opening toggle if interactive elements inside the letter are clicked
    if (e.target.closest('#interactiveContent')) return;
    
    if (!wrapper.classList.contains('open')) {
        wrapper.classList.add('open');
    }
});

// 2. Playful dodging logic for the "No" button
function dodgeNoButton() {
    const groupRect = btnGroup.getBoundingClientRect();
    const noRect = noBtn.getBoundingClientRect();

    // Establish limits keeping the button inside the visible layout of the letter card
    const maxX = groupRect.width - noRect.width;
    const maxY = 120; // safe vertical boundary within the extended card

    // Random position generation
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY) - 40; // Allow slight offset upward

    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;

    // Change copy text to trigger dynamic emotional responses
    if (rejectionCount < guiltPhrases.length) {
        headline.innerText = guiltPhrases[rejectionCount];
        rejectionCount++;
    }
}

noBtn.addEventListener('mouseover', dodgeNoButton);
noBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dodgeNoButton();
});

// 3. Success Celebration State
yesBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Avoid triggering envelope click events
    
    headline.innerHTML = "Yay! You made me the happiest person! 💖🎉";
    subtext.innerText = "Mark your calendar, it's an official date! I promise it will be unforgettable.";
    btnGroup.style.display = 'none';

    // Fire explosion effects
    celebrate();
});

// 4. Generate visual celebration bursts
function celebrate() {
    const emojis = ['❤️', '💖', '✨', '🌸', '🥰', '💕'];
    for (let i = 0; i < 75; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        p.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Position particle near the center of the viewport
        p.style.left = '50vw';
        p.style.top = '40vh';
        p.style.fontSize = Math.random() * 20 + 16 + 'px';

        // Random target trajectory variables for CSS mapping
        const xTrajectory = (Math.random() - 0.5) * 600;
        const yTrajectory = (Math.random() - 0.5) * 600;
        p.style.setProperty('--x', `${xTrajectory}px`);
        p.style.setProperty('--y', `${yTrajectory}px`);
        
        p.style.animationDuration = Math.random() * 1.5 + 1.5 + 's';

        document.body.appendChild(p);

        // Housekeeping: remove elements from DOM tree after completion
        setTimeout(() => p.remove(), 3000);
    }
}
