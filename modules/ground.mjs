import { Rectangle } from './rectangle.mjs';

class Ground extends Rectangle {
    constructor(url, pos, dim) {
        super(url, pos, dim);
    }

    die() { }
}

export { Ground };