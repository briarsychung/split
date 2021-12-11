import { Object } from './object.mjs';

class Mover extends Object {
    constructor(url, pos, dim) {
        super(url, pos, dim);

        this.touch = { top: null, bottom: null, left: null, right: null };
        this.ground = null;
    }

    update() {
        this.nvel = {...this.vel};
        
        this.rel = { x: 0, y: 0 };
        this.inf = { x: 0, y: 0 };

        this.ground = { ...this.touch.bottom };
        while(this.ground) {
            if (!this.ground.touch) break;
            this.ground = { ...this.ground.touch.bottom };
        }

        if (this.ground.vel) {
            this.inf.x = this.ground.vel.x;
            //this.inf.y = this.ground.vel.y;
        }
        
        this.touch = { top: null, bottom: null, left: null, right: null };

        this.nvel.x += this.inf.x;
        this.nvel.y += this.inf.y;

        super.update();
    }

    detectObject(that) {
        if (!(this.box.top <= that.box.bottom && this.box.bottom >= that.box.top &&
            this.box.left <= that.box.right && this.box.right >= that.box.left)) return;

        let y = false;

        if (this.vel.y >= that.nvel.y && this.pos.y < that.box.top && that.box.top > this.box.top && that.box.top <= this.box.bottom) {
            if (!this.touch.bottom || (this.touch.bottom.npos.y - this.touch.bottom.dim.h / 2 > that.npos.y - that.dim.h / 2)) {
                this.touch.bottom = that;
            }
            y = true;
        } 
        if (this.vel.y <= that.nvel.y && this.pos.y > that.box.bottom && that.box.bottom >= this.box.top && that.box.bottom < this.box.bottom) {
            if (!this.touch.top || (this.touch.top.npos.y + this.touch.top.dim.h / 2 > that.npos.y + that.dim.h / 2)) {
                this.touch.top = that;
            }
            y = true;
        }
        if (y) return;
        if (this.vel.x >= that.nvel.x && this.pos.x < that.box.left && that.box.left > this.box.left && that.box.left <= this.box.right) {
            if (!this.touch.right || (this.touch.right.npos.x - this.touch.right.dim.h / 2 > that.npos.x - that.dim.w / 2)) {
                this.touch.right = that;
            }
        }
        if (this.vel.x <= that.nvel.x && this.pos.x > that.box.right && that.box.right >= this.box.left && that.box.right < this.box.right) {
            if (!this.touch.left || (this.touch.left.npos.x + this.touch.left.dim.h / 2 > that.npos.x + that.dim.w / 2)) {
                this.touch.left = that;
            }
        }
    }

    correct(dir, axis, m) {
        let da = axis === 'x' ? 'w' : 'h';
        let obj = this.touch[dir];
        if (obj) {
            let xt = 0;
            while(obj) {
                xt += obj.dim[da];
                if (!obj.touch || !obj.touch[dir]) break;
                obj = obj.touch[dir];
            }
            let correct = obj.npos[axis] + m * (obj.dim[da] / 2 - this.dim[da] / 2 - xt);
            if (correct * m < this.cpos[axis] * m) {
                this.cvel[axis] = m === 1 ? Math.min(obj.nvel[axis], this.nvel[axis]) : Math.max(obj.nvel[axis], this.nvel[axis]);
                this.cpos[axis] = correct;
            }
        }
    }

    move() {
        this.correct('left', 'x', -1);
        this.correct('right', 'x', 1);
        this.correct('top', 'y', -1);
        this.correct('bottom', 'y', 1);

        super.move();

        if (this.ground.vel) this.vel.x -= this.ground.vel.x;
        //this.vel.y -= this.rel.y;

        this.vel.y += 0.75;
        
        this.vel.x *= this.touch.bottom ? 0.75 : 0.875;
        this.vel.y *= 0.9375;
    }
}

export { Mover };