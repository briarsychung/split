class Level {
    constructor() {
        this.objects = [];
        this.spawns = [];
    }

    addObject(object) {
        this.objects.push(object);
    }

    addSpawn(spawn) {
        this.spawns.push(spawn);
    }
}

export { Level };