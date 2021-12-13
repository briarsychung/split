import { Mover } from "./mover.mjs";
import { Texture } from "./texture.mjs";

class Boss extends Mover {
    constructor(pos) {
        super(pos, { w: 96, h: 119 }, new Texture('../assets/npc/wizard.png', { w: 96, h: 119 }), { x: 0, y: 0 });

        this.boss = true;
    }
}

export { Boss };