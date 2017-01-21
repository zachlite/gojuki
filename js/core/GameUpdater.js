class GameUpdater {
    constructor (scope) {
        this.scope = scope;
    }

    update() {

        console.log("updating");
            
        var entities = this.scope.state.entities;

        for (var entity in entities) {
            // entities[entity].update();
            console.log(entities[entity]);
        }

    }
}

export default GameUpdater;