import { Game } from './modules/game.mjs';
import { Canvas } from './modules/canvas.mjs';
import { Level } from './modules/level.mjs';
import { Player } from './modules/player.mjs';
import { KeyboardInput } from './modules/keyboard-input.mjs';
import { Spawn } from './modules/spawn.mjs';
import { Rectangle } from './modules/Rectangle.mjs';
import { Platform } from './modules/platform.mjs';
import { Door } from './modules/door.mjs';
import { Portal } from './modules/portal.mjs';
import { Box } from './modules/box.mjs';
import { Goal } from './modules/goal.mjs';

const GAME = new Game(new Canvas(document.getElementById('canvas')));

let players = [new Player('../assets/player/player.png'), new Player('../assets/player/player.png')];

GAME.addPlayer(players[0]);
GAME.addPlayer(players[1]);

GAME.addInput(new KeyboardInput(players[0]));
GAME.addInput(new KeyboardInput(players[1], { left: 'arrowleft', right: 'arrowright', up: 'arrowup' }));

generateLevels();
GAME.nextLevel();

loop();

function loop() {
    GAME.update();
    setTimeout(() => { window.requestAnimationFrame(loop) }, 0);
}

function generateLevels() {
    let level = new Level();

    level.addObject(new Rectangle('../assets/player/player.png', { x: 0, y: 50 }, { w: 200, h: 1 }));
    //level.addObject(new Rectangle('../assets/player/player.png', { x: -20, y: -10 }, { w: 50, h: 1 }));
    level.addObject(new Rectangle('../assets/player/player.png', { x: 50, y: 35 }, { w: 10, h: 100 }));
    
    //let platform = new Platform('../assets/player/player.png', [{ x: 0, y: 50 }, { x: -100, y: 50 }], { w: 50, h: 50 }, 3, 'pause');
    let platform = new Platform('../assets/player/player.png', [{ x: 0, y: 100 }, { x: 0, y: 0 }], { w: 50, h: 50 }, 3, 'pause');
    level.addObject(platform);
    level.addGoal(new Door('../assets/player/player.png', { x: -120, y: 50 }, { w: 16, h: 2 }, platform));
    level.addGoal(new Portal('../assets/player/player.png', { x: 70, y: 50 }, { w: 16, h: 2 }, { x: -120, y: 20 }));

    level.addObject(new Box('../assets/player/player.png', { x: 20, y: 20 }, { w: 10, h: 10 }));
    
    level.addSpawn(new Spawn(players[0]));
    level.addSpawn(new Spawn(players[1], { x: 0, y: 20 }));
    
    level.addGoal(new Goal('../assets/player/player.png', { x: -120, y: 0 }, players[0]));
    level.addGoal(new Goal('../assets/player/player.png', { x: -120, y: 100 }));

    GAME.addLevel(level);
    GAME.addLevel(level);
}