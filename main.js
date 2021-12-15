import { Game } from './modules/game.mjs';
import { Canvas } from './modules/canvas.mjs';
import { Texture } from './modules/texture.mjs';
import { Sandwich } from './modules/sandwich.mjs';
import { Player } from './modules/player.mjs';
import { Input } from './modules/input.mjs';
import { Level } from './modules/level.mjs';
import { Background } from './modules/background.mjs';
import { Spawn } from './modules/spawn.mjs';
import { Ground } from './modules/ground.mjs';
import { Trigger } from './modules/trigger.mjs';
import { Cracked } from './modules/cracked.mjs';
import { Platform } from './modules/platform.mjs';
import { Spike } from './modules/spike.mjs';
import { Door } from './modules/door.mjs';
import { Link } from './modules/link.mjs';
import { Portal } from './modules/portal.mjs';
import { Box } from './modules/box.mjs';
import { Boss } from './modules/boss.mjs';
import { Combiner } from './modules/combiner.mjs';
import { Dialogue } from './modules/dialogue.mjs';
import { Goal } from './modules/goal.mjs';

const GAME = new Game(new Canvas(document.getElementById('canvas')));
generateLevels();

document.getElementById('start').addEventListener('click', () => {
    document.getElementById('menu').style.visibility = 'hidden';
    document.getElementById('menu').style.opacity = 0;
    document.getElementById('game').style.visibility = 'visible';
    document.getElementById('game').style.opacity = 1;
    GAME.start();
    loop();
});

document.getElementById('reset').addEventListener('click', () => {
    document.getElementById('end').style.visibility = 'hidden';
    document.getElementById('end').style.opacity = 0;
    document.getElementById('menu').style.visibility = 'visible';
    document.getElementById('menu').style.opacity = 1;
});

let delay = 0;
document.addEventListener('keydown', e => {
    switch (e.key.toLowerCase()) {
        case 'p':
            GAME.debug = !GAME.debug;
            if (!GAME.debug) delay = 0;
            break;
        case '0':
            if (GAME.debug) delay = 0;
            break;
        case '9':
            if (GAME.debug) delay = 1000;
            break;
        case '8':
            if (GAME.debug) delay = 100;
            break;
        case ',':
            if (GAME.debug) GAME.resetLevel();
            break;
        case '.':
            if (GAME.debug) GAME.queueLevel();
            break;
    }
});

const FPS = 60;
let next = Date.now();

function loop() {
    if (Date.now() > next) {
        next += 1000 / FPS;
        GAME.update();
    }
    if (GAME.stage === 'win') {
        document.getElementById('game').style.visibility = 'hidden';
        document.getElementById('game').style.opacity = 0;
        document.getElementById('end').style.visibility = 'visible';
        document.getElementById('end').style.opacity = 1;
        let time = Date.now() - start;
        let time = Date.now() - GAME.time;
        let f = t => {
            return ((t + '').length === 1 ? '0' : '') + t;
        };
        document.getElementById('time').innerHTML = 'Total Time: ' +
            f(Math.floor(Math.floor(time / 1000) / 60)) + ':' + f((Math.floor(time / 1000) % 60)) + '.' + f(Math.floor((time % 1000) / 100)) +
            '<br>Deaths: ' + GAME.deaths;
    } else {
        setTimeout(() => { window.requestAnimationFrame(loop) }, delay);
    }
}

function generateLevels() {
    let players = [new Player('./assets/player/player-blue-'), new Player('./assets/player/player-red-'), new Player('./assets/player/player-main-')];

    GAME.addPlayer(players[0]);
    GAME.addPlayer(players[1]);
    GAME.addCombine(players[2]);

    GAME.addInput(new Input(players[0]));
    GAME.addInput(new Input(players[1], { left: 'arrowleft', right: 'arrowright', up: 'arrowup' }));

    GAME.addInput(new Input(players[2]));
    GAME.addInput(new Input(players[2], { left: 'arrowleft', right: 'arrowright', up: 'arrowup' }));

    let outside = new Background(new Texture('./assets/background/outside.png', { w: 1024, h: 1024 }), ['#89c9e4', '#477553']);
    let inside = new Background(new Texture('./assets/background/inside.png', { w: 1024, h: 1024 }), ['#252b2d', '#252b2d']);

    let buttonTextures = {
        up: new Texture('./assets/interactive/button-up.png', { w: 16, h: 6 }),
        down: new Texture('./assets/interactive/button-down.png', { w: 16, h: 6 })
    };

    let ground = ['./assets/ground/ground-side.png', './assets/ground/ground-middle.png'];
    let cracked = ['./assets/ground/brick-cracked-side.png', './assets/ground/brick-cracked-middle.png'];
    let spike = {
        big: './assets/interactive/spike-big.png',
        small: './assets/interactive/spike-small.png'
    };
    let box = {
        big: './assets/interactive/box-small.png',
        small: './assets/interactive/box-small.png'
    };
    let brick = {
        big: ['./assets/ground/brick-big-side.png', './assets/ground/brick-big-middle.png'],
        small: ['./assets/ground/brick-small-side.png', './assets/ground/brick-small-middle.png']
    };

    let intro = new Level();
    intro.setBackground(outside);
    intro.setCombine(true);

    intro.addSpawn(new Spawn({ x: 400, y: 400 }, players[2]));
    intro.addObject(new Ground({ x: 440, y: 440 }, { w: 160, h: 32 }, new Sandwich(ground, { w: 160, h: 32 })));

    let introB = new Boss({ x: 1016, y: 360 });
    intro.addBoss(introB);

    let introD = new Dialogue(introB,
        [new Texture('./assets/dialogue/hahaha.png', { w: 64, h: 32 }),
        new Texture('./assets/dialogue/catch-me.png', { w: 64, h: 32 })], ['hostile', 'bye']);
    intro.addDialogue(introD);

    intro.addObject(new Ground({ x: 632, y: 440 }, { w: 160, h: 32 }, new Sandwich(ground, { w: 160, h: 32 })));
    intro.addObject(new Trigger({ x: 824, y: 440 }, { w: 160, h: 32 }, new Sandwich(ground, { w: 160, h: 32 }), { x: 0, y: 0 }, introD));
    intro.addObject(new Ground({ x: 1016, y: 440 }, { w: 160, h: 32 }, new Sandwich(ground, { w: 160, h: 32 })));

    intro.addObject(new Ground({ x: 1208, y: 440 }, { w: 160, h: 32 }, new Sandwich(ground, { w: 160, h: 32 })));
    intro.addObject(new Ground({ x: 1176, y: 376 }, { w: 32, h: 32 }, new Sandwich(brick.small, { w: 32, h: 32 })));
    intro.addObject(new Ground({ x: 1240, y: 312 }, { w: 32, h: 32 }, new Sandwich(brick.small, { w: 32, h: 32 })));

    intro.addObject(new Ground({ x: 1400, y: 280 }, { w: 160, h: 32 }, new Sandwich(ground, { w: 160, h: 32 })));
    intro.addObject(new Ground({ x: 1400, y: 440 }, { w: 160, h: 32 }, new Sandwich(ground, { w: 160, h: 32 })));

    intro.addGoal(new Goal({ x: 1496, y: 280 }));
    intro.addGoal(new Goal({ x: 1496, y: 440 }));
    intro.addObject(new Ground({ x: 1496, y: 288 }, { w: 32, h: 16 }, new Sandwich(brick.small, { w: 32, h: 32 }), { x: 0, y: -8 }));
    intro.addObject(new Ground({ x: 1496, y: 448 }, { w: 32, h: 16 }, new Sandwich(brick.small, { w: 32, h: 32 }), { x: 0, y: -8 }));

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

    let push = new Level();
    push.setBackground(inside);

    push.addSpawn(new Spawn({ x: 400, y: 240 }, players[0]));
    push.addSpawn(new Spawn({ x: 400, y: 400 }, players[1]));
    push.addObject(new Ground({ x: 440, y: 280 }, { w: 160, h: 32 }, new Sandwich(brick.big, { w: 160, h: 32 })));
    push.addObject(new Ground({ x: 440, y: 440 }, { w: 160, h: 32 }, new Sandwich(brick.big, { w: 160, h: 32 })));

    let pushP1 = new Platform([{ x: 536, y: 360 }, { x: 536, y: 520 }], { w: 32, h: 192 }, new Sandwich(cracked, { w: 32, h: 192 }), { x: 0, y: 0 }, 'pause', 1);
    push.addObject(pushP1);
    push.addObject(new Door({ x: 600, y: 422.5 }, { w: 16, h: 3 }, [buttonTextures.up, buttonTextures.down], { x: 0, y: -1.5 }, pushP1));

    push.addObject(new Ground({ x: 571, y: 280 }, { w: 38, h: 32 }, new Sandwich(brick.small, { w: 38, h: 32 })));
    push.addObject(new Ground({ x: 661, y: 280 }, { w: 102, h: 32 }, new Sandwich(brick.small, { w: 102, h: 32 })));
    push.addObject(new Ground({ x: 632, y: 440 }, { w: 160, h: 32 }, new Sandwich(brick.big, { w: 160, h: 32 })));
    push.addObject(new Box({ x: 536, y: 256 }, { w: 16, h: 16 }, new Texture(box.small, { w: 16, h: 16 })));

    let pushP2 = new Platform([{ x: 728, y: 200 }, { x: 728, y: 360 }], { w: 32, h: 192 }, new Sandwich(cracked, { w: 32, h: 192 }), { x: 0, y: 0 }, 'pause', 1);
    push.addObject(pushP2);
    push.addObject(new Door({ x: 664, y: 422.5 }, { w: 16, h: 3 }, [buttonTextures.up, buttonTextures.down], { x: 0, y: -1.5 }, pushP2));

    push.addObject(new Ground({ x: 824, y: 280 }, { w: 160, h: 32 }, new Sandwich(brick.big, { w: 160, h: 32 })));
    push.addObject(new Ground({ x: 824, y: 440 }, { w: 160, h: 32 }, new Sandwich(brick.big, { w: 160, h: 32 })));

    push.addGoal(new Goal({ x: 920, y: 280 }));
    push.addGoal(new Goal({ x: 920, y: 440 }));
    push.addObject(new Ground({ x: 920, y: 288 }, { w: 32, h: 16 }, new Sandwich(brick.small, { w: 32, h: 32 }), { x: 0, y: -8 }));
    push.addObject(new Ground({ x: 920, y: 448 }, { w: 32, h: 16 }, new Sandwich(brick.small, { w: 32, h: 32 }), { x: 0, y: -8 }));

    let telly = new Level();
    telly.setBackground(inside);

    telly.addSpawn(new Spawn({ x: 400, y: 240 }, players[0]));
    telly.addSpawn(new Spawn({ x: 400, y: 400 }, players[1]));
    telly.addObject(new Ground({ x: 440, y: 280 }, { w: 160, h: 32 }, new Sandwich(brick.big, { w: 160, h: 32 })));
    telly.addObject(new Ground({ x: 440, y: 440 }, { w: 160, h: 32 }, new Sandwich(brick.big, { w: 160, h: 32 })));

    telly.addObject(new Ground({ x: 603, y: 536 }, { w: 166, h: 32 }, new Sandwich(brick.big, { w: 166, h: 32 })));
    telly.addObject(new Box({ x: 568, y: 512 }, { w: 16, h: 16 }, new Texture(box.small, { w: 16, h: 16 })));
    telly.addObject(new Box({ x: 600, y: 512 }, { w: 16, h: 16 }, new Texture(box.small, { w: 16, h: 16 })));
    telly.addObject(new Box({ x: 632, y: 512 }, { w: 16, h: 16 }, new Texture(box.small, { w: 16, h: 16 })));

    telly.addObject(new Ground({ x: 757, y: 536 }, { w: 102, h: 32 }, new Sandwich(brick.big, { w: 102, h: 32 })));
    telly.addObject(new Portal([{ x: 696, y: 600 }, { x: 696, y: 152 }]));

    let tellyP1 = new Platform([{ x: 696, y: 424 }, { x: 696, y: 360 }], { w: 96, h: 192 }, new Sandwich(brick.big, { w: 96, h: 192 }));
    telly.addObject(tellyP1);
    telly.addObject(new Door({ x: 632, y: 262.5 }, { w: 16, h: 3 }, [buttonTextures.up, buttonTextures.down], { x: 0, y: -1.5 }, tellyP1));

    telly.addObject(new Ground({ x: 600, y: 280 }, { w: 96, h: 32 }, new Sandwich(brick.big, { w: 96, h: 32 })));
    telly.addObject(new Ground({ x: 760, y: 280 }, { w: 32, h: 32 }, new Sandwich(brick.big, { w: 32, h: 32 })));

    let tellyP2 = new Platform([{ x: 664, y: 216 }, { x: 664, y: 120 }], { w: 32, h: 96 }, new Sandwich(cracked, { w: 32, h: 96 }));
    telly.addObject(tellyP2);
    telly.addObject(new Door({ x: 760, y: 518.5 }, { w: 16, h: 3 }, [buttonTextures.up, buttonTextures.down], { x: 0, y: -1.5 }, tellyP2));

    telly.addObject(new Ground({ x: 888, y: 280 }, { w: 160, h: 32 }, new Sandwich(brick.big, { w: 160, h: 32 })));
    telly.addObject(new Ground({ x: 888, y: 440 }, { w: 160, h: 32 }, new Sandwich(brick.big, { w: 160, h: 32 })));

    telly.addGoal(new Goal({ x: 984, y: 280 }));
    telly.addGoal(new Goal({ x: 984, y: 440 }));
    telly.addObject(new Ground({ x: 984, y: 288 }, { w: 32, h: 16 }, new Sandwich(brick.small, { w: 32, h: 32 }), { x: 0, y: -8 }));
    telly.addObject(new Ground({ x: 984, y: 448 }, { w: 32, h: 16 }, new Sandwich(brick.small, { w: 32, h: 32 }), { x: 0, y: -8 }));

    let carry = new Level();
    carry.setBackground(inside);

    carry.addSpawn(new Spawn({ x: 400, y: 240 }, players[0]));
    carry.addSpawn(new Spawn({ x: 400, y: 400 }, players[1]));
    carry.addObject(new Ground({ x: 440, y: 280 }, { w: 160, h: 32 }, new Sandwich(brick.big, { w: 160, h: 32 })));
    carry.addObject(new Ground({ x: 440, y: 440 }, { w: 160, h: 32 }, new Sandwich(brick.big, { w: 160, h: 32 })));

    let carryP1 = new Platform([{ x: 568, y: 280 }, { x: 568, y: 440 }], { w: 96, h: 32 }, new Sandwich(brick.big, { w: 96, h: 32 }));
    carry.addObject(carryP1);
    carry.addObject(new Door({ x: 504, y: 422.5 }, { w: 16, h: 3 }, [buttonTextures.up, buttonTextures.down], { x: 0, y: -1.5 }, carryP1));
    carry.addObject(new Ground({ x: 568, y: 200 }, { w: 32, h: 128 }, new Sandwich(brick.small, { w: 32, h: 128 })));

    carry.addObject(new Ground({ x: 696, y: 344 }, { w: 160, h: 32 }, new Sandwich(brick.big, { w: 160, h: 32 })));
    carry.addObject(new Platform([{ x: 656, y: 432 }, { x: 736, y: 432 }], { w: 80, h: 16 }, new Sandwich(brick.small, { w: 80, h: 16 }), { x: 0, y: 0 }, 'loop'));
    carry.addObject(new Spike({ x: 696, y: 448 }, { w: 160, h: 16 }, new Texture(spike.small, { w: 160, h: 16 })));
    carry.addObject(new Ground({ x: 696, y: 464 }, { w: 160, h: 16 }, new Sandwich(brick.small, { w: 160, h: 16 })));

    let carryP2 = new Platform([{ x: 792, y: 280 }, { x: 792, y: 376 }], { w: 32, h: 160 }, new Sandwich(cracked, { w: 32, h: 160 }));
    carry.addObject(carryP2);
    carry.addObject(new Door({ x: 696, y: 326.5 }, { w: 16, h: 3 }, [buttonTextures.up, buttonTextures.down], { x: 0, y: -1.5 }, carryP2));

    carry.addObject(new Ground({ x: 888, y: 280 }, { w: 160, h: 32 }, new Sandwich(brick.big, { w: 160, h: 32 })));
    carry.addObject(new Ground({ x: 888, y: 440 }, { w: 160, h: 32 }, new Sandwich(brick.big, { w: 160, h: 32 })));

    carry.addGoal(new Goal({ x: 984, y: 280 }));
    carry.addGoal(new Goal({ x: 984, y: 440 }));
    carry.addObject(new Ground({ x: 984, y: 288 }, { w: 32, h: 16 }, new Sandwich(brick.small, { w: 32, h: 32 }), { x: 0, y: -8 }));
    carry.addObject(new Ground({ x: 984, y: 448 }, { w: 32, h: 16 }, new Sandwich(brick.small, { w: 32, h: 32 }), { x: 0, y: -8 }));

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

    let boss = new Level();
    boss.setBackground(outside);

    boss.addSpawn(new Spawn({ x: 400, y: 400 }, players[0]));
    boss.addSpawn(new Spawn({ x: 440, y: 400 }, players[1]));
    boss.addObject(new Ground({ x: 440, y: 440 }, { w: 160, h: 32 }, new Sandwich(ground, { w: 160, h: 32 })));

    let bossB = new Boss({ x: 1016, y: 360 });
    boss.addBoss(bossB);

    let bossC = new Combiner({ x: 1016, y: 408 });
    boss.addCombiner(bossC);

    let bossD = new Dialogue(bossB,
        [new Texture('./assets/dialogue/you-found-me.png', { w: 64, h: 32 }),
        new Texture('./assets/dialogue/this-ends-here.png', { w: 64, h: 32 })], ['hostile', 'attack']);
    boss.addDialogue(bossD);

    boss.addObject(new Ground({ x: 632, y: 440 }, { w: 160, h: 32 }, new Sandwich(ground, { w: 160, h: 32 })));
    boss.addObject(new Trigger({ x: 824, y: 440 }, { w: 160, h: 32 }, new Sandwich(ground, { w: 160, h: 32 }), { x: 0, y: 0 }, bossD));
    boss.addObject(new Ground({ x: 1208, y: 440 }, { w: 160, h: 32 }, new Sandwich(ground, { w: 160, h: 32 })));
    boss.addObject(new Ground({ x: 1400, y: 440 }, { w: 160, h: 32 }, new Sandwich(ground, { w: 160, h: 32 })));

    let bossP3 = new Platform([{ x: 1208, y: 472 }, { x: 1016, y: 472 }], { w: 160, h: 32 }, new Sandwich(brick.big, { w: 160, h: 32 }));
    boss.addObject(bossP3);
    boss.addObject(new Door({ x: 1112, y: 134.5 }, { w: 16, h: 6 }, [buttonTextures.up, buttonTextures.down], { x: 0, y: -1.5 }, bossP3));
    boss.addObject(new Spike({ x: 1208, y: 152 }, { w: 160, h: 32 }, new Texture(spike.big, { w: 160, h: 32 })));
    boss.addObject(new Ground({ x: 1208, y: 184 }, { w: 160, h: 32 }, new Sandwich(brick.big, { w: 160, h: 32 })));

    boss.addObject(new Ground({ x: 824, y: 344 }, { w: 96, h: 32 }, new Sandwich(brick.big, { w: 96, h: 32 })));
    boss.addObject(new Ground({ x: 824, y: 280 }, { w: 32, h: 96 }, new Sandwich(brick.small, { w: 32, h: 96 })));

    boss.addObject(new Ground({ x: 1016, y: 280 }, { w: 224, h: 32 }, new Sandwich(brick.big, { w: 224, h: 32 })));
    boss.addObject(new Ground({ x: 1112, y: 200 }, { w: 32, h: 128 }, new Sandwich(brick.small, { w: 32, h: 128 })));
    boss.addObject(new Box({ x: 984, y: 248 }, { w: 32, h: 32 }, new Texture(box.big, { w: 32, h: 32 })));
    boss.addObject(new Box({ x: 1048, y: 248 }, { w: 32, h: 32 }, new Texture(box.big, { w: 32, h: 32 })));

    let bossP1 = new Platform([{ x: 1016, y: 432 }, { x: 1016, y: 560 }], { w: 160, h: 16 }, new Sandwich(cracked, { w: 160, h: 16 }), { x: 0, y: 0 }, 'pause', 6);
    boss.addObject(bossP1);
    boss.addObject(new Door({ x: 792, y: 326.5 }, { w: 16, h: 3 }, [buttonTextures.up, buttonTextures.down], { x: 0, y: -1.5 }, bossP1));

    let bossP2 = new Platform([{ x: 1016, y: 448 }, { x: 1016, y: 576 }], { w: 160, h: 16 }, new Sandwich(cracked, { w: 160, h: 16 }), { x: 0, y: 0 }, 'pause', 6);
    boss.addObject(bossP2);
    boss.addObject(new Door({ x: 856, y: 326.5 }, { w: 16, h: 3 }, [buttonTextures.up, buttonTextures.down], { x: 0, y: -1.5 }, bossP2));

    boss.addObject(new Spike({ x: 1016, y: 504 }, { w: 160, h: 32 }, new Texture(spike.big, { w: 160, h: 32 })));
    boss.addObject(new Ground({ x: 1016, y: 536 }, { w: 160, h: 32 }, new Sandwich(brick.big, { w: 160, h: 32 })));

    boss.addGoal(new Goal({ x: 1496, y: 440 }));
    boss.addObject(new Ground({ x: 1496, y: 440 }, { w: 32, h: 32 }, new Sandwich(brick.small, { w: 32, h: 32 }), { x: 0, y: 0 }));

    GAME.addLevel(intro);
    GAME.addLevel(links);
    GAME.addLevel(belt);
    GAME.addLevel(push);
    GAME.addLevel(telly);
    GAME.addLevel(carry);
    GAME.addLevel(stair);
    GAME.addLevel(boss);
}