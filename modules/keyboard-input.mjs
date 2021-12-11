import { Input } from './input.mjs';

class KeyboardInput extends Input {
    constructor(player, keys = { left: 'a', right: 'd', up: 'w' }) {
        super(player);
        this.keys = keys;

        this.events = {};

        this.events[keys.left] = {
            down: false, event: () => {
                this.walk(-1);
            }
        };
        this.events[keys.right] = {
            down: false, event: () => {
                this.walk(1);
            }
        };
        this.events[keys.up] = {
            down: false, event: () => {
                this.jump();
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

export { KeyboardInput };