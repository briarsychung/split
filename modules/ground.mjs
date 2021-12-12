import { Rectangle } from './rectangle.mjs';

class Ground extends Rectangle {
    constructor(pos, dim, texture, offset) {
        super(pos, dim, texture, offset);
    }

    die() { }
}

export { Ground };