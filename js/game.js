let PIXI = require("pixi.js");

import GameLoop from "./core/GameLoop.js";
import GameUpdater from "./core/GameUpdater.js";
import GameRenderer from "./core/GameRenderer.js";

import {scene_manager} from "./world/SceneManager.js";
import IntroScene from "./world/IntroScene.js";
import GameScene from "./world/GameScene.js";



class Game {

    constructor () {

    }

    init() {

        console.log("init");

        scene_manager.createScene("intro", IntroScene);
        scene_manager.createScene("game", GameScene);
        scene_manager.goToScene("game");

        this.game_updater = new GameUpdater();
        this.game_renderer = new GameRenderer();

        return true;
    }

    play() {

        console.log("play");

        this.gameLoop = new GameLoop(
            this.game_updater, 
            this.game_renderer
        );

    }


}

var game = new Game();
if (game.init()) {
    game.play();
}

