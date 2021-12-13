import { Game } from './modules/game.mjs';
import { Canvas } from './modules/canvas.mjs';
import { Texture } from './modules/texture.mjs';
import { Sandwich } from './modules/sandwich.mjs';
import { Animated } from './modules/animated.mjs';
import { Player } from './modules/player.mjs';
import { Sprite } from './modules/sprite.mjs';
import { Input } from './modules/input.mjs';
import { Level } from './modules/level.mjs';
import { Background } from './modules/background.mjs';
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

    let outside = new Background(new Texture('../assets/background/outside.png', { w: 1024, h: 1024 }), ['#89c9e4', '#477553'])

    let buttonTextures = {
        up: new Texture('../assets/interactive/button-up.png', { w: 16, h: 6 }),
        down: new Texture('../assets/interactive/button-down.png', { w: 16, h: 6 })
    };

    let ground = ['../assets/ground/ground-side.png', '../assets/ground/ground-middle.png'];
    let cracked = ['../assets/ground/brick-cracked-side.png', '../assets/ground/brick-cracked-middle.png'];
    let spike = {
        big: '../assets/interactive/spike-small.png',
        small: '../assets/interactive/spike-small.png'
    };
    let brick = {
        big: ['../assets/ground/brick-big-side.png', '../assets/ground/brick-big-middle.png'],
        small: ['../assets/ground/brick-small-side.png', '../assets/ground/brick-small-middle.png']
    };

    let links = new Level();
    links.setBackground(outside);

    links.addSpawn(new Spawn({ x: 400, y: 240 }, players[0]));
    links.addSpawn(new Spawn({ x: 400, y: 400 }, players[1]));
    links.addObject(new Ground({ x: 440, y: 280 }, { w: 160, h: 32 }, new Sandwich(ground, { w: 160, h: 32 })));
    links.addObject(new Ground({ x: 440, y: 440 }, { w: 160, h: 32 }, new Sandwich(ground, { w: 160, h: 32 })));

    let linksC1 = new Cracked({ x: 600, y: 272 }, { w: 80, h: 16 }, new Sandwich(cracked, { w: 80, h: 16 }));
    links.addObject(linksC1);
    links.addObject(new Spike({ x: 600, y: 288 }, { w: 80, h: 16 }, new Texture(spike.small, { w: 80, h: 16 })));
    links.addObject(new Ground({ x: 600, y: 304 }, { w: 80, h: 16 }, new Sandwich(brick.small, { w: 80, h: 16 })));
    links.addObject(new Link({ x: 600, y: 432 }, { w: 80, h: 16 }, new Sandwich(brick.small, { w: 80, h: 16 }), { x: 0, y: 0 }, linksC1));

    let linksC2 = new Cracked({ x: 760, y: 432 }, { w: 80, h: 16 }, new Sandwich(cracked, { w: 80, h: 16 }));
    links.addObject(linksC2);
    links.addObject(new Link({ x: 760, y: 272 }, { w: 80, h: 16 }, new Sandwich(brick.small, { w: 80, h: 16 }), { x: 0, y: 0 }, linksC2));

    let linksC3 = new Cracked({ x: 920, y: 272 }, { w: 80, h: 16 }, new Sandwich(cracked, { w: 80, h: 16 }));
    links.addObject(linksC3);
    links.addObject(new Spike({ x: 920, y: 288 }, { w: 80, h: 16 }, new Texture(spike.small, { w: 80, h: 16 })));
    links.addObject(new Ground({ x: 920, y: 304 }, { w: 80, h: 16 }, new Sandwich(brick.small, { w: 80, h: 16 })));
    links.addObject(new Link({ x: 920, y: 432 }, { w: 80, h: 16 }, new Sandwich(brick.small, { w: 80, h: 16 }), { x: 0, y: 0 }, linksC3));

    links.addObject(new Ground({ x: 1080, y: 280 }, { w: 160, h: 32 }, new Sandwich(ground, { w: 160, h: 32 })));
    links.addObject(new Ground({ x: 1080, y: 440 }, { w: 160, h: 32 }, new Sandwich(ground, { w: 160, h: 32 })));

    links.addGoal(new Goal({ x: 1176, y: 280 }));
    links.addGoal(new Goal({ x: 1176, y: 440 }));
    links.addObject(new Ground({ x: 1176, y: 288 }, { w: 32, h: 16 }, new Sandwich(brick.small, { w: 32, h: 32 }), { x: 0, y: -8 }));
    links.addObject(new Ground({ x: 1176, y: 448 }, { w: 32, h: 16 }, new Sandwich(brick.small, { w: 32, h: 32 }), { x: 0, y: -8 }));

    GAME.addLevel(links);
    
    let belt = new Level();
    belt.setBackground(outside);

    belt.addSpawn(new Spawn({ x: 400, y: 240 }, players[0]));
    belt.addSpawn(new Spawn({ x: 400, y: 400 }, players[1]));
    belt.addObject(new Ground({ x: 440, y: 280 }, { w: 160, h: 32 }, new Sandwich(ground, { w: 160, h: 32 })));
    belt.addObject(new Ground({ x: 440, y: 440 }, { w: 160, h: 32 }, new Sandwich(ground, { w: 160, h: 32 })));

    let beltP1 = new Platform([{ x: 560, y: 272 }, { x: 720, y: 272 }], { w: 80, h: 16 }, new Sandwich(brick.small, { w: 80, h: 16 }));
    belt.addObject(beltP1);
    belt.addObject(new Door({ x: 504, y: 422.5 }, { w: 16, h: 3 }, [buttonTextures.up, buttonTextures.down], { x: 0, y: -1.5 }, beltP1));

    belt.addObject(new Platform([{ x: 800, y: 272 }, { x: 960, y: 272 }], { w: 80, h: 16 }, new Sandwich(brick.small, { w: 80, h: 16 }), { x: 0, y: 0 }, 'loop'));
    belt.addObject(new Platform([{ x: 560, y: 432 }, { x: 720, y: 432 }], { w: 80, h: 16 }, new Sandwich(brick.small, { w: 80, h: 16 }), { x: 0, y: 0 }, 'loop'));

    belt.addObject(new Spike({ x: 760, y: 288 }, { w: 480, h: 16 }, new Texture(spike.small, { w: 480, h: 16 })));
    belt.addObject(new Ground({ x: 760, y: 304 }, { w: 480, h: 16 }, new Sandwich(brick.small, { w: 480, h: 16 })));

    belt.addObject(new Ground({ x: 1080, y: 280 }, { w: 160, h: 32 }, new Sandwich(ground, { w: 160, h: 32 })));
    belt.addObject(new Ground({ x: 1080, y: 440 }, { w: 160, h: 32 }, new Sandwich(ground, { w: 160, h: 32 })));

    let beltP2 = new Platform([{ x: 800, y: 432 }, { x: 960, y: 432 }], { w: 80, h: 16 }, new Sandwich(brick.small, { w: 80, h: 16 }));
    belt.addObject(beltP2);
    belt.addObject(new Door({ x: 1016, y: 262.5 }, { w: 16, h: 3 }, [buttonTextures.up, buttonTextures.down], { x: 0, y: -1.5 }, beltP2));

    belt.addGoal(new Goal({ x: 1176, y: 280 }));
    belt.addGoal(new Goal({ x: 1176, y: 440 }));
    belt.addObject(new Ground({ x: 1176, y: 288 }, { w: 32, h: 16 }, new Sandwich(brick.small, { w: 32, h: 32 }), { x: 0, y: -8 }));
    belt.addObject(new Ground({ x: 1176, y: 448 }, { w: 32, h: 16 }, new Sandwich(brick.small, { w: 32, h: 32 }), { x: 0, y: -8 }));

    GAME.addLevel(belt);

    let stair = new Level();
    stair.setBackground(outside);

    stair.addSpawn(new Spawn({ x: 400, y: 400 }, players[0]));
    stair.addSpawn(new Spawn({ x: 440, y: 400 }, players[1]));
    stair.addObject(new Ground({ x: 440, y: 440 }, { w: 160, h: 32 }, new Sandwich(ground, { w: 160, h: 32 })));

    let stairP1 = new Platform([{ x: 536, y: 472 }, { x: 536, y: 376 }], { w: 32, h: 96 }, new Sandwich(cracked, { w: 32, h: 96 }));
    stair.addObject(stairP1);
    stair.addObject(new Ground({ x: 584, y: 376 }, { w: 64, h: 96 }, new Sandwich(brick.big, { w: 64, h: 96 })));
    stair.addObject(new Door({ x: 584, y: 326.5 }, { w: 16, h: 3 }, [buttonTextures.up, buttonTextures.down], { x: 0, y: -1.5 }, stairP1));

    let stairP2 = new Platform([{ x: 632, y: 376 }, { x: 632, y: 280 }], { w: 32, h: 96 }, new Sandwich(cracked, { w: 32, h: 96 }));
    stair.addObject(stairP2);
    stair.addObject(new Ground({ x: 680, y: 280 }, { w: 64, h: 96 }, new Sandwich(brick.big, { w: 64, h: 96 })));
    stair.addObject(new Door({ x: 680, y: 230.5 }, { w: 16, h: 3 }, [buttonTextures.up, buttonTextures.down], { x: 0, y: -1.5 }, stairP2));

    let stairP3 = new Platform([{ x: 728, y: 280 }, { x: 728, y: 184 }], { w: 32, h: 96 }, new Sandwich(cracked, { w: 32, h: 96 }));
    stair.addObject(stairP3);
    stair.addObject(new Ground({ x: 776, y: 184 }, { w: 64, h: 96 }, new Sandwich(brick.big, { w: 64, h: 96 })));
    stair.addObject(new Door({ x: 776, y: 134.5 }, { w: 16, h: 3 }, [buttonTextures.up, buttonTextures.down], { x: 0, y: -1.5 }, stairP3));

    stair.addObject(new Ground({ x: 888, y: 152 }, { w: 160, h: 32 }, new Sandwich(ground, { w: 160, h: 32 })));

    stair.addGoal(new Goal({ x: 984, y: 152 }));
    stair.addGoal(new Goal({ x: 1048, y: 152 }));
    stair.addObject(new Ground({ x: 1016, y: 160 }, { w: 96, h: 16 }, new Sandwich(brick.big, { w: 96, h: 32 }), { x: 0, y: -8 }));
    stair.addObject(new Ground({ x: 1016, y: 152 }, { w: 32, h: 32 }, new Texture(brick.big[1], { w: 32, h: 32 }), { x: 0, y: 0 }));

    GAME.addLevel(stair);
}