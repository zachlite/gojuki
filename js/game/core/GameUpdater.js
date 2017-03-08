import {scene_manager} from "./../world/SceneManager.js";

class GameUpdater {
    constructor () {

    }

    update() {
        // update the current scene
        if (scene_manager.current_scene) {
            scene_manager.current_scene.update();        
        }
    }
}

export default GameUpdater;