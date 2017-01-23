class Scene {
    constructor() {
        this.stage = new PIXI.Container();
        this.actors = [];
        this.paused = false;
    }

    update() {
        for (var actor in this.actors) {
            this.actors[actor].update();
        }
    }

    pause() {
        this.paused = true;
    }

    resume() {
        this.paused = false;
    }

    isPaused() {
        return this.paused;
    }

}

export default Scene;