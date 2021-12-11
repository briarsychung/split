import { Interactive } from './interactive.mjs';

class Boost extends Interactive {
    constructor(url, pos, dim, acc) {
        super(url, pos, dim);

        this.acc = acc;
    }

    trigger() {
        for (let i = 0; i < this.pressed.length; i++) {
            this.pressed[i].vel.x += this.acc.x;
            this.pressed[i].vel.y += this.acc.y;
        }

        super.trigger();
    }
}

export { Boost };