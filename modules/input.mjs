class Input {
    constructor(player, keys = { left: 'a', right: 'd', up: 'w' }) {
        this.player = player;
        this.keys = keys;

        this.events = {};

        this.events[keys.left] = {
            down: false, event: () => {
                this.player.vel.x += -1;
            }
        };
        this.events[keys.right] = {
            down: false, event: () => {
                this.player.vel.x += 1;
            }
        };
        this.events[keys.up] = {
            down: false, event: () => {
                if (this.player.touch.bottom) this.player.vel.y = -12;
            }
        };

        document.addEventListener('keydown', e => {
            if (this.events[e.key.toLowerCase()] !== undefined) this.events[e.key.toLowerCase()].down = true;
        });

        document.addEventListener('keyup', e => {
            if (this.events[e.key.toLowerCase()] !== undefined) this.events[e.key.toLowerCase()].down = false;
        });
    }

    check() {
        for (const KEY in this.events) {
            if (this.events[KEY].down) this.events[KEY].event();
        }
    }
}

export { Input };