import {scene_manager} from "./SceneManager.js";
import Window from "./../utils/Window.js";
import Scene from "./Scene.js";

class IntroScene extends Scene {
    constructor() {
        super();

        var btn_texture = PIXI.Texture.fromImage('img/button.png');
        this.play_btn = new PIXI.Sprite(btn_texture);
        this.play_btn.pivot.set(267.0 / 2.0, 50.0 / 2.0);

        this.play_btn.position.set(Window.screen_width / 2.0, Window.screen_height / 2.0);
        this.play_btn.interactive = true;
        this.play_btn.on('mouseup', this.didPressPlayButton);

        this.stage.addChild(this.play_btn);

    }

    update() {

        // update all children of this scene
        super.update();
            
        // handle updates of scene specific events
    }

    didPressPlayButton() {
        scene_manager.createScene("game");
    }
}

export default IntroScene;