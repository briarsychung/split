import { Game } from './modules/game.mjs';
import { Player } from './modules/player.mjs';
import { Rectangle } from './modules/Rectangle.mjs';
import { KeyboardInput } from './modules/keyboard-input.mjs';

const DPR = window.devicePixelRatio;

const CANVAS = document.getElementById('canvas');
document.body.appendChild(CANVAS);
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const GAME = new Game(CANVAS);

let P1 = new Player('../assets/player/player.png');

GAME.input = new KeyboardInput(P1);

GAME.addPlayer(P1);
GAME.addPlayer(new Player('../assets/player/player.png', { x: 30, y: 0 }));

GAME.addObject(new Rectangle('../assets/player/player.png', { x: 0, y: 50 }, { w: 200, h: 1 }));
GAME.addObject(new Rectangle('../assets/player/player.png', { x: -20, y: -10 }, { w: 50, h: 1 }));
GAME.addObject(new Rectangle('../assets/player/player.png', { x: 50, y: 35 }, { w: 10, h: 70 }));

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