import { Mover } from './mover.mjs';
import { Texture } from './texture.mjs';
import { Animated } from './animated.mjs';

class Boss extends Mover {
    constructor(pos) {
        let url = '../assets/wizard/wizard-';
        let data = {
            idle: new Animated([url + 'idle1.png', url + 'idle2.png'], { w: 94, h: 119 }),
            attack: new Animated([url + 'attack1.png', url + 'attack2.png'], { w: 94, h: 119 }),
            hostile: new Animated([url + 'hostile1.png', url + 'hostile2.png'], { w: 94, h: 119 }),
            transform: new Texture(url + 'transform.png', { w: 94, h: 119 }),
            dead: new Texture(url + 'dead.png', { w: 94, h: 119 })
        };

        super(pos, { w: 94, h: 119 }, data.idle, { x: 0, y: 0 });

        this.data = data;
        this.dir = 1;
        this.state = 'idle';
        this.nstate = 'idle';
        this.bye = 0;
        this.boss = true;
    }

    init() {
        this.dir = 1;
        this.state = 'idle';
        this.nstate = 'idle';

        super.init();
    }

    newState(state) {
        this.nstate = state;
    }

    move() {
        switch (this.nstate) {
            case 'attack':
                this.texture = this.data.attack;
                break;
            case 'hostile':
                this.texture = this.data.hostile;
                break;
            case 'bye':
                this.texture = this.data.transform;
                this.bye += 0.25;
                break;
            default:
                this.texture = this.data.idle;
        }

        if (this.state !== this.nstate && this.texture.start) {
            this.texture.start();
        }
        this.state = this.nstate;

        super.move();

        if (this.nstate === 'bye') this.vel.x += this.bye;
        if (this.nstate === 'bye') this.vel.y -= this.bye;
    }

    die() {
        this.texture = this.data.dead;

        super.die();
    }
}

export { Boss };