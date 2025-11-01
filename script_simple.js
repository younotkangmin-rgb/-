document.addEventListener('DOMContentLoaded', () => {
    const startOverlay = document.getElementById('start-overlay');
    const startGameButton = document.getElementById('start-game-button');
    
    if (startGameButton) {
        startGameButton.addEventListener('click', () => {
            console.log('Game starting...');
            startOverlay.style.display = 'none';
        });
    }
    
    console.log('Script loaded');
});