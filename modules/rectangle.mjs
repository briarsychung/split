import { Object } from './object.mjs';

class Rectangle extends Object {
    constructor(pos, dim, texture, offset) {
        super(pos, dim, texture, offset);
    }
}

export { Rectangle };