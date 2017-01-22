class GameUpdater {
    constructor (game_env) {
        this.game_env = game_env;
    }

    update() {
            
        var entities = this.game_env.scene.entities;

        for (var entity in entities) {
            entities[entity].update();
        }

    }
}

export default GameUpdater;