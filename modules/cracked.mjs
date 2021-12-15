import { Interactive } from './interactive.mjs';

class Cracked extends Interactive {
    constructor(pos, dim, texture, offset, life = 60) {
        super(pos, dim, texture, offset);

        this.life = life;
        this.max = life;
    }

    init() {
        this.life = this.max;

        super.init();
    }

    trigger() {
        if (this.pressed.length) this.life--;
        if (this.life === 0) this.die();

        super.trigger();
    }
}

export { Cracked };