import { Texture } from "./texture.mjs";
import { Animated } from "./animated.mjs";

class Sprite {
    constructor(url) {
        this.data = {
            idle:
                [new Animated([url + 'idle1.png', url + 'idle2.png'], true),
                new Animated([url + 'idle1.png', url + 'idle2.png'])],
            run:
                [new Animated([url + 'run1.png', url + 'run2.png', url + 'run3.png', url + 'run2.png'], true, 10),
                new Animated([url + 'run1.png', url + 'run2.png', url + 'run3.png', url + 'run2.png'], false, 10)],
            jump: [new Texture(url + 'jump.png', true), new Texture(url + 'jump.png')],
            dead: [new Texture(url + 'dead.png', true), new Texture(url + 'dead.png')]
        };
    }
}

export { Sprite };