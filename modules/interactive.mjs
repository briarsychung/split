import { Rectangle } from './rectangle.mjs';

class Interactive extends Rectangle {
    constructor(url, pos, dim) {
        super(url, pos, dim);

        this.pressed = null;
        this.active = null;
    }

    update() {
        this.pressed = null;
        this.active = null;

        super.update();
    }

    press(object) {
        this.pressed = object;
    }
}

export { Interactive };