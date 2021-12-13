import { Game } from './modules/game.mjs';
import { Canvas } from './modules/canvas.mjs';
import { Texture } from './modules/texture.mjs';
import { Animated } from './modules/animated.mjs';
import { Player } from './modules/player.mjs';
import { Sprite } from './modules/sprite.mjs';
import { Input } from './modules/input.mjs';
import { Level } from './modules/level.mjs';
import { Spawn } from './modules/spawn.mjs';
import { Ground } from './modules/ground.mjs';
import { Cracked } from './modules/cracked.mjs';
import { Platform } from './modules/platform.mjs';
import { Spike } from './modules/spike.mjs';
import { Boost } from './modules/boost.mjs';
import { Door } from './modules/door.mjs';
import { Link } from './modules/link.mjs';
import { Portal } from './modules/portal.mjs';
import { Box } from './modules/box.mjs';
import { Goal } from './modules/goal.mjs';
import { Sandwich } from './modules/sandwich.mjs';

const GAME = new Game(new Canvas(document.getElementById('canvas')));

let speed = 0;

generateLevels();

document.getElementById('start').addEventListener('click', () => {
    document.getElementById('menu').style.visibility = 'hidden';
    document.getElementById('game').style.visibility = 'visible';
    GAME.start();
    loop();
});

document.getElementById('reset').addEventListener('click', () => {
    document.getElementById('end').style.visibility = 'hidden';
    document.getElementById('menu').style.visibility = 'visible';
});

document.addEventListener('keydown', e => {
    switch (e.key.toLowerCase()) {
        case 'p':
            GAME.debug = !GAME.debug;
            if (!GAME.debug) speed = 0;
            break;
        case '0':
            if (GAME.debug) speed = 0;
            break;
        case '9':
            if (GAME.debug) speed = 1000;
            break;
        case '8':
            if (GAME.debug) speed = 100;
            break;
        case ',':
            if (GAME.debug) GAME.resetLevel();
            break;
        case '.':
            if (GAME.debug) GAME.nextLevel();
            break;
    }
});

function loop() {
    GAME.update();
    if (GAME.stage === 'win') {
        document.getElementById('game').style.visibility = 'hidden';
        document.getElementById('end').style.visibility = 'visible';
    } else {
        setTimeout(() => { window.requestAnimationFrame(loop) }, speed);
    }
}

function generateLevels() {
    let players = [new Player(new Sprite('../assets/player/player-blue-')), new Player(new Sprite('../assets/player/player-red-'))];

    GAME.addPlayer(players[0]);
    GAME.addPlayer(players[1]);

    GAME.addInput(new Input(players[0]));
    GAME.addInput(new Input(players[1], { left: 'arrowleft', right: 'arrowright', up: 'arrowup' }));

    let stair = new Level();

    stair.addBackground(new Texture('../assets/background/outside.png', { w: 1024, h: 1024 }));

    stair.addSpawn(new Spawn({ x: 300, y: 475 }, players[0]));
    stair.addSpawn(new Spawn({ x: 325, y: 475 }, players[1]));

    //stair.addObject(new Platform([{ x: 310, y: 625 }, { x: 550, y: 625 }], { w: 800, h: 60 }, new Texture('../assets/ground/brick-small-middle.png', { w: 800, h: 60 }), { x: 0, y: 0 }, 3));
    stair.addObject(new Ground({ x: 310, y: 625-32 }, { w: 800, h: 50 }, new Sandwich(['../assets/ground/brick-small-side.png', '../assets/ground/brick-small-middle.png'], { w: 800, h: 50 })));
    stair.addObject(new Ground({ x: 310, y: 525 }, { w: 40, h: 50 }, new Texture('../assets/ground/brick-small-middle.png', { w: 40, h: 50 })));
    stair.addObject(new Ground({ x: 360, y: 475 }, { w: 40, h: 50 }, new Texture('../assets/ground/brick-small-middle.png', { w: 40, h: 50 })));
    stair.addObject(new Ground({ x: 410, y: 425 }, { w: 40, h: 50 }, new Texture('../assets/ground/brick-small-middle.png', { w: 40, h: 50 })));

    let stairP1 = new Platform([{ x: 335, y: 525 }, { x: 335, y: 475 }], { w: 10, h: 50 }, new Texture('../assets/ground/brick-cracked-middle.png', { w: 10, h: 50 }), { x: 0, y: 0 }, 3, 'pause');
    let stairP2 = new Platform([{ x: 385, y: 475 }, { x: 385, y: 425 }], { w: 10, h: 50 }, new Texture('../assets/ground/brick-cracked-middle.png', { w: 10, h: 50 }), { x: 0, y: 0 }, 3, 'pause');

    stair.addObject(stairP1);
    stair.addObject(stairP2);

    stair.addObject(new Door({ x: 360, y: 448.5 }, { w: 16, h: 3 }, [new Texture('../assets/interactive/button-up.png', { w: 16, h: 6 }), new Texture('../assets/interactive/button-down.png', { w: 16, h: 6 })], { x: 0, y: -1.5 }, stairP1));
    stair.addObject(new Door({ x: 410, y: 398.5 }, { w: 16, h: 3 }, [new Texture('../assets/interactive/button-up.png', { w: 16, h: 6 }), new Texture('../assets/interactive/button-down.png', { w: 16, h: 6 })], { x: 0, y: -1.5 }, stairP2));

    stair.addObject(new Box({ x: 200, y: 500 }, { w: 16, h: 16 }, new Texture('../assets/interactive/box-small.png', { w: 16, h: 16 })));

    stair.addGoal(new Goal({ x: 470, y: 425 }, { w: 16, h: 6 }, new Texture('../assets/ground/brick-cracked-middle.png', { w: 16, h: 6 })));
    stair.addGoal(new Goal({ x: 450, y: 425 }, { w: 16, h: 6 }, new Texture('../assets/ground/brick-cracked-middle.png', { w: 16, h: 6 })));

    GAME.addLevel(stair);
}