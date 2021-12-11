import { Interactive } from './interactive.mjs';

class Spike extends Interactive {
    constructor(url, pos, dim) {
        super(url, pos, dim);
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