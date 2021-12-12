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
    }

    move() {
        let dir = this.vel.x > 0 ? 1 : 0;
        if (!this.touch.bottom) {
            this.texture = this.sprite.data.jump[dir];
        } else if (Math.abs(this.vel.x) > 0.5) {
            this.texture = this.sprite.data.run[dir];
        } else {
            this.texture = this.sprite.data.idle[dir];
        }

        super.move();
    }
}

export { Player };