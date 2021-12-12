import { Rectangle } from './rectangle.mjs';

class Interactive extends Rectangle {
    constructor(texture, pos, dim) {
        super(texture, pos, dim);

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