import { Object } from './object.mjs';

class Mover extends Object {
    constructor(url, pos, dim) {
        super(url, pos, dim);
        this.ground = null;
    }

    iter() {
        this.vel.x += this.ground ? this.ground.vel.x : 0;
        this.vel.y += this.ground ? this.ground.vel.y : 0;

        this.vel.x *= this.ground ? 0.75 : 0.875;
        this.vel.y *= 0.9375;
        this.vel.y += 0.75;

        this.ground = null;

        this.update();
    }

    detectObject(that) {
        if (!(this.box.top < that.box.bottom && this.box.bottom > that.box.top &&
            this.box.left < that.box.right && this.box.right > that.box.left)) return;

        if (this.vel.y >= 0) {
            if (this.pos.y < that.box.top && that.box.top > this.box.top && that.box.top < this.box.bottom) {
                this.vel.y = 0;
                let correct = that.box.top - this.dim.h / 2;
                if (this.next.y > correct) {
                    this.next.y = correct;
                    this.ground = that;
                }
                return;
            }
        } else if (this.pos.y > that.box.bottom && that.box.bottom > this.box.top && that.box.bottom < this.box.bottom) {
            this.vel.y = 0;
            let correct = that.box.bottom + this.dim.h / 2;
            if (this.next.y < correct) {
                this.next.y = correct;
            }
            return;
        }
        if (this.vel.x >= 0) {
            if (this.pos.x < that.box.left && that.box.left > this.box.left && that.box.left < this.box.right) {
                this.vel.x = 0;
                let correct = that.box.left - this.dim.w / 2;
                if (this.next.x > correct) {
                    this.next.x = correct;
                }
                return;
            }
        } else if (this.pos.x > that.box.right && that.box.right > this.box.left && that.box.right < this.box.right) {
            this.vel.x = 0;
            let correct = that.box.right + this.dim.w / 2;
            if (this.next.x < correct) {
                this.next.x = correct;
            }
        }
    }
}

export { Mover };