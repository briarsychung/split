class Camera {
    constructor(pos = { x: 0, y: 0 }, zoom = 2) {
        this.pos = pos;
        this.zoom = zoom;
    }
}

export { Camera };