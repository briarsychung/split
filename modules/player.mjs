import { Mover } from './mover.mjs';

class Player extends Mover {
    constructor(url) {
        super(url, { x: 0, y: 0 }, { w: 16, h: 16 });
    }

    move() {
        super.move();

        if (this.touch.bottom) this.touch.bottom.player = this;
    }
}

export { Player };