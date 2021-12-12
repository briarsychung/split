import { Interactive } from './interactive.mjs';

class Link extends Interactive {
    constructor(pos, dim, texture, offset, object) {
        super(pos, dim, texture, offset);

        this.object = object;
    }

    trigger() {
        if (this.pressed.length) {
            this.object.die(false);
        }

        super.trigger();
    }
}

export { Link };