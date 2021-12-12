import { Mover } from './mover.mjs';

class Box extends Mover {
    constructor(texture, pos, dim) {
        super(texture, pos, dim);
    }
}

export { Box };