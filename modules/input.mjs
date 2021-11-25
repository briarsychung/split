class Input {
    constructor(player) {
        this.player = player;
    }

    check() { }

    walk(dir) {
        this.player.vel.x += dir;
    }

    jump() {
        if (this.player.ground) this.player.vel.y = -12;
    }
}

export { Input };