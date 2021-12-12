import { Mover } from './mover.mjs';

class Player extends Mover {
    constructor(texture) {
        super(texture, { x: 0, y: 0 }, { w: 26, h: 33 });
    }
}

export { Player };