import { Interactive } from './interactive.mjs';

class Door extends Interactive {
    constructor(pos, dim, textures, offset, platform) {
        super(pos, dim, textures[0], offset);

        this.textures = textures;
        this.platform = platform;
    }

    trigger() {
        if (this.pressed.length) {
            this.platform.play();
            this.texture = this.textures[1];
        } else {
            this.texture = this.textures[0];
        }

        super.trigger();
    }
}

export { Door };