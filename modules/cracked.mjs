import { Interactive } from './interactive.mjs';

class Cracked extends Interactive {
    constructor(url, pos, dim, life = 60) {
        super(url, pos, dim);

        this.max = life;
        this.life = life;
    }

    init() {
        this.life = this.max;

        super.init();
    }

    trigger() {
        if (this.pressed.length) this.life--;
        if (this.life === 0) {
            this.die();
        }

        super.trigger();
    }
}

export { Cracked };