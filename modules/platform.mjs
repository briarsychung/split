import { Rectangle } from './Rectangle.mjs';

class Platform extends Rectangle {
    constructor(range, dim, texture, offset, mode = 'pause', speed = 2) {
        super(range[0], dim, texture, offset);

        this.range = range;
        this.mode = mode;
        this.speed = speed;

        this.start = mode;
        this.dir = 1;
        this.percent = 0;
    }

    init() {
        this.dir = 1;
        this.percent = 0;
        this.mode = this.start;

        super.init();
    }

    update() {
        if (['pause', 'stop'].includes(this.mode)) {
            this.nvel = { x: 0, y: 0 };
        } else {
            this.nvel = { ...this.vel };

            let dx = this.range[1].x - this.range[0].x;
            let dy = this.range[1].y - this.range[0].y;

            this.percent += this.dir * this.speed / Math.hypot(dx, dy);
            if (this.percent >= 1) {
                this.percent = 1;
                this.dir = -1;
                this.mode = this.mode === 'play' ? 'stop' : this.mode;
                this.nvel = {
                    x: this.range[1].x - this.pos.x,
                    y: this.range[1].y - this.pos.y
                }
            } else if (this.percent <= 0) {
                this.percent = 0;
                this.dir = 1;
                this.mode = this.mode === 'play' ? 'stop' : this.mode;
                this.nvel = {
                    x: this.range[0].x - this.pos.x,
                    y: this.range[0].y - this.pos.y
                }
            } else {
                this.nvel = {
                    x: this.dir * dx * this.speed / Math.hypot(dx, dy),
                    y: this.dir * dy * this.speed / Math.hypot(dx, dy)
                }
            }
        }

        super.update();
    }

    play() {
        this.mode = this.mode === 'pause' ? 'play' : this.mode;
    }
}

export { Platform };