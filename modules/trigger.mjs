import { Interactive } from './interactive.mjs';

class Trigger extends Interactive {
    constructor(pos, dim, texture, offset, dialogue) {
        super(pos, dim, texture, offset);

        this.dialogue = dialogue;

        this.played = false;
    }

    init() {
        this.played = false;

        super.init();
    }

    trigger() {
        if (this.pressed.length && !this.played) {
            this.dialogue.start();
            this.played = true;
        }

        super.trigger();
    }
}

export { Trigger };