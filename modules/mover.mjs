import { Object } from './object.mjs';

class Mover extends Object {
    constructor(url, pos, dim) {
        super(url, pos, dim);
        this.ground = null;

        this.tx = false;
        this.ty = false;
    }

    update() {
        this.vel.x *= this.ground ? 0.75 : 0.875;
        this.vel.y *= 0.9375;
        this.vel.y += 0.75;

        //super.update();
    }

    iter() {
        this.vel.x += this.ground ? this.ground.vel.x : 0;
        this.vel.y += this.ground ? this.ground.vel.y : 0;
        console.log(this.ground);
        this.ground = null;
        super.update();
        this.tx = false;
        this.ty = false;
    }

    detectObject(that) {
        if (!(this.box.top < that.box.bottom && this.box.bottom > that.box.top &&
            this.box.left < that.box.right && this.box.right > that.box.left)) return;

        let y = false;

        if (this.vel.y >= that.vel.y && this.pos.y < that.box.top && that.box.top > this.box.top && that.box.top < this.box.bottom) {
            this.nvel.y = 0;
            let correct = that.box.top - this.dim.h / 2;
            if (this.npos.y > correct) {
                this.npos.y = correct;
                this.ground = that;
            }
            y = true;
        } 
        if (this.vel.y <= that.vel.y && this.pos.y > that.box.bottom && that.box.bottom > this.box.top && that.box.bottom < this.box.bottom) {
            this.nvel.y = 0;
            let correct = that.box.bottom + this.dim.h / 2;
            if (this.npos.y < correct) {
                this.npos.y = correct;
            }
            y = true;
        }
        if (y) return;
        if (this.vel.x >= that.vel.x && this.pos.x < that.box.left && that.box.left > this.box.left && that.box.left < this.box.right) {
            this.nvel.x = 0;
            let correct = that.box.left - this.dim.w / 2;
            if (this.npos.x > correct) {
                this.npos.x = correct;
            }
        }
        if (this.vel.x <= that.vel.x && this.pos.x > that.box.right && that.box.right > this.box.left && that.box.right < this.box.right) {
            this.nvel.x = 0;
            let correct = that.box.right + this.dim.w / 2;
            if (this.npos.x < correct) {
                this.npos.x = correct;
            }
        }
    }

    move() {
        super.move();

        this.vel.x -= this.ground ? this.ground.vel.x : 0;
        this.vel.y -= this.ground ? this.ground.vel.y : 0;
    }
}

export { Mover };