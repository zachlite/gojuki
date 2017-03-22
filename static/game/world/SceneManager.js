import IntroScene from "./IntroScene.js";
import GameScene from "./GameScene.js";
import UpgradeScene from "./UpgradeScene.js";

class SceneManager {

    constructor() {
        this.scenes = {
            "intro": IntroScene,
            "game": GameScene,
            "upgrades": UpgradeScene
        };

        this.current_scene = null;
    }

    createScene(scene_id, player, scene_data) {
        this.current_scene = new this.scenes[scene_id](player, scene_data);
    }

}

export let scene_manager = new SceneManager();
