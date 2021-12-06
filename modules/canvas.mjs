class Canvas {
    constructor(element) {
        this.element = element;
        this.width = 0;
        this.height = 0;

        let resize = () => {
            const DPR = window.devicePixelRatio;

            if (window.innerWidth / 16 > window.innerHeight / 9) {
                this.width = 16 * window.innerHeight / 9;
                this.height = window.innerHeight;
            } else {
                this.width = window.innerWidth;
                this.height = 9 * window.innerWidth / 16;
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