class GameRenderer {
    constructor (scope) {
        this.scope = scope;
    }

    render() {

        console.log("rendering");

        var entities = this.scope.state.entities;

        for (var entity in entities) {
            entities[entity].render();
        }

    }
}

export default GameRenderer;