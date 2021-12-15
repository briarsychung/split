import { Object } from './object.mjs';

class Mover extends Object {
    constructor(pos, dim, texture, offset) {
        super(pos, dim, texture, offset);

        this.touch = { top: null, bottom: null, left: null, right: null };
        this.ground = null;
    }

    update() {
        this.nvel = { ...this.vel };
        this.touch = { top: null, bottom: null, left: null, right: null };

        super.update();
    }

    detectObject(that) {
        let collide = [false, false, false, false];

        if (!(this.box.top <= that.box.bottom && this.box.bottom >= that.box.top &&
            this.box.left <= that.box.right && this.box.right >= that.box.left)) return;

        if ((this.pos.y + this.dim.h / 2 < that.pos.y - that.dim.h / 2 && this.npos.y + this.dim.h / 2 < that.npos.y - that.dim.h / 2) ||
            (this.pos.y - this.dim.h / 2 > that.pos.y + that.dim.h / 2 && this.npos.y - this.dim.h / 2 > that.npos.y + that.dim.h / 2) ||
            (this.pos.x + this.dim.w / 2 < that.pos.x - that.dim.w / 2 && this.npos.x + this.dim.w / 2 < that.npos.x - that.dim.w / 2) ||
            (this.pos.x - this.dim.w / 2 > that.pos.x + that.dim.w / 2 && this.npos.x - this.dim.w / 2 > that.npos.x + that.dim.w / 2)) return;

        if (this.pos.y < that.box.top && that.box.top > this.box.top && that.box.top <= this.box.bottom && this.nvel.y >= that.nvel.y &&
            this.pos.x + this.dim.w / 2 > that.pos.x - that.dim.w / 2 && this.pos.x - this.dim.w / 2 < that.pos.x + that.dim.w / 2) {
            if (!this.touch.bottom ||
                (this.touch.bottom.npos.y - this.touch.bottom.dim.h / 2 > that.npos.y - that.dim.h / 2) ||
                (this.touch.bottom.npos.y - this.touch.bottom.dim.h / 2 === that.npos.y - that.dim.h / 2 &&
                    Math.abs(this.touch.bottom.npos.x - this.npos.x) > Math.abs(that.npos.x - this.npos.x))) {
                collide[1] = true;
            }
        }
        if (this.pos.y > that.box.bottom && that.box.bottom >= this.box.top && that.box.bottom < this.box.bottom && this.nvel.y <= that.nvel.y &&
            this.pos.x + this.dim.w / 2 > that.pos.x - that.dim.w / 2 && this.pos.x - this.dim.w / 2 < that.pos.x + that.dim.w / 2) {
            if (!this.touch.top ||
                (this.touch.top.npos.y + this.touch.top.dim.h / 2 > that.npos.y + that.dim.h / 2) ||
                (this.touch.top.npos.y + this.touch.top.dim.h / 2 === that.npos.y + that.dim.h / 2 &&
                    Math.abs(this.touch.top.npos.x - this.npos.x) > Math.abs(that.npos.x - this.npos.x))) {
                collide[0] = true;
            }
        }

        if (this.pos.x < that.box.left && that.box.left > this.box.left && that.box.left <= this.box.right && this.nvel.x >= that.nvel.x &&
            this.pos.y + this.dim.h / 2 > that.pos.y - that.dim.h / 2 && this.pos.y - this.dim.h / 2 < that.pos.y + that.dim.h / 2) {
            if (!this.touch.right ||
                (this.touch.right.npos.x - this.touch.right.dim.h / 2 > that.npos.x - that.dim.w / 2) ||
                (this.touch.right.npos.x - this.touch.right.dim.h / 2 === that.npos.x - that.dim.w / 2 &&
                    Math.abs(this.touch.right.npos.y - this.npos.y) > Math.abs(that.npos.y - this.npos.y))) {
                collide[3] = true;
            }
        }
        if (this.pos.x > that.box.right && that.box.right >= this.box.left && that.box.right < this.box.right && this.nvel.x <= that.nvel.x &&
            this.pos.y + this.dim.h / 2 > that.pos.y - that.dim.h / 2 && this.pos.y - this.dim.h / 2 < that.pos.y + that.dim.h / 2) {
            if (!this.touch.left ||
                (this.touch.left.npos.x + this.touch.left.dim.h / 2 > that.npos.x + that.dim.w / 2) ||
                (this.touch.left.npos.x + this.touch.left.dim.h / 2 > that.npos.x + that.dim.w / 2 &&
                    Math.abs(this.touch.left.npos.y - this.npos.y) > Math.abs(that.npos.y - this.npos.y))) {
                collide[2] = true;
            }
        }

        if ((collide[0] || collide[1]) && (collide[2] || collide[3])) {
            if (this.pos.y + this.dim.h / 2 > that.pos.y - that.dim.h / 2 || this.pos.y - this.dim.h / 2 < that.pos.y + that.dim.h / 2) {
                collide[0] = false;
                collide[1] = false;
            } else {
                collide[2] = false;
                collide[3] = false;
            }
        }

        if (collide[0]) this.touch.top = that;
        if (collide[1]) this.touch.bottom = that;
        if (collide[2]) this.touch.left = that;
        if (collide[3]) this.touch.right = that;
    }

    correct(dir, axis, m) {
        let da = axis === 'x' ? 'w' : 'h';
        let obj = this.touch[dir];
        if (obj) {
            let xt = 0;
            while (obj) {
                if (obj.boss) this.die();
                xt += obj.dim[da];
                if (!obj.touch || !obj.touch[dir]) break;
                obj = obj.touch[dir];
            }
            return {
                pos: obj.npos[axis] + m * (obj.dim[da] / 2 - this.dim[da] / 2 - xt),
                vel: m === 1 ? Math.min(obj.nvel[axis], this.nvel[axis]) : Math.max(obj.nvel[axis], this.nvel[axis]),
                force: obj instanceof Mover ? 1 : 2
            };
        }
        return {
            pos: this.npos[axis],
            vel: this.nvel[axis],
            force: 0
        };
    }

    move() {
        let adjust = {
            left: this.correct('left', 'x', -1),
            right: this.correct('right', 'x', 1),
            top: this.correct('top', 'y', -1),
            bottom: this.correct('bottom', 'y', 1)
        };

        if ((adjust.left.force === 2 && adjust.right.force === 2) || (adjust.top.force === 2 && adjust.bottom.force === 2)) this.die();

        this.cpos = {
            x: adjust.left.force > adjust.right.force ? adjust.left.pos : adjust.right.pos,
            y: adjust.top.force > adjust.bottom.force ? adjust.top.pos : adjust.bottom.pos
        };
        this.cvel = {
            x: adjust.left.force > adjust.right.force ? adjust.left.vel : adjust.right.vel,
            y: adjust.top.force > adjust.bottom.force ? adjust.top.vel : adjust.bottom.vel
        };

        super.move();

        this.vel.x *= this.touch.bottom ? 0.5 : 0.75;
        this.vel.y *= 0.9375;
        this.vel.y += 0.5;
    }

    influence() {
        this.ground = this.touch.bottom;
        if (this.ground) this.vel.x += this.ground.vel.x / 2;
        if (this.ground && this.ground.press) this.ground.press(this);
        while (this.ground) {
            if (!this.ground.touch || !this.ground.touch.bottom) break;
            this.ground = this.ground.touch.bottom;
        }
    }
}

export { Mover };