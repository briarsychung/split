import { Interactive } from './interactive.mjs';
import { Player } from './player.mjs';

class Goal extends Interactive {
    constructor(texture, pos) {
        super(texture, pos, { w: 16, h: 2 });

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