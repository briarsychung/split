class Camera {
    constructor(pos = { x: 0, y: 0 }, range = { min: 2, max: 3 }, smooth = { pos: 0.75, zoom: 0.875 }) {
        this.pos = pos;
        this.range = range;
        this.smooth = smooth;

        this.zoom = range.min;
    }

    update(players) {
        let max = {
            x: 750 / Math.abs(players[0].pos.x - players[1].pos.x),
            y: 750 / Math.abs(players[0].pos.y - players[1].pos.y)
        };
        let target = {
            pos: { x: 0, y: 0 },
            zoom: {}
        };

        if (max.x < this.range.min || max.y < this.range.min) {
            target.pos = { ...players[0].pos };
            target.zoom = this.range.min;
        } else {
            target.pos = {
                x: (players[0].pos.x + players[1].pos.x) / 2,
                y: (players[0].pos.y + players[1].pos.y) / 2
            };

            max = {
                x: Math.max(Math.min(max.x, this.range.max), this.range.min),
                y: Math.max(Math.min(max.y, this.range.max), this.range.min)
            };
            target.zoom = Math.min(max.x, max.y);
        }

        this.zoom = this.smooth.zoom * this.zoom + (1 - this.smooth.zoom) * target.zoom;
        this.pos.x = this.smooth.pos * this.pos.x + (1 - this.smooth.pos) * target.pos.x;
        this.pos.y = this.smooth.pos * this.pos.y + (1 - this.smooth.pos) * target.pos.y;
    }
}

export { Camera };