class Object {
    constructor(pos, dim, texture, offset = { x: 0, y: 0 }) {
        this.pos = pos;
        this.dim = dim;
        this.texture = texture;
        this.offset = offset;

        this.base = pos;
        this.vel = { x: 0, y: 0 };
        this.box = {};
        this.player = null;

        this.npos = { ...this.pos };
        this.cpos = { ...this.pos };
        this.nvel = { ...this.vel };
        this.cvel = { ...this.vel };

        this.dead = false;
        this.waiting = false;
        this.fade = 100;

        this.sound = new Audio('../assets/sound/death.wav');
    }

    init() {
        this.pos = { ...this.base };
        this.vel = { x: 0, y: 0 };
        this.dead = this.waiting;
        this.fade = this.waiting ? 0 : 50;
    }

    update() {
        this.npos = {
            x: this.pos.x + this.nvel.x,
            y: this.pos.y + this.nvel.y
        }

        this.cpos = { ...this.npos };
        this.cvel = { ...this.nvel };

        this.box = {
            top: this.pos.y - this.dim.h / 2 + (this.nvel.y < 0 ? this.nvel.y : 0),
            bottom: this.pos.y + this.dim.h / 2 + (this.nvel.y > 0 ? this.nvel.y : 0),
            left: this.pos.x - this.dim.w / 2 + (this.nvel.x < 0 ? this.nvel.x : 0),
            right: this.pos.x + this.dim.w / 2 + (this.nvel.x > 0 ? this.nvel.x : 0)
        }

        this.player = null;
    }

    move() {
        this.pos = { ...this.cpos };
        this.vel = { ...this.cvel };

        if (this.pos.y > 1024) {
            this.die();
        }
    }

    die(state = true) {
        this.dead = state;

        if (this.dead) {
            this.sound.currentTime = 0;
            this.sound.play();
        }
    }

    wait() {
        this.waiting = true;
        this.dead = true;
        this.fade = 0;
    }

    dying() {
        this.fade = this.fade === 0 ? 0 : this.fade - 1;
        return this.fade / 100;
    }
}

export { Object };