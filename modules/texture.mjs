class Texture {
    constructor(url, dim, reverse = false) {
        this.url = url;
        this.dim = dim;
        this.reverse = reverse;

        this.image = this.generate(this.url, this.reverse);
    }

    generate(url, dir = false) {
        let canvas = document.createElement('canvas');
        canvas.width = this.dim.w;
        canvas.height = this.dim.h;

        let source = new Image();
        source.src = url;
        source.addEventListener('load', () => {
            if (dir) {
                canvas.getContext('2d').translate(source.width, 0);
                canvas.getContext('2d').scale(-1, 1);
            }
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