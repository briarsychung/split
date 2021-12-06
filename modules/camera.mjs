class Camera {
    constructor(pos = { x: 0, y: 0 }, range = { min: 2, max: 4 }, smooth = { pos: 0.75, zoom: 0.875 }) {
        this.pos = pos;
        this.range = range;
        this.smooth = smooth;

        this.zoom = range.min;
    }

    update(canvas, players) {
        let target = {
            x: 0.75 * canvas.width / Math.abs(players[0].pos.x - players[1].pos.x),
            y: 0.75 * canvas.height / Math.abs(players[0].pos.y - players[1].pos.y)
        };

        if (target.x < this.range.min || target.y < this.range.min) {
            this.pos.x = this.smooth.pos * this.pos.x + (1 - this.smooth.pos) * players[0].pos.x;
            this.pos.y = this.smooth.pos * this.pos.y + (1 - this.smooth.pos) * players[0].pos.y;
            this.zoom = this.smooth.zoom * this.zoom + (1 - this.smooth.zoom) * this.range.min;
            return;
        }

        this.pos.x = this.smooth.pos * this.pos.x + (1 - this.smooth.pos) * (players[0].pos.x + players[1].pos.x) / 2;
        this.pos.y = this.smooth.pos * this.pos.y + (1 - this.smooth.pos) * (players[0].pos.y + players[1].pos.y) / 2;

        target = {
            x: Math.max(Math.min(target.x, this.range.max), this.range.min),
            y: Math.max(Math.min(target.y, this.range.max), this.range.min)
        };
        
        this.zoom = this.smooth.zoom * this.zoom + (1 - this.smooth.zoom) * Math.min(target.x, target.y);
    }
}

export { Camera };