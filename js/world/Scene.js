class Scene {
    constructor() {
        this.stage = new PIXI.Container();
        this.actors = [];
    }

    update() {
        for (var actor in this.actors) {
            this.actors[actor].update();
        }
    }
}

export default Scene;