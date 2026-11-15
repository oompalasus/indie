const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 25; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const size = Math.random() * 5 + 3;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${Math.random() * 6 + 6}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    particlesContainer.appendChild(particle);
}

const targetDate = new Date('2026-11-16T00:00:00+08:00');

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const giftBox = document.getElementById('giftBox');
const toastContainer = document.getElementById('toastContainer');
const modalBackdrop = document.getElementById('modalBackdrop');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');

let tapCount = 0;
let toastTimeout = null;

function updateCountdown() {
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        document.getElementById('statusText').textContent = "The big day is here! Tap the gift box! 🎉";
        return true;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
    return false;
}

setInterval(updateCountdown, 1000);
updateCountdown();

function triggerMassiveConfetti() {
    if (typeof confetti !== 'function') return;
    confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 }, colors: ['#ec4899', '#f472b6', '#f59e0b', '#ffffff', '#db2777', '#facc15'] });
}

giftBox.addEventListener('click', () => {
    const isExpired = new Date() >= targetDate;

    if (!isExpired) {
        giftBox.classList.remove('shake');
        void giftBox.offsetWidth;
        giftBox.classList.add('shake');
        toastContainer.classList.add('show');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => toastContainer.classList.remove('show'), 2500);
        return;
    }

    tapCount++;
    if (tapCount === 1) {
        giftBox.classList.add('tap-1');
    } else if (tapCount === 2) {
        giftBox.classList.add('tap-2');
        setTimeout(() => {
            triggerMassiveConfetti();
            modalBackdrop.classList.add('active');
        }, 400);
    }
});

yesBtn.addEventListener('click', () => {
    modalBackdrop.classList.remove('active');
    window.location.href = 'parcel2.html';
});

noBtn.addEventListener('mouseenter', () => {
    if (window.matchMedia('(hover: hover)').matches) {
        moveNoButtonWide();
    }
});

noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButtonWide();
    yesBtn.classList.add('highlight');
});

function moveNoButtonWide() {
    const randomX = (Math.random() - 0.5) * 320; 
    const randomY = (Math.random() - 0.5) * 200; 
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
}
