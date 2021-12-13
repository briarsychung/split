import { Interactive } from './interactive.mjs';

class Link extends Interactive {
    constructor(pos, dim, texture, offset, object) {
        super(pos, dim, texture, offset);

        this.object = object;

        this.object.wait();
        this.played = false;
    }

    init() {
        this.played = false;

        super.init();
    }

    trigger() {
        if (this.pressed.length && !this.played) {
            this.object.die(false);
            this.played = true;
        }

        super.trigger();
    }
}

export { Link };