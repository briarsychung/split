import { Interactive } from './interactive.mjs';

class Link extends Interactive {
    constructor(texture, pos, dim, object) {
        super(texture, pos, dim);

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