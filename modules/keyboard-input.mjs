import { Input } from './input.mjs';

class KeyboardInput extends Input {
    constructor(player) {
        super(player);

        this.keys = {
            a: { down: false, event: () => {
                this.walk(-1);
            }},
            d: { down: false, event: () => {
                this.walk(1);
            }},
            w: { down: false, event: () => {
                this.jump();
            }},
        }

        document.addEventListener('keydown', e => {
            if (this.keys[e.key.toLowerCase()] !== undefined) this.keys[e.key.toLowerCase()].down = true;
        });

        document.addEventListener('keyup', e => {
            if (this.keys[e.key.toLowerCase()] !== undefined) this.keys[e.key.toLowerCase()].down = false;
        });
    }

    check() {
        for (const KEY in this.keys) {
            if (this.keys[KEY].down) this.keys[KEY].event();
        }
    }
}

export { KeyboardInput };