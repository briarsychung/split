import { Interactive } from './interactive.mjs';
import { Texture } from './texture.mjs';
import { Player } from './player.mjs';

class Combiner extends Interactive {
    constructor(pos) {
        super(pos, { w: 32, h: 32 }, new Texture('./assets/effects/magic-big.png', { w: 32, h: 32 }), { x: 0, y: 0 });

        this.player = false;

        this.wait();
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
        if (object instanceof Player) {
            this.player = true;
            this.die();
        }

        super.press(object);
    }
}

export { Combiner };