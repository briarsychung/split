import { Button } from './button.mjs';

class Door extends Button {
    constructor(url, pos, dim, platform) {
        super(url, pos, dim);

        this.platform = platform;
    }

    trigger() {
        if (this.pressed) this.platform.play();

        super.trigger();
    }
}

export { Door };