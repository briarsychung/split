import { Object } from './object.mjs';

class Platform extends Object {
    constructor(url, range, dim, speed) {
        super(url, range[0], dim);
        this.range = range;
        this.speed = speed;

        this.dir = 1;
        this.percent = 0;
    }
    
    update() {
        let dx = this.range[1].x - this.range[0].x;
        let dy = this.range[1].y - this.range[0].y;

        this.percent += this.dir * this.speed / Math.hypot(dx, dy);
        if (this.percent >= 1) {
            this.percent = 1;
            this.dir = -1;
        } else if (this.percent <= 0) {
            this.percent = 0;
            this.dir = 1;
        }
        
        this.vel = {
            x: this.dir * dx * this.speed / Math.hypot(dx, dy),
            y: this.dir * dy * this.speed / Math.hypot(dx, dy)
        }

        super.update();
    }
}

export { Platform };