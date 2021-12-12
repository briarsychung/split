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
import { Texture } from './modules/texture.mjs';
import { Animated } from './modules/animated.mjs';
import { Sprite } from './modules/sprite.mjs';

const GAME = new Game(new Canvas(document.getElementById('canvas')));
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

function loop() {
    GAME.update();
    if (GAME.stage === 'win') {
        document.getElementById('game').style.visibility = 'hidden';
        document.getElementById('end').style.visibility = 'visible';
    } else {
        setTimeout(() => { window.requestAnimationFrame(loop) }, 0);
    }
}

function generateLevels() {
    let players = [new Player(new Sprite('../assets/player/player-blue-')), new Player(new Sprite('../assets/player/player-red-'))];
    
    GAME.addPlayer(players[0]);
    GAME.addPlayer(players[1]);
    
    GAME.addInput(new Input(players[0]));
    GAME.addInput(new Input(players[1], { left: 'arrowleft', right: 'arrowright', up: 'arrowup' }));

    let stair = new Level();

    stair.addSpawn(new Spawn({ x: 0, y: -25 }, players[0]));
    stair.addSpawn(new Spawn({ x: 20, y: -25 }, players[1]));

    stair.addObject(new Ground({ x: 10, y: 25 }, { w: 40, h: 50 }, new Texture('../assets/ground/brick-small-middle.png', { w: 40, h: 50 })));
    stair.addObject(new Ground({ x: 60, y: -25 }, { w: 40, h: 50 }, new Texture('../assets/ground/brick-small-middle.png', { w: 40, h: 50 })));
    stair.addObject(new Ground({ x: 110, y: -75 }, { w: 40, h: 50 }, new Texture('../assets/ground/brick-small-middle.png', { w: 40, h: 50 })));

    let stairP1 = new Platform([{ x: 35, y: 25 }, { x: 35, y: -25 }], { w: 10, h: 50 }, new Texture('../assets/ground/brick-cracked-middle.png', { w: 10, h: 50 }), 3, 'pause');
    let stairP2 = new Platform([{ x: 85, y: -25 }, { x: 85, y: -75 }], { w: 10, h: 50 }, new Texture('../assets/ground/brick-cracked-middle.png', { w: 10, h: 50 }), 3, 'pause');

    stair.addObject(stairP1);
    stair.addObject(stairP2);

    stair.addObject(new Door({ x: 60, y: -50 }, { w: 16, h: 6 }, [new Texture('../assets/interactive/button-up.png', { w: 16, h: 6 }), new Texture('../assets/interactive/button-down.png', { w: 16, h: 6 })], stairP1));
    stair.addObject(new Door({ x: 110, y: -100 }, { w: 16, h: 6 }, [new Texture('../assets/interactive/button-up.png', { w: 16, h: 6 }), new Texture('../assets/interactive/button-down.png', { w: 16, h: 6 })], stairP2));

    stair.addGoal(new Goal({ x: 170, y: -75 }, { w: 16, h: 6 }, new Texture('../assets/ground/brick-cracked-middle.png', { w: 16, h: 6 })));
    stair.addGoal(new Goal({ x: 150, y: -75 }, { w: 16, h: 6 }, new Texture('../assets/ground/brick-cracked-middle.png', { w: 16, h: 6 })));

    GAME.addLevel(stair);
}