class Canvas {
    constructor(element, margin = 20) {
        this.element = element;
        this.margin = margin;

        this.width = 0;
        this.height = 0;

        let resize = () => {
            const DPR = window.devicePixelRatio;

            let max = {
                w: window.innerWidth - margin * 2,
                h: window.innerHeight - margin * 2
            }

            if (max.w / 16 > max.h / 9) {
                this.width = 16 * max.h / 9;
                this.height = max.h;
            } else {
                this.width = max.w;
                this.height = 9 * max.w / 16;
            }

            this.element.style.width = this.width + 'px';
            this.element.style.height = this.height + 'px';
            this.element.width = Math.floor(this.width * DPR);
            this.element.height = Math.floor(this.height * DPR);

            this.element.getContext('2d').imageSmoothingEnabled = false;
            this.element.getContext('2d').scale(DPR, DPR);
        };

        window.addEventListener('resize', resize);
        resize();
    }
}

export { Canvas };