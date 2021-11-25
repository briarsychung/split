import { Game } from './modules/game.mjs';

const DPR = window.devicePixelRatio;

const CANVAS = document.createElement('canvas');
document.body.appendChild(CANVAS);
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const GAME = new Game(CANVAS);
loop();

function resizeCanvas() {
    let width = window.innerWidth;
    let height = window.innerHeight;

    CANVAS.style.width = width + 'px';
    CANVAS.style.height = height + 'px';
    CANVAS.width = Math.floor(width * DPR);
    CANVAS.height = Math.floor(height * DPR);
    CANVAS.getContext('2d').imageSmoothingEnabled = false;
    CANVAS.getContext('2d').scale(DPR, DPR);
}

function loop() {
    GAME.iter();
    window.requestAnimationFrame(loop);
}