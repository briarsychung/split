import { Mover } from './mover.mjs';
import { Texture } from './texture.mjs';
import { Animated } from './animated.mjs';

class Player extends Mover {
    constructor(url) {
        let data = {
            idle:
                [new Animated([url + 'idle1.png', url + 'idle2.png'], { w: 26, h: 33 }, true),
                new Animated([url + 'idle1.png', url + 'idle2.png'], { w: 26, h: 33 })],
            run:
                [new Animated([url + 'run2.png', url + 'run1.png', url + 'run3.png', url + 'run1.png'], { w: 26, h: 33 }, true, 10),
                new Animated([url + 'run2.png', url + 'run1.png', url + 'run3.png', url + 'run1.png'], { w: 26, h: 33 }, false, 10)],
            jump: [new Texture(url + 'jump.png', { w: 26, h: 33 }, true), new Texture(url + 'jump.png', { w: 26, h: 33 })],
            dead: [new Texture(url + 'dead.png', { w: 26, h: 33 }, true), new Texture(url + 'dead.png', { w: 26, h: 33 })]
        };

        super({ x: 0, y: 0 }, { w: 22, h: 30 }, data.idle[1], { x: 0, y: -1.5 });

        this.data = data;
        this.dir = 1;
        this.state = 'idle';
    }

    init() {
        this.dir = 1;
        this.state = 'idle';

        super.init();
    }

    move() {
        let nstate = 'idle';
        let real = this.nvel.x - (this.ground ? this.ground.nvel.x : 0);
        this.dir = real === 0 ? this.dir : (real > 0 ? 1 : 0);

        if (!this.touch.bottom) {
            this.texture = this.data.jump[this.dir];
            nstate = 'jump';
        } else if (Math.abs(real) > 0.25) {
            this.texture = this.data.run[this.dir];
            nstate = 'run';
        } else {
            this.texture = this.data.idle[this.dir];
        }

        if (this.state !== nstate && this.texture.start) this.texture.start();
        this.state = nstate;

        super.move();
    }

    die() {
        let real = this.nvel.x - (this.ground ? this.ground.nvel.x : 0);
        this.dir = real === 0 ? this.dir : (real > 0 ? 1 : 0);

        this.texture = this.data.dead[this.dir];

        super.die();
    }
}

export { Player };