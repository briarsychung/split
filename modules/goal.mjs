import { Object } from './object.mjs';

class Goal extends Object {
    constructor(url, pos) {
        super(url, pos, { w: 16, h: 2 });
    }
}

export { Goal };