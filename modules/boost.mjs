import { Interactive } from './interactive.mjs';

class Boost extends Interactive {
    constructor(pos, dim, texture, offset, acc) {
        super(pos, dim, texture, offset);

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