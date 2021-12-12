import { Camera } from './camera.mjs';
import { Player } from './player.mjs';

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        
        this.context = canvas.element.getContext('2d');
        this.camera = new Camera();
        this.players = [];
        this.inputs = [];

        this.stage = 'wait';
        this.levels = [];
        this.level = -1;
    }

    start() {
        this.stage = 'game';
        this.level = -1;
        this.nextLevel();
    }

    addLevel(level) {
        this.levels.push(level);
    }

    nextLevel() {
        this.level++;

        if (this.level === this.levels.length) {
            this.stage = 'win';
            return;
        }

        let level = this.levels[this.level];
        let objects = level.objects.concat(this.players);

        for (let i = 0; i < objects.length; i++) {
            objects[i].init();
        }

        this.players[0].pos = { ...this.levels[this.level].spawns[0].pos };
        this.players[1].pos = { ...this.levels[this.level].spawns[1].pos };
    }

    addPlayer(player) {
        this.players.push(player);
    }

    addInput(input) {
        this.inputs.push(input);
    }

    update() {
        switch (this.stage) {
            case 'game':
                this.gameTick();
                break;
        }
    }

    gameTick() {
        let level = this.levels[this.level];
        let objects = level.objects.concat(this.players).filter(o => !o.dead);

        this.players[0].tag = "P1";
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.inputs[0].check();
        this.inputs[1].check();

        for (let i = 0; i < objects.length; i++) {
            objects[i].update();
        }

        for (let i = 0; i < objects.length; i++) {
            if (objects[i].detectObject) {
                for (let j = 0; j < objects.length; j++) {
                    objects[i].detectObject(objects[j]);
                }
            }
        }

        for (let i = 0; i < objects.length; i++) {
            objects[i].move();
        }

        this.background(level);

        for (let i = 0; i < objects.length; i++) {
            if (objects[i].trigger) objects[i].trigger();
            this.draw(objects[i]);
        }

        this.camera.update(this.players);

        if (level.goals[0].player && level.goals[1].player) {
            this.nextLevel();
        }
    }

    background(level) {
        let real = this.camera.zoom * this.canvas.width / 1000;

        this.context.drawImage(level.background.draw(),
            this.canvas.width / 2 + (-512 - this.camera.pos.x) * real,
            this.canvas.height / 2 + (-512 - this.camera.pos.y) * real,
            1024 * real,
            1024 * real);
    }

    draw(object) {
        let real = this.camera.zoom * this.canvas.width / 1000;

        this.context.drawImage(object.texture.draw(), 0, 0, object.dim.w, object.dim.h,
            this.canvas.width / 2 + (object.pos.x - object.dim.w / 2 - this.camera.pos.x) * real,
            this.canvas.height / 2 + (object.pos.y - object.dim.h / 2 - this.camera.pos.y) * real,
            object.dim.w * real,
            object.dim.h * real);

        return;

        this.context.strokeStyle = object.touch && object.touch.bottom ? 'green' : 'red';
        let x1 = this.canvas.width / 2 + (object.box.left - this.camera.pos.x) * real;
        let x2 = this.canvas.width / 2 + (object.box.right - this.camera.pos.x) * real;
        let y1 = this.canvas.height / 2 + (object.box.top - this.camera.pos.y) * real;
        let y2 = this.canvas.height / 2 + (object.box.bottom - this.camera.pos.y) * real;
        this.context.strokeRect(x1, y1, x2 - x1, y2 - y1);
        this.context.strokeStyle = 'blue';
        this.context.strokeRect(
            this.canvas.width / 2 + (object.pos.x - object.dim.w / 2 - this.camera.pos.x) * real,
            this.canvas.height / 2 + (object.pos.y - object.dim.h / 2 - this.camera.pos.y) * real,
            object.dim.w * real,
            object.dim.h * real);
    }
}

export { Game, Camera, Player };