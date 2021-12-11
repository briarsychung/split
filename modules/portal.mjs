import { Button } from './button.mjs';

class Portal extends Button {
    constructor(url, pos, dim, destination) {
        super(url, pos, dim);
        
        this.destination = destination;
    }

    trigger() {
        for (let i = 0; i < this.pressed.length; i++) {
            this.pressed[i].pos.x += this.destination.x - this.pos.x;
            this.pressed[i].pos.y += this.destination.y - this.pos.y;
        }

        super.trigger();
    }
}

export { Portal };