import {sceneManager} from "./../world/SceneManager.js";
import Window from "./../utils/Window.js";

class GameRenderer {
    constructor () {
        this.renderer = PIXI.autoDetectRenderer(
            Window.screen_width, 
            Window.screen_height
        );

        document.body.appendChild(this.renderer.view);
    }

    render() {
        if (sceneManager.currentScene) {
            this.renderer.render(
                sceneManager.currentScene.stage
            );
        }
    }
}

export default GameRenderer;