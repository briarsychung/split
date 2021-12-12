class Level {
    constructor() {
        this.objects = [];
        this.spawns = [];
        this.goals = [];
        this.background = null;
    }

    addObject(object) {
        this.objects.push(object);
    }

    addSpawn(spawn) {
        this.spawns.push(spawn);
    }

    addGoal(goal) {
        this.objects.push(goal);
        this.goals.push(goal);
    }

    addBackground(background) {
        this.background = background;
        this.background.dim = { w: 1024, h: 1024 };
        this.background.load();
    }
}

export { Level };