import { Rectangle } from './rectangle.mjs';

class Ground extends Rectangle {
    constructor(texture, pos, dim) {
        super(texture, pos, dim);
    }

    die() { }
}

export { Ground };