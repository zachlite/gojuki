let PIXI = require("pixi.js");

import GameLoop from "./core/GameLoop.js";
import GameUpdater from "./core/GameUpdater.js";
import GameRenderer from "./core/GameRenderer.js";
import PartyGuest from "./party/PartyGuest.js";

class Game {

    constructor (socket, playerNumber) {
        this.playerNumber = playerNumber;
        this.socket = socket;
        this.game_time = 60 * 1000; // 60 seconds

        this.socket.on("NEED_PLAYERS_RESPONSE", (players) => {
            this.init(players);
            this.play();
        }); 

        this.socket.emit("NEED_PLAYERS");
    }

    init(players) {

        this.party_guest = new PartyGuest(this.playerNumber, players, this.socket);
        this.party_guest.loadScene("game");

        if (this.playerNumber == 1) {
            var interval = 1000;
            var timer = setInterval(() => {
                this.game_time -= interval;
                if (this.game_time < 0) {
                    clearInterval(timer);
                    console.log("game over");
                    this.socket.emit("GAME_OVER")
                    return;
                } else {
                    console.log("tick: " + this.game_time);
                    this.socket.emit("GAME_TIME_TICK", this.game_time);                
                }
            }, interval);
        }

        this.socket.on("GAME_TIME_TICKED", (gameTime) => {
            this.party_guest.receiveEvent("game_time_tick", gameTime);
        });

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
    }

    play() {

        this.gameLoop = new GameLoop(
            this.game_updater, 
            this.game_renderer
        );

    }


}

export default Game;

// var is_host = true;
// var game = new Game();
// if (game.init(is_host)) {
//     game.play();
// }

