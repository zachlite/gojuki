import GameLoop from "./core/GameLoop.js";
import GameUpdater from "./core/GameUpdater.js";
import GameRenderer from "./core/GameRenderer.js";

class Game {

    constructor () {

    }

    init() {
        // set up window and renderer
        console.log("init");

        this.state = {};
        
        this.gameUpdater = new GameUpdater(this);
        this.gameRenderer = new GameRenderer(this);

        this.state.entities = [
            // add entities here
        ]

        return true;
    }

    play() {

        console.log("play");

        this.gameLoop = new GameLoop(this);

        window.setTimeout(() => {
            console.log("loop done");
            this.gameLoop.stop();
        }, 1000);

    }


}

var game = new Game();
if (game.init()) {
    game.play();
}

