import { Mover } from './mover.mjs';

class Player extends Mover {
    constructor(sprite) {
        super(sprite.data.idle[0], { x: 0, y: 0 }, { w: 26, h: 33 });

        this.sprite = sprite;

        for (const KEY in this.sprite.data) {
            for (let i = 0; i < 2; i++) {
                this.sprite.data[KEY][i].dim = this.dim;
                this.sprite.data[KEY][i].load();
            }
        }

        this.dir = 1;
        this.state = 'idle';
    }

    move() {
        let nstate = 'idle';

        this.dir = this.vel.x === 0 ? this.dir : (this.vel.x > 0 ? 1 : 0);
        if (!this.touch.bottom) {
            this.texture = this.sprite.data.jump[this.dir];
            nstate = 'jump';
        } else if (Math.abs(this.vel.x) > 0.5) {
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
}

export { Player };