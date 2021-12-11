import { Rectangle } from './Rectangle.mjs';

class Platform extends Rectangle {
    constructor(url, range, dim, speed, mode = 'loop') {
        super(url, range[0], dim);

        this.range = range;
        this.speed = speed;
        this.start = mode;
        this.mode = mode;

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
            } else if (this.percent <= 0) {
                this.percent = 0;
                this.dir = 1;
                this.mode = this.mode === 'play' ? 'stop' : this.mode;
            }

            this.nvel = {
                x: this.dir * dx * this.speed / Math.hypot(dx, dy),
                y: this.dir * dy * this.speed / Math.hypot(dx, dy)
            }
        }

        super.update();
    }

    play() {
        this.mode = this.mode === 'pause' ? 'play' : this.mode;
    }
}

export { Platform };