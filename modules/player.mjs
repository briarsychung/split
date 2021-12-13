import { Mover } from './mover.mjs';

class Player extends Mover {
    constructor(sprite) {
        super({ x: 0, y: 0 }, { w: 22, h: 30 }, sprite.data.idle[0], { x: 0, y: -1.5 });

        this.sprite = sprite;

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
            this.texture = this.sprite.data.jump[this.dir];
            nstate = 'jump';
        } else if (Math.abs(real) > 0.25) {
            this.texture = this.sprite.data.run[this.dir];
            nstate = 'run';
        } else {
            this.texture = this.sprite.data.idle[this.dir];
        }

        if (this.state !== nstate && this.texture.start) {
            this.texture.start();
        }
        this.state = nstate;

        super.move();
    }

    die() {
        let real = this.nvel.x - (this.ground ? this.ground.nvel.x : 0);
        this.dir = real === 0 ? this.dir : (real > 0 ? 1 : 0);

        this.texture = this.sprite.data.dead[this.dir];

        super.die();
    }
}

export { Player };