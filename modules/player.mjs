import { Mover } from './mover.mjs';

class Player extends Mover {
    constructor(url, pos = { x: 0, y: 0 }) {
        super(url, pos, { w: 16, h: 16 }, true);
    }
}

export { Player };