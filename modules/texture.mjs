class Texture {
    constructor(url) {
        this.url = url;

        this.dim = { w: 0, h: 0 };
        this.image = null;
    }

    load() {
        this.image = this.generate(this.url);
    }

    generate(url) {
        let canvas = document.createElement('canvas');
        canvas.width = this.dim.w;
        canvas.height = this.dim.h;

        let source = new Image();
        source.src = url;
        source.addEventListener('load', () => {
            for (let x = 0; x < this.dim.w; x += source.width) {
                for (let y = 0; y < this.dim.h; y += source.height) {
                    canvas.getContext('2d').drawImage(source, x, y);
                }
            }
        });

        return canvas;
    }

    draw() {
        return this.image;
    }
}

export { Texture };