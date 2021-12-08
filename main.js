import { Game } from './modules/game.mjs';
import { Canvas } from './modules/canvas.mjs';
import { Player } from './modules/player.mjs';
import { Rectangle } from './modules/Rectangle.mjs';
import { KeyboardInput } from './modules/keyboard-input.mjs';
import { Platform } from './modules/platform.mjs';
import { Level } from './modules/level.mjs';

const GAME = new Game(new Canvas(document.getElementById('canvas')));

let testLevel = new Level();

let P1 = new Player('../assets/player/player.png');

GAME.input = new KeyboardInput(P1);

GAME.addPlayer(P1);
GAME.addPlayer(new Player('../assets/player/player.png', { x: 0, y: 20 }));

testLevel.addObject(new Rectangle('../assets/player/player.png', { x: 0, y: 50 }, { w: 200, h: 1 }));
//testLevel.addObject(new Rectangle('../assets/player/player.png', { x: -20, y: -10 }, { w: 50, h: 1 }));
testLevel.addObject(new Rectangle('../assets/player/player.png', { x: 50, y: 35 }, { w: 10, h: 70 }));

testLevel.addObject(new Platform('../assets/player/player.png', [{ x: 0, y: 100 }, { x: 0, y: 0 }], { w: 50, h: 50 }, 3));
//testLevel.addObject(new Platform('../assets/player/player.png', [{ x: 0, y: 50 }, { x: -100, y: 50 }], { w: 50, h: 50 }, 3));

GAME.addLevel(testLevel);

loop();

function loop() {
    GAME.update();
    window.requestAnimationFrame(loop);
}