class Camera {
    constructor(pos = { x: 0, y: 0 }, limit = 2, smooth = { pos: 0.75, zoom: 0.875 }) {
        this.pos = pos;
        this.limit = limit;
        this.smooth = smooth;

        this.zoom = limit;
    }

    update(players) {
        let target = this.position(players);

        this.zoom = this.smooth.zoom * this.zoom + (1 - this.smooth.zoom) * target.zoom;
        this.pos.x = this.smooth.pos * this.pos.x + (1 - this.smooth.pos) * target.pos.x;
        this.pos.y = this.smooth.pos * this.pos.y + (1 - this.smooth.pos) * target.pos.y;
    }

    snap(players) {
        let target = this.position(players);

        this.zoom = target.zoom;
        this.pos.x = target.pos.x;
        this.pos.y = target.pos.y;
    }

    position(players) {
        return {
            pos: {
                x: (players[0].pos.x + players[1].pos.x) / 2,
                y: (players[0].pos.y + players[1].pos.y) / 2
            },
            zoom: Math.min(500 / Math.abs(players[0].pos.x - players[1].pos.x),
                500 / Math.abs(players[0].pos.y - players[1].pos.y), this.limit)
        };
    }
}

export { Camera };