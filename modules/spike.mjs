import { Interactive } from './interactive.mjs';

class Spike extends Interactive {
    constructor(texture, pos, dim) {
        super(texture, pos, dim);
    }

    init() {
        this.life = this.max;

        super.init();
    }

    trigger() {
        for (let i = 0; i < this.pressed.length; i++) {
            this.pressed[i].die();
        }

        super.trigger();
    }
}

export { Spike };