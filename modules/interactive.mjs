import { Rectangle } from './rectangle.mjs';

class Interactive extends Rectangle {
    constructor(pos, dim, texture, offset) {
        super(pos, dim, texture, offset);

        this.pressed = [];
    }

    update() {
        this.pressed = [];

        super.update();
    }

    press(object) {
        this.pressed.push(object);
    }

    trigger() { }
}

export { Interactive };