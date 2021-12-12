import { Button } from './button.mjs';

class Portal extends Button {
    constructor(pos, dim, texture, offset, destination, denied = []) {
        super(pos, dim, texture, offset);

        this.destination = destination;
        this.denied = denied;
    }

    trigger() {
        for (let i = 0; i < this.pressed.length; i++) {
            if (this.denied.includes(this.pressed[i].constructor.name)) continue;
            this.pressed[i].pos.x += this.destination.x - this.pos.x;
            this.pressed[i].pos.y += this.destination.y - this.pos.y;
        }

        super.trigger();
    }
}

export { Portal };