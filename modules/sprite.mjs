import { Texture } from "./texture.mjs";
import { Animated } from "./animated.mjs";

class Sprite {
    constructor(url) {
        this.data = {
            idle:
                [new Animated([url + 'idle1.png', url + 'idle2.png'], { w: 26, h: 33 }, true),
                new Animated([url + 'idle1.png', url + 'idle2.png'], { w: 26, h: 33 })],
            run:
                [new Animated([url + 'run2.png', url + 'run1.png', url + 'run3.png', url + 'run1.png'], { w: 26, h: 33 }, true, 10),
                new Animated([url + 'run2.png', url + 'run1.png', url + 'run3.png', url + 'run1.png'], { w: 26, h: 33 }, false, 10)],
            jump: [new Texture(url + 'jump.png', { w: 26, h: 33 }, true), new Texture(url + 'jump.png', { w: 26, h: 33 })],
            dead: [new Texture(url + 'dead.png', { w: 26, h: 33 }, true), new Texture(url + 'dead.png', { w: 26, h: 33 })]
        };
    }
}

export { Sprite };