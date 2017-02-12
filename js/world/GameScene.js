import * as Utils from "./../utils/Utils.js";
import Window from "./../utils/Window.js";
import Scene from "./Scene.js";
import Bug from "./../players/Bug.js";
import Base from "./components/Base.js";

class GameScene extends Scene {
    constructor(party_guest, scene) {
        super();

        this.party_guest = party_guest;


        // setup other players and their bases
        // set up your player and base

        this.opponents = {};

        for (var player in this.party_guest.players) {
            var p = parseInt(player) + 1;
            if (p != this.party_guest.guest_number) {
                
                var base = new Base(p);
                var bug = new Bug(p);
                
                this.stage.addChild(base.sprite);
                this.stage.addChild(bug.sprite);

                this.opponents[this.party_guest.players[player]] = {
                    "base": base,
                    "bug": bug
                };
            }
        }

        var player_num = parseInt(this.party_guest.guest_number);

        this.base = new Base(player_num);
        this.bug = new Bug(player_num);

        this.stage.addChild(this.base.sprite);
        this.stage.addChild(this.bug.sprite);
        this.actors.push(this.bug);


        // game clock
        this.time_remaining = new PIXI.Text("TIME REMAINING: 60", {fill: 0xffffff});
        this.time_remaining.position.set(Window.screen_width - this.time_remaining.width - 20, 0);
        this.stage.addChild(this.time_remaining);


        this.food_texture = PIXI.Texture.fromImage('img/food.png');
        this.foods = [];

        if (this.party_guest.guest_number == 1) {
            // this player is designated to set up whatever is needed on the gameboard for other players.
            for (var i = 0; i < 10; i++) {
                this.didMakeFood();
            }
        }

    }

    update() {

        super.update();

        this.didPlayerEatFood();

        this.didPlayerReturnToBase();

        // this.didBugCollectPowerup();

    }

    getSceneData() {
        var scene_data = {
            "food_collected": this.base.food_collected
        };

        return scene_data;
    }

    didReceiveEvent(type, data) {
        switch(type) {
            case "food_created":
                this.makeFood(data);
                break;
            case "game_time_tick":
                this.didTimeChange(data);
                break;
            case "opponent_position":
                this.updateOpponentPosition(data);
                break;
        }
    }

    updateOpponentPosition(data) {
        this.opponents[data.opponent_id].bug.sprite.position = data.position;
    }

    didTimeChange(time) {
        this.time_remaining.text = "TIME REMAINING: " + (time / 1000.0).toString();
    }

    didPlayerEatFood() {
        for (var food in this.foods) {

            if (Utils.hitTestRectangle(this.foods[food], this.bug.sprite)) {
                
                // the food is collected
                if (this.bug.foods < this.bug.max_foods) {
                    this.bug.foods += 1;

                    // the food gets removed
                    this.stage.removeChild(this.foods[food]);
                    this.foods.splice(food, 1);

                    this.party_guest.broadcastEvent("food_eaten", food);

                    // make more food
                    this.didMakeFood();
                }
            }
        }
    }

    didPlayerReturnToBase() {
        if (Utils.hitTestRectangle(this.base.sprite, this.bug.sprite)) {
            this.base.collectFood(this.bug.foods);
            this.bug.foods = 0;
        }
    }

    didBugCollectPowerup() {
        for (var powerup in this.powerups) {
            if (Utils.hitTestRectangle(this.powerups[powerup], this.bug.sprite)) {

                // this powerup is collected
                this.stage.removeChild(this.powerups[powerup]);
                this.powerups.splice(powerup, 1);

                // apply effects to player
                this.bug.superSpeed();

            }
        }
    }

    didMakeFood() {
        var food = this.makeFood();
        this.party_guest.broadcastEvent("food_created", food.position);
    }

    makeFood(position) {
        
        var food = new PIXI.Sprite(this.food_texture);
        
        if (position) {
            food.position.set(
                position.x,
                position.y
            )
        } else {
            food.position.set(
                Math.random() * Window.screen_width,
                Math.random() * Window.screen_height
            );
        }
    
        food.scale.set(0.2, 0.2);
        food.rotation = Math.random() * 2 * Math.PI;
        this.stage.addChild(food);
        this.foods.push(food);

        return food;
    }

    makePowerup() {

        var powerup = new PIXI.Sprite(this.speed_powerup_texture);

        powerup.position.set(
            Math.random() * Window.screen_width,
            Math.random() * Window.screen_height
        );

        this.stage.addChild(powerup);
        this.powerups.push(powerup);
    }
}

export default GameScene;