import { Mover } from './mover.mjs';

class Box extends Mover {
    constructor(pos, dim, texture, offset) {
        super(pos, dim, texture, offset);
    }
}

export { Box };