class Object {
    constructor(url, pos, dim) {
        this.url = url;
        this.pos = pos;
        this.dim = dim;

        this.vel = { x: 0, y: 0 };
        this.next = {};
        this.box = {};
        this.update();

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
    }

    iter() {
        this.update();
    }

    update() {
        this.next = {
            x: this.pos.x + this.vel.x,
            y: this.pos.y + this.vel.y
        }

        this.box = {
            top: this.pos.y - this.dim.h / 2 + (this.vel.y < 0 ? this.vel.y : 0),
            bottom: this.pos.y + this.dim.h / 2 + (this.vel.y > 0 ? this.vel.y : 0),
            left: this.pos.x - this.dim.w / 2 + (this.vel.x < 0 ? this.vel.x : 0),
            right: this.pos.x + this.dim.w / 2 + (this.vel.x > 0 ? this.vel.x : 0)
        }
    }

    move() {
        this.pos = this.next;
    }
}

export { Object };