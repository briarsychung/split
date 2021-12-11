import { Mover } from './mover.mjs';

class Box extends Mover {
    constructor(url, pos, dim) {
        super(url, pos, dim);
    }
}

export { Box };