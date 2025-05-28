let menuOverlayButton = document.querySelector('.button-menu-overlay');
let menuOverlay = document.querySelector('.menu-overlay');

menuOverlayButton.addEventListener('click', () => {
    menuOverlay.classList.toggle('hidden');
    menuOverlayButton.classList.toggle('toggled');
});