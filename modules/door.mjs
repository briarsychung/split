import { Button } from './button.mjs';

class Door extends Button {
    constructor(textures, pos, dim, platform) {
        super(textures[0], pos, dim);

        this.textures = textures;

        this.textures[1].dim = dim;
        this.textures[1].load();

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