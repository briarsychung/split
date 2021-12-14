class Dialogue {
    constructor(boss, lines) {
        this.boss = boss;
        this.lines = lines;

        this.texture = null;
        
        this.pos = { x: 0, y: 0 };
        this.offset = { x: 0, y: 0 };
        this.frame = 0;
        this.active = false;
    }

    init() {
        this.frame = 0;
        this.active = false;
    }

    start() {
        this.frame = 0;
        this.active = true;
    }

    draw() {
        this.texture = this.lines[Math.floor(this.frame / 120)];
        
        this.pos = {
            x: this.boss.pos.x - 72,
            y: this.boss.pos.y - 48 - 2 * (Math.floor(this.frame / 20) % 2)
        };

        this.frame++;
        if (this.frame === this.lines.length * 120) {
            this.active = false;
        }
    }
}

export { Dialogue };