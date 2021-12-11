import { Mover } from './mover.mjs';

class Player extends Mover {
    constructor(url) {
        super(url, { x: 0, y: 0 }, { w: 16, h: 16 });
    }
}

export { Player };