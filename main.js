import { Game } from './modules/game.mjs';
import { Canvas } from './modules/canvas.mjs';
import { Level } from './modules/level.mjs';
import { Player } from './modules/player.mjs';
import { Input } from './modules/input.mjs';
import { Spawn } from './modules/spawn.mjs';
import { Box } from './modules/box.mjs';
import { Ground } from './modules/ground.mjs';
import { Spike } from './modules/spike.mjs';
import { Platform } from './modules/platform.mjs';
import { Cracked } from './modules/cracked.mjs';
import { Door } from './modules/door.mjs';
import { Portal } from './modules/portal.mjs';
import { Boost } from './modules/boost.mjs';
import { Link } from './modules/link.mjs';
import { Goal } from './modules/goal.mjs';

const GAME = new Game(new Canvas(document.getElementById('canvas')));

let players = [new Player('../assets/player/player.png'), new Player('../assets/player/player.png')];

GAME.addPlayer(players[0]);
GAME.addPlayer(players[1]);

GAME.addInput(new Input(players[0]));
GAME.addInput(new Input(players[1], { left: 'arrowleft', right: 'arrowright', up: 'arrowup' }));

generateLevels();
GAME.nextLevel();

loop();

function loop() {
    GAME.update();
    setTimeout(() => { window.requestAnimationFrame(loop) }, 0);
}

function generateLevels() {
    let stair = new Level();

    stair.addSpawn(new Spawn(players[0], { x: 0, y: -25 }));
    stair.addSpawn(new Spawn(players[1], { x: 20, y: -25 }));

    stair.addObject(new Ground('../assets/player/player.png', { x: 10, y: 25 }, { w: 40, h: 50 }));
    stair.addObject(new Ground('../assets/player/player.png', { x: 60, y: -25 }, { w: 40, h: 50 }));
    stair.addObject(new Ground('../assets/player/player.png', { x: 110, y: -75 }, { w: 40, h: 50 }));

    let stairP1 = new Platform('../assets/player/player.png', [{ x: 35, y: 25 }, { x: 35, y: -25 }], { w: 10, h: 50 }, 3, 'pause');
    let stairP2 = new Platform('../assets/player/player.png', [{ x: 85, y: -25 }, { x: 85, y: -75 }], { w: 10, h: 50 }, 3, 'pause');

    stair.addObject(stairP1);
    stair.addObject(stairP2);

    stair.addObject(new Door('../assets/player/player.png', { x: 60, y: -50 }, { w: 25, h: 2 }, stairP1));
    stair.addObject(new Door('../assets/player/player.png', { x: 110, y: -100 }, { w: 25, h: 2 }, stairP2));

    stair.addGoal(new Goal('../assets/player/player.png', { x: 170, y: -75 }));
    stair.addGoal(new Goal('../assets/player/player.png', { x: 150, y: -75 }));

    GAME.addLevel(stair);
}