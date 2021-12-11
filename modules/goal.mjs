import { Interactive } from './interactive.mjs';
import { Player } from './player.mjs';

class Goal extends Interactive {
    constructor(url, pos) {
        super(url, pos, { w: 16, h: 2 });
    }

    press(object) {
        if (object instanceof Player) this.active = object;

        super.press(object);
    }
}

export { Goal };