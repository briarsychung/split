class Object {
    constructor(url, pos, dim) {
        this.url = url;
        this.pos = pos;
        this.dim = dim;
        this.box = {
            top: pos.y - dim.h / 2,
            bottom: pos.y + dim.h / 2,
            left: pos.x - dim.w / 2,
            right: pos.x + dim.w / 2
        };

        this.image = document.createElement('canvas');
        this.image.width = this.dim.w;
        this.image.height = this.dim.h;

        let source = new Image();
        source.src = url;
        source.addEventListener('load', () => {
            for (let x = 0; x < this.dim.w; x += source.width) {
                for (let y = 0; y < this.dim.h; y += source.height) {
                    this.image.getContext('2d').drawImage(source, x, y);
                }
            }
        });
    }

    calcBox() {
        this.box = {
            top: this.pos.y - this.dim.h / 2,
            bottom: this.pos.y + this.dim.h / 2,
            left: this.pos.x - this.dim.w / 2,
            right: this.pos.x + this.dim.w / 2
        }
    }
}

export { Object };