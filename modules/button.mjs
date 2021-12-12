import { Interactive } from './interactive.mjs';

class Button extends Interactive {
    constructor(pos, dim, texture, offset) {
        super(pos, dim, texture, offset);
    }
}

export { Button };