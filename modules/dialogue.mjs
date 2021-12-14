class Dialogue {
    constructor(boss, lines) {
        this.lines = lines;
        
        this.pos = {
            x: boss.pos.x - 96,
            y: boss.pos.y - 96
        };
        this.frame = 0;
        this.play = false;
    }

    init() {
        this.frame = 0;
        this.play = false;

        super().init();
    }

    start() {
        this.frame = 0;
        this.play = true;
    }

    draw() {
        this.texture = this.lines[Math.floor(this.frame / 30)];

        this.frame++;
        if (this.frame === this.lines.length * 30) {
            this.play = false;
        }
    }
}

export { Dialogue };