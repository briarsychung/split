class Level {
    constructor() {
        this.objects = [];
        this.spawns = [];
        this.goals = [];
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
}

export { Level };