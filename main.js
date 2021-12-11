import { Game } from './modules/game.mjs';
import { Canvas } from './modules/canvas.mjs';
import { Player } from './modules/player.mjs';
import { Rectangle } from './modules/Rectangle.mjs';
import { KeyboardInput } from './modules/keyboard-input.mjs';
import { Platform } from './modules/platform.mjs';
import { Level } from './modules/level.mjs';
import { Spawn } from './modules/spawn.mjs';
import { Goal } from './modules/goal.mjs';

const GAME = new Game(new Canvas(document.getElementById('canvas')));

let testLevel = new Level();

let players = [new Player('../assets/player/player.png'), new Player('../assets/player/player.png')];

GAME.addInput(new KeyboardInput(players[0]));
GAME.addInput(new KeyboardInput(players[1], { left: 'arrowleft', right: 'arrowright', up: 'arrowup' }));

GAME.addPlayer(players[0]);
GAME.addPlayer(players[1]);

testLevel.addObject(new Rectangle('../assets/player/player.png', { x: 0, y: 50 }, { w: 200, h: 1 }));
//testLevel.addObject(new Rectangle('../assets/player/player.png', { x: -20, y: -10 }, { w: 50, h: 1 }));
testLevel.addObject(new Rectangle('../assets/player/player.png', { x: 50, y: 35 }, { w: 10, h: 70 }));

testLevel.addObject(new Platform('../assets/player/player.png', [{ x: 0, y: 100 }, { x: 0, y: 0 }], { w: 50, h: 50 }, 3));
//testLevel.addObject(new Platform('../assets/player/player.png', [{ x: 0, y: 50 }, { x: -100, y: 50 }], { w: 50, h: 50 }, 3));

testLevel.addSpawn(new Spawn(players[0]));
testLevel.addSpawn(new Spawn(players[1], { x: 0, y: 20 }));

testLevel.addGoal(new Goal('../assets/player/player.png', { x: -100, y: 0 }, players[0]));
testLevel.addGoal(new Goal('../assets/player/player.png', { x: -100, y: 100 }));

GAME.addLevel(testLevel);
GAME.nextLevel();

loop();

function loop() {
    GAME.update();
    window.requestAnimationFrame(loop);
}