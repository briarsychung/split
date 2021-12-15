import { Game } from './modules/game.mjs';
import { Canvas } from './modules/canvas.mjs';
import { Generator } from './modules/generator.mjs';

let game = new Game(new Canvas(document.getElementById('canvas')));
let generator = new Generator(game);
generator.generateLevels();

function swap(contains) {
    document.getElementById(contains[0]).style.visibility = 'hidden';
    document.getElementById(contains[0]).style.opacity = 0;
    document.getElementById(contains[1]).style.visibility = 'visible';
    document.getElementById(contains[1]).style.opacity = 1;
}

document.getElementById('start').addEventListener('click', () => {
    swap(['menu', 'game']);

    game.start();
    loop();
});

document.getElementById('reset').addEventListener('click', () => {
    swap(['end', 'menu']);
});

let delay = 0;
document.addEventListener('keydown', e => {
    switch (e.key.toLowerCase()) {
        case 'p':
            game.debug = !game.debug;
            if (!game.debug) delay = 0;
            break;
        case '0':
            if (game.debug) delay = 0;
            break;
        case '9':
            if (game.debug) delay = 1000;
            break;
        case '8':
            if (game.debug) delay = 100;
            break;
        case ',':
            if (game.debug) game.resetLevel();
            break;
        case '.':
            if (game.debug) game.queueLevel();
            break;
    }
});

let fps = 60;
let next = Date.now();

function loop() {
    if (Date.now() > next) {
        next += 1000 / fps;
        game.update();
    }
    if (game.stage === 'win') {
        swap(['game', 'end']);

        let time = Date.now() - game.time;
        let f = t => {
            return ((t + '').length === 1 ? '0' : '') + t;
        };
        document.getElementById('time').innerHTML = 'Total Time: ' +
            f(Math.floor(Math.floor(time / 1000) / 60)) + ':' + f((Math.floor(time / 1000) % 60)) + '.' + f(Math.floor((time % 1000) / 100)) +
            '<br>Deaths: ' + game.deaths;
    } else {
        setTimeout(() => { window.requestAnimationFrame(loop) }, delay);
    }
}