let PIXI = require("pixi.js");

import GameLoop from "./core/GameLoop.js";
import GameUpdater from "./core/GameUpdater.js";
import GameRenderer from "./core/GameRenderer.js";
import PartyGuest from "./party/PartyGuest.js";
import {sceneManager} from "./world/SceneManager.js";

class Game {

    constructor (socket, playerNumber, playerData, roundNumber) {
        this.playerNumber = playerNumber;
        this.socket = socket;
        this.game_time = 60 * 1000; // 60 seconds

        this.socket.on("NEED_PLAYERS_RESPONSE", (players) => {
            this.init(players, playerData, roundNumber);
            this.play();
        }); 

        this.socket.emit("NEED_PLAYERS");
    }

    init(players, playerData, roundNumber) {

        var playerData = playerData || {
            food: 0,
            food_carry_limit: 5,
            speed: 5,
            goo: 0
        };

        this.partyGuest = new PartyGuest(this.playerNumber, players, this.socket);
        sceneManager.createScene("game", this.partyGuest, playerData, roundNumber);

        if (this.playerNumber == 1) {
            var interval = 1000;
            var timer = setInterval(() => {
                this.game_time -= interval;
                if (this.game_time < 0) {
                    clearInterval(timer);
                    console.log("game timer expired");
                    this.socket.emit("GAME_OVER")
                    return;
                } else {
                    this.socket.emit("GAME_TIME_TICK", this.game_time);                
                }
            }, interval);
        }

        this.socket.on("GAME_TIME_TICKED", (gameTime) => {
            this.partyGuest.receiveEvent("game_time_tick", gameTime);
        });

        // var interval = 1000;
        // var timer = setInterval(() => {
        //     this.game_time -= interval;
        //     if (this.game_time < 0) {
        //         clearInterval(timer);
        //         this.partyGuest.loadScene("upgrades");
        //         return;
        //     }
        //     this.partyGuest.receiveEvent("game_time_tick", this.game_time);
        // }, interval);



        //...
        // this.partyGuest.receiveEvent("food_created", {"x" : 30, "y" : 100});
        // this.partyGuest.receiveEvent("goo_created", {"x" : 300, "y" : 100});


        // // mocked timer. should happen in party host
        // var interval = 1000;
        // var timer = setInterval(() => {
        //     this.game_time -= interval;
        //     if (this.game_time < 0) {
        //         clearInterval(timer);
        //         this.partyGuest.loadScene("upgrades");
        //         return;
        //     }
        //     this.partyGuest.receiveEvent("game_time_tick", this.game_time);
            
        //     // mock opponent movement
        //     this.partyGuest.receiveEvent("opponent_position", {
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

    announceWinner() {

        this.partyGuest.receiveEvent("announce_winner", null);

        var winnerTime = 3000;
        if (this.playerNumber == 1) {
            var interval = 1000;
            var timer = setInterval(() => {
                winnerTime -= interval;
                if (winnerTime < 0) {
                    clearInterval(timer);
                    this.socket.emit("WINNER_ANNOUNCEMENT_OVER")
                    return;
                }
            }, interval);
        }
    }

    getPlayerData() {
        return sceneManager.getSceneData();
    }

    stop() {
        console.log("STOPPING GAME");
        this.gameLoop.stop();
        this.partyGuest.destroy();
        delete this.gameLoop;
        delete this.partyGuest;
        sceneManager.deleteScene();
        this.socket.removeAllListeners("NEED_PLAYERS_RESPONSE");
        this.socket.removeAllListeners("GAME_TIME_TICKED");
        
        var canvas = document.getElementsByTagName('canvas')[0];
        canvas.parentNode.removeChild(canvas);
    }

}

export default Game;

// var is_host = true;
// var game = new Game();
// if (game.init(is_host)) {
//     game.play();
// }

