import { Object } from './object.mjs';

class Mover extends Object {
    constructor(url, pos, dim) {
        super(url, pos, dim);
        this.vel = { x: 0, y: 0 };
        this.next = { x: 0, y: 0 };
        this.ground = false;
    }

    calcBox() {
        this.box = {
            top: this.pos.y - this.dim.h / 2 + (this.vel.y < 0 ? this.vel.y : 0),
            bottom: this.pos.y + this.dim.h / 2 + (this.vel.y > 0 ? this.vel.y : 0),
            left: this.pos.x - this.dim.w / 2 + (this.vel.x < 0 ? this.vel.x : 0),
            right: this.pos.x + this.dim.w / 2 + (this.vel.x > 0 ? this.vel.x : 0)
        }
    }

    calcMove() {
        this.vel.x *= this.ground ? 0.75 : 0.875;
        this.vel.y *= 0.9375;
        this.vel.y += 0.75;
        this.ground = false;

        this.next = {
            x: this.pos.x + this.vel.x,
            y: this.pos.y + this.vel.y
        }

        this.calcBox();
    }

    detectObject(that) {
        let collides = {
            top: this.pos.y < that.box.top && that.box.top > this.box.top && that.box.top < this.box.bottom,
            bottom: this.pos.y > that.box.bottom && that.box.bottom > this.box.top && that.box.bottom < this.box.bottom,
            left: this.pos.x < that.box.left && that.box.left > this.box.left && that.box.left < this.box.right,
            right: this.pos.x > that.box.right && that.box.right > this.box.left && that.box.right < this.box.right
        };

        if (!(this.box.top < that.box.bottom && this.box.bottom > that.box.top &&
            this.box.left < that.box.right && this.box.right > that.box.left)) return;

        if (this.vel.y >= 0) {
            if (collides.top) {
                this.next.y = Math.min(this.next.y, that.box.top - this.dim.h / 2);
                this.vel.y = 0;
                this.ground = true;
                return;
            }
        } else if (collides.bottom) {
            this.next.y = Math.max(this.next.y, that.box.bottom + this.dim.h / 2);
            this.vel.y = 0;
            return;
        }
        if (this.vel.x >= 0) {
            if (collides.left) {
                this.next.x = Math.min(this.next.x, that.box.left - this.dim.w / 2);
                this.vel.x = 0;
            }
        } else if (collides.right) {
            this.next.x = Math.max(this.next.x, that.box.right + this.dim.w / 2);
            this.vel.x = 0;
        }
    }

    execMove() {
        this.pos = this.next;
    }
}

export { Mover };