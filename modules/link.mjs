import { Interactive } from './interactive.mjs';

class Link extends Interactive {
    constructor(url, pos, dim, object) {
        super(url, pos, dim);

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