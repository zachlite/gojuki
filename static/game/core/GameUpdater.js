import {sceneManager} from "./../world/SceneManager.js";

class GameUpdater {
    constructor () {

    }

    update() {
        // update the current scene
        if (sceneManager.currentScene) {
            sceneManager.currentScene.update();        
        }
    }
}

export default GameUpdater;