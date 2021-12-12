class Texture {
    constructor(url) {
        this.url = url;
        this.dim = { w: 0, h: 0 };
    }

    load() {
        this.image = document.createElement('canvas');
        this.image.width = this.dim.w;
        this.image.height = this.dim.h;

        let source = new Image();
        source.src = this.url;
        source.addEventListener('load', () => {
            for (let x = 0; x < this.dim.w; x += source.width) {
                for (let y = 0; y < this.dim.h; y += source.height) {
                    this.image.getContext('2d').drawImage(source, x, y);
                }
            }
        });
    }

    draw() {
        return this.image;
    }
}

export { Texture };