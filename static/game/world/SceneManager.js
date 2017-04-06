import GameScene from "./GameScene.js";

class SceneManager {

    constructor() {
        this.scenes = {
            "game": GameScene
        };

        this.currentScene = null;
    }

    createScene(sceneId, player, sceneData, roundNumber) {
        this.currentScene = new this.scenes[sceneId](player, sceneData, roundNumber);
    }

    getSceneData() {
        if (this.currentScene) {
            return this.currentScene.getSceneData();
        } else {
            return null;
        }
    }

    deleteScene() {
        if (this.currentScene) {
            delete this.currentScene;
        }
    }

}

export let sceneManager = new SceneManager();
