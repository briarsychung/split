import { Interactive } from './interactive.mjs';
import { Player } from './player.mjs';
import { Texture } from './texture.mjs';

class Goal extends Interactive {
    constructor(pos) {
        super(pos, { w: 32, h: 32 }, new Texture('./assets/ground/brick-door.png', { w: 32, h: 32 }), { x: 0, y: -32 });

        this.player = false;
    }

    init() {
        this.player = false;

        super.init();
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