import { Rectangle } from './rectangle.mjs';

class Interactive extends Rectangle {
    constructor(url, pos, dim) {
        super(url, pos, dim);

        this.pressed = [];
    }

    update() {
        this.pressed = [];

        super.update();
    }

    press(object) {
        this.pressed.push(object);
    }
}

export { Interactive };