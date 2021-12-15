import { Interactive } from './interactive.mjs';

class Door extends Interactive {
    constructor(pos, dim, textures, offset, platform) {
        super(pos, dim, textures[0], offset);

        this.textures = textures;
        this.platform = platform;

        this.sound = new Audio('./assets/sound/button.wav');
        this.ps = false;
    }

    trigger() {
        if (this.pressed.length) {
            this.platform.play();
            this.texture = this.textures[1];

            if (!this.ps) {
                this.sound.currentTime = 0;
                this.sound.play();
                this.ps = true;
            }
        } else {
            this.texture = this.textures[0];

            this.ps = false;
        }

        super.trigger();
    }
}

export { Door };