import {scene_manager} from "./../world/SceneManager.js";
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
        this.renderer.render(
            scene_manager.current_scene.stage
        );
    }
}

export default GameRenderer;