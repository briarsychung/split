class Object {
    constructor(url, pos, dim) {
        this.url = url;
        this.pos = pos;
        this.dim = dim;

        this.base = pos;
        this.vel = { x: 0, y: 0 };
        this.box = {};
        this.player = null;

        this.npos = { ...this.pos };
        this.cpos = { ...this.pos };
        this.nvel = { ...this.vel };
        this.cvel = { ...this.vel };

        this.image = document.createElement('canvas');
        this.image.width = dim.w;
        this.image.height = dim.h;

        let source = new Image();
        source.src = url;
        source.addEventListener('load', () => {
            for (let x = 0; x < dim.w; x += source.width) {
                for (let y = 0; y < dim.h; y += source.height) {
                    this.image.getContext('2d').drawImage(source, x, y);
                }
            }
        });

        this.dead = false;
        this.waiting = false;
    }

    init() {
        this.pos = { ...this.base };
        this.vel = { x: 0, y: 0 };
        this.dead = this.waiting;
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
    }

    die(state = true) {
        this.dead = state;
    }

    wait() {
        this.waiting = true;
        this.dead = true;
    }
}

export { Object };