let PIXI = require("pixi.js");

import GameLoop from "./core/GameLoop.js";
import GameUpdater from "./core/GameUpdater.js";
import GameRenderer from "./core/GameRenderer.js";
import PartyHost from "./party/PartyHost.js";
import PartyGuest from "./party/PartyGuest.js";

class Game {

    constructor () {
        this.game_time = 20 * 1000;
    }

    init(is_host) {

        if (is_host) {
            this.party_host = new PartyHost();
        }

        this.party_guest = new PartyGuest();


        // mock interactions
        this.party_guest.reportPlayerInitialized();
        // 
        this.party_host.acknowledgeGuestJoined();

        this.party_guest.loadScene("upgrades");

        // var interval = 1000;
        // var timer = setInterval(() => {
        //     this.game_time -= interval;
        //     if (this.game_time < 0) {
        //         clearInterval(timer);
        //         this.party_guest.loadScene("upgrades");
        //         return;
        //     }
        //     this.party_guest.receiveEvent("game_time_tick", this.game_time);
        // }, interval);



        //...
        // this.party_guest.receiveEvent("food_created", {"x" : 30, "y" : 100});
        // this.party_guest.receiveEvent("goo_created", {"x" : 300, "y" : 100});


        // // mocked timer. should happen in party host
        // var interval = 1000;
        // var timer = setInterval(() => {
        //     this.game_time -= interval;
        //     if (this.game_time < 0) {
        //         clearInterval(timer);
        //         this.party_guest.loadScene("upgrades");
        //         return;
        //     }
        //     this.party_guest.receiveEvent("game_time_tick", this.game_time);
            
        //     // mock opponent movement
        //     this.party_guest.receiveEvent("opponent_position", {
        //         "opponent_id": "player3",
        //         "position": {"x": 300 + (this.game_time / 1000.0) * 5, "y": 300},
        //         "rotation": 0
        //     });
        // }, interval);






        this.game_updater = new GameUpdater();
        this.game_renderer = new GameRenderer();

        return true;
    }

    play() {

        this.gameLoop = new GameLoop(
            this.game_updater, 
            this.game_renderer
        );

    }


}

var is_host = true;
var game = new Game();
if (game.init(is_host)) {
    game.play();
}

