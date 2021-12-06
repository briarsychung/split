import { Camera } from './camera.mjs';
import { Player } from './player.mjs';

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.element.getContext('2d');

        this.camera = new Camera();

        this.players = [];
        this.objects = [];

        this.stage = 'game';
    }

    addObject(object) {
        this.objects.push(object);
    }

    addPlayer(player) {
        this.players.push(player);
        this.addObject(player);
    }

    iter() {
        switch (this.stage) {
            case 'game':
                this.gameTick();
                break;
        }
    }

    gameTick() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.input.check();

        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].iter();
        }

        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i].detectObject) {
                for (let j = 0; j < this.objects.length; j++) {
                    this.objects[i].detectObject(this.objects[j]);
                }
            }
            this.objects[i].move();
            this.draw(this.objects[i]);
        }

        this.camera.pos.x = 0.75 * this.camera.pos.x + 0.25 * (this.players[0].pos.x + this.players[1].pos.x) / 2;
        this.camera.pos.y = 0.75 * this.camera.pos.y + 0.25 * (this.players[0].pos.y + this.players[1].pos.y) / 2;

        let tx = 0.75 * this.canvas.width / Math.abs(this.players[0].pos.x - this.players[1].pos.x);
        let ty = 0.75 * this.canvas.height / Math.abs(this.players[0].pos.y - this.players[1].pos.y);

        if (tx < 2 || ty < 2) {
            this.camera.pos.x = 0.75 * this.camera.pos.x + 0.25 * this.players[0].pos.x;
            this.camera.pos.y = 0.75 * this.camera.pos.y + 0.25 * this.players[0].pos.y;
            this.camera.zoom = 0.875 * this.camera.zoom + 0.125 * 2;
            return;
        }

        let xz = Math.max(Math.min(0.75 * this.canvas.width / Math.abs(this.players[0].pos.x - this.players[1].pos.x), 4), 2);
        let yz = Math.max(Math.min(0.75 * this.canvas.height / Math.abs(this.players[0].pos.y - this.players[1].pos.y), 4), 2);
        this.camera.zoom = 0.875 * this.camera.zoom + 0.125 * Math.min(xz, yz);
    }

    draw(object) {
        this.context.drawImage(object.image,
            this.canvas.width / 2 + (object.pos.x - object.dim.w / 2 - this.camera.pos.x) * this.camera.zoom,
            this.canvas.height / 2 + (object.pos.y - object.dim.h / 2 - this.camera.pos.y) * this.camera.zoom,
            object.dim.w * this.camera.zoom,
            object.dim.h * this.camera.zoom);
            
        this.context.strokeStyle = object.touch && object.touch.bottom ? 'green' : 'red';
        let x1 = this.canvas.width / 2 + (object.box.left - this.camera.pos.x) * this.camera.zoom;
        let x2 = this.canvas.width / 2 + (object.box.right - this.camera.pos.x) * this.camera.zoom;
        let y1 = this.canvas.height / 2 + (object.box.top - this.camera.pos.y) * this.camera.zoom;
        let y2 = this.canvas.height / 2 + (object.box.bottom - this.camera.pos.y) * this.camera.zoom;
        this.context.strokeRect(x1, y1, x2 - x1, y2 - y1);
        this.context.strokeStyle = 'blue';
        return;
        this.context.strokeRect(
            this.canvas.width / 2 + (object.pos.x - object.dim.w / 2 - this.camera.pos.x) * this.camera.zoom,
            this.canvas.height / 2 + (object.pos.y - object.dim.h / 2 - this.camera.pos.y) * this.camera.zoom,
            object.dim.w * this.camera.zoom,
            object.dim.h * this.camera.zoom);
    }
}

export { Game, Camera, Player };