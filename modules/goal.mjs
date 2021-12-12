import { Interactive } from './interactive.mjs';
import { Player } from './player.mjs';

class Goal extends Interactive {
    constructor(pos, dim, texture, offset) {
        super(pos, dim, texture, offset);

        this.player = false;
    }

    update() {
        this.player = false;

        super.update();
    }

    press(object) {
        if (object instanceof Player) this.player = true;

        super.press(object);
    }
}

export { Goal };