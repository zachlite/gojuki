let PIXI = require("pixi.js");

import GameLoop from "./core/GameLoop.js";
import GameUpdater from "./core/GameUpdater.js";
import GameRenderer from "./core/GameRenderer.js";
import Car from "./players/Car.js";
// import Keyboard from "./utils/Keyboard.js";

class Game {

    constructor () {

    }

    init() {
        // set up window and renderer
        console.log("init");


        this.game_env = {};
        

        // TODO make a scene manager
        this.game_env.scene = {};
        this.game_env.scene.entities = [];
        this.game_env.scene.sprites = new PIXI.Container();

        // introduce a player
        var car = new Car();

        // add the player to the scene
        this.game_env.scene.entities.push(car);
        this.game_env.scene.sprites.addChild(car.sprite);
        

        this.game_updater = new GameUpdater(this.game_env);
        this.game_renderer = new GameRenderer(this.game_env);


        return true;
    }

    play() {

        console.log("play");

        this.gameLoop = new GameLoop(this.game_updater, this.game_renderer);

        // window.setTimeout(() => {
        //     console.log("loop done");
        //     this.gameLoop.stop();
        // }, 5000);

    }


}

var game = new Game();
if (game.init()) {
    game.play();
}

