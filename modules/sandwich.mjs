import { Texture } from './texture.mjs';

class Sandwich extends Texture {
    constructor(urls, dim) {
        super(urls[0], dim, false);

        this.urls = urls;

        this.image = document.createElement('canvas');
        this.image.width = this.dim.w;
        this.image.height = this.dim.h;

        this.load(this.urls, 1);
        this.load(this.urls, 0);
    }

    load(urls, part) {
        let source = new Image();
        source.src = urls[part];
        source.addEventListener('load', () => {
            switch (part) {
                case 0:
                    this.image.getContext('2d').drawImage(source, 0, this.dim.h - source.height);
                    for (let y = 0; y < this.dim.h - source.height; y += source.height) {
                        this.image.getContext('2d').drawImage(source, 0, y);
                    }

                    this.image.getContext('2d').save();
                    this.image.getContext('2d').translate(source.width, 0);
                    this.image.getContext('2d').scale(-1, 1);

                    this.image.getContext('2d').drawImage(source, source.width - this.dim.w, this.dim.h - source.height);
                    for (let y = 0; y < this.dim.h - source.height; y += source.height) {
                        this.image.getContext('2d').drawImage(source, source.width - this.dim.w, y);
                    }

                    this.image.getContext('2d').restore();
                    break;
                case 1:
                    for (let x = source.width; x < this.dim.w - source.width; x += source.width) {
                        this.image.getContext('2d').drawImage(source, x - (this.dim.w % source.width) / 2, this.dim.h - source.height);
                    }
                    for (let x = source.width; x < this.dim.w - source.width; x += source.width) {
                        for (let y = 0; y < this.dim.h - source.height; y += source.height) {
                            this.image.getContext('2d').drawImage(source, x - (this.dim.w % source.width) / 2, y);
                        }
                    }
                    break;
            }
        });
    }
}

export { Sandwich };