import { Interactive } from './interactive.mjs';
import { Texture } from './texture.mjs';

class Portal extends Interactive {
    constructor(range) {
        let textures =
            [new Texture('../assets/interactive/portal-inactive.png', { w: 32, h: 32 }),
            new Texture('../assets/interactive/portal-active1.png', { w: 32, h: 32 }),
            new Texture('../assets/interactive/portal-active2.png', { w: 32, h: 32 }),
            new Texture('../assets/interactive/portal-active1.png', { w: 32, h: 32 })];

        super(range[0], { w: 32, h: 32 }, textures[0], { x: 0, y: -32 });

        this.textures = textures;
        this.destination = range[1];
        this.stage = 0;
    }

    init() {
        this.stage = 0;

        super.init();
    }

    trigger() {
        this.stage = this.stage === 0 ? 0 : this.stage - 1;

        for (let i = 0; i < this.pressed.length; i++) {
            this.pressed[i].pos.x += this.destination.x - this.pos.x;
            this.pressed[i].pos.y += this.destination.y - this.pos.y;
            this.stage = 15;
        }
        
        this.texture = this.textures[Math.floor(this.stage / 4)];

        super.trigger();
    }
}

export { Portal };