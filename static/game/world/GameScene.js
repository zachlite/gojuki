import * as Utils from "./../utils/Utils.js";
import Window from "./../utils/Window.js";
import Keyboard from "./../utils/Keyboard.js";
import Scene from "./Scene.js";
import Bug from "./../players/Bug.js";
import Base from "./components/Base.js";


class GameScene extends Scene {
    constructor(party_guest, scene_data, roundNumber) {
        super();

        this.party_guest = party_guest;
        

        // food
        this.food_carry_limit = scene_data.food_carry_limit;
        this.food_carrying = 0;
        this.food = 0;

        this.speed = scene_data.speed;
        this.goo = scene_data.goo;

        // opponents
        this.opponents = {};

        for (var player in this.party_guest.players) {
            var p = parseInt(player) + 1;
            if (p != this.party_guest.guest_number) {
                
                var base = new Base(p, 0, this.party_guest.players[player]);
                var bug = new Bug(p, 5);
                
                this.stage.addChild(base.sprite);
                this.stage.addChild(bug.sprite);

                this.opponents[this.party_guest.players[player]] = {
                    "base": base,
                    "bug": bug,
                    "name": this.party_guest.players[player]
                };
            }
        }

        this.base = new Base(this.party_guest.guest_number, this.food, this.party_guest.players[this.party_guest.guest_number - 1]);
        this.bug = new Bug(this.party_guest.guest_number, this.speed);
        this.last_rotation = null;
        this.last_x = null;
        this.last_y = null;

        this.stage.addChild(this.base.sprite);
        this.stage.addChild(this.bug.sprite);
        this.actors.push(this.bug);


        // game HUD
        this.hud = new PIXI.Graphics();
        this.hud.beginFill(0x460a20);
        this.hud.drawRect(0, 0, Window.screen_width, Window.screen_height - Window.playable_height);
        this.stage.addChild(this.hud);

        var textOptions = {fill: 0xffffff, fontSize: 13};
        var hudTextHeight = 13;
        // game clock
        this.time_remaining = new PIXI.Text("Time Left: 60", textOptions);
        this.time_remaining.position.set(Window.screen_width - this.time_remaining.width - 20, hudTextHeight);
        this.hud.addChild(this.time_remaining);

        // food carrying
        this.foodHUD = new PIXI.Text("Food carrying: 0/"+this.food_carry_limit.toString(), textOptions);
        this.foodHUD.position.set(20, hudTextHeight);
        this.hud.addChild(this.foodHUD);

        // goos carrying
        this.gooHUD = new PIXI.Text("Sticky Goo: " + this.goo, textOptions);
        this.gooHUD.position.set(this.foodHUD.x + this.foodHUD.width + 30, hudTextHeight);
        this.hud.addChild(this.gooHUD);

        // round
        var roundHUD = new PIXI.Text("ROUND: " + roundNumber, textOptions);
        roundHUD.position.set((Window.screen_width / 2.0) - (roundHUD.width / 2.0), hudTextHeight);
        this.hud.addChild(roundHUD);

        this.goo_texture = PIXI.Texture.fromImage("/img/goo.png");
        this.goos = [];

        this.food_texture = PIXI.Texture.fromImage('/img/food.png');
        this.foods = [];

        if (this.party_guest.guest_number == 1) {
            // this player is designated to set up whatever is needed on the gameboard for other players.
            for (var i = 0; i < 10; i++) {
                this.doMakeFood();
            }
        }

        this.space_pressed = false;
    }

    update() {

        super.update();

        this.didPlayerEatFood();

        this.didPlayerReturnToBase();

        this.didPlayerDeployGoo();

        this.didPlayerGetStuckInGoo();

        this.didPlayerChangePosition();

    }

    announceWinner() {
        var myScore = this.food;
        var highestScore = myScore
        var winner = this.party_guest.players[this.party_guest.guest_number - 1];
        for (var opponent in this.opponents) {
            var score = this.opponents[opponent].base.foodCollected;
            if (score > highestScore) {
                highestScore = score;
                winner = this.opponents[opponent].name;
            }
        }

        this.winnerText = new PIXI.Text("Game Over!\n" + winner + " wins!", {fill: 0xffffff, fontSize: 32});
        this.winnerText.position.set((Window.screen_width / 2.0) - (this.winnerText.width / 2.0), Window.screen_height / 2.0);
        this.stage.addChild(this.winnerText);
    }

    getSceneData() {
        return {
            food: this.food,
            food_carry_limit: this.food_carry_limit,
            speed: this.speed,
            goo: this.goo
        };
    }

    didReceiveEvent(type, data) {
        switch(type) {
            case "food_created":
                this.makeFood(data);
                break;
            case "food_eaten":
                this.removeFood(data);
                break;
            case "goo_created": 
                this.makeGoo(data);
                break;
            case "goo_used":
                this.removeGoo(data);
                break;
            case "game_time_tick":
                this.didTimeChange(data);
                break;
            case "opponent_position":
                this.updateOpponentPosition(data);
                break;
            case "returned_to_base":
                this.updatePlayerBase(data);
                break;
            case "player_moved":
                this.updatePlayerPosition(data);
                break;

            case "announce_winner":
                this.announceWinner();
                break;
        }
    }

    updatePlayerPosition(data) {
        var opponent = this.opponents[this.party_guest.players[data.playerNumber - 1]];
        opponent.bug.sprite.rotation = data.rotation;
        opponent.bug.sprite.x = data.x;
        opponent.bug.sprite.y = data.y;
    }

    updatePlayerBase(data) {
        this.opponents[this.party_guest.players[data.playerNumber - 1]].base.updateFoodCollectedDisplay(data.foodCount);
    }

    updateOpponentPosition(data) {
        this.opponents[data.opponent_id].bug.sprite.position = data.position;
    }

    didTimeChange(time) {
        this.time_remaining.text = "Time left: " + (time / 1000.0).toString();
    }

    didPlayerEatFood() {
        for (var food in this.foods) {

            if (Utils.hitTestRectangle(this.foods[food], this.bug.sprite)) {
                
                // the food is collected
                if (this.food_carrying < this.food_carry_limit) {
                    this.food_carrying += 1;

                    // update the HUD
                    this.foodHUD.text = "Food carrying: " + this.food_carrying + "/" + this.food_carry_limit;

                    // the food gets removed
                    this.removeFood(food);
                    this.party_guest.broadcastEvent("food_eaten", food);

                    // make more food
                    this.doMakeFood();
                }
            }
        }
    }

    removeFood(food) {
        this.stage.removeChild(this.foods[food]);
        this.foods.splice(food, 1);
    }

    didPlayerReturnToBase() {
        if (Utils.hitTestRectangle(this.base.sprite, this.bug.sprite)) {
            
            this.food += this.food_carrying;
            this.base.updateFoodCollectedDisplay(this.food);
            this.food_carrying = 0;
            this.foodHUD.text = "Food carrying: " + this.food_carrying + "/" + this.food_carry_limit;
            this.party_guest.broadcastEvent("returned_to_base", {foodCount: this.food, playerNumber: this.party_guest.guest_number});
        }
    }

    didPlayerDeployGoo() {
        if (Keyboard.is_pressed.space && this.space_pressed == false) {
            
            if (this.goo > 0) {
                this.doMakeGoo();
                this.goo--;
            }

            this.space_pressed = true;
        } else if (Keyboard.is_pressed.space == false) {
            this.space_pressed = false;
        }
    }

    didPlayerGetStuckInGoo() {
        for (var goo in this.goos) {
            if (Utils.hitTestRectangle(this.goos[goo], this.bug.sprite)) {

                this.removeGoo(goo);
                // apply effects to player
                console.log("stuck in goo");
                this.bug.stuckInGoo();
                this.party_guest.broadcastEvent("goo_used", goo);
            }
        }
    }

    removeGoo(goo) {
        this.stage.removeChild(this.goos[goo]);
        this.goos.splice(goo, 1);
    }

    // not used
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

    didPlayerChangePosition() {

        if (Math.abs(this.bug.sprite.rotation - this.last_rotation) > .1 ||
            Math.round(this.bug.sprite.x) != Math.round(this.last_x) ||
            Math.round(this.bug.sprite.y) != Math.round(this.last_y)) {

            this.party_guest.broadcastEvent("player_moved", {
                    playerNumber: this.party_guest.guest_number,
                    rotation: this.bug.sprite.rotation,
                    x: this.bug.sprite.x,
                    y: this.bug.sprite.y
                });
        }

        this.last_rotation = this.bug.sprite.rotation;
        this.last_x = this.bug.sprite.x;
        this.last_y = this.bug.sprite.y;
    }

    doMakeGoo() {
        var goo = this.makeGoo();
        this.party_guest.broadcastEvent("goo_created", {x: goo.position.x, y: goo.position.y});
    }

    makeGoo(position) {
        var goo = new PIXI.Sprite(this.goo_texture);

        if (position) {
            goo.position.set(
                position.x,
                position.y
            );
        } else {
            goo.position.set(
                this.bug.sprite.position.x + 20,
                this.bug.sprite.position.y + 20
            )
        }

        this.stage.addChildAt(goo, 0);
        this.goos.push(goo);
        return goo;
    }

    doMakeFood() {
        var food = this.makeFood();
        this.party_guest.broadcastEvent("food_created", {x: food.position.x, y: food.position.y, rotation: food.rotation});
    }

    makeFood(position, rotation) {
        
        var food = new PIXI.Sprite(this.food_texture);
        
        if (position) {
            food.position.set(
                position.x,
                position.y
            )
        } else {
            food.position.set(
                Math.random() * Window.screen_width,
                (Math.random() * Window.playable_height) + (Window.screen_height - Window.playable_height + 3)
            );
        }
    
        food.scale.set(0.2, 0.2);
        food.rotation = rotation || Math.random() * 2 * Math.PI;
        this.stage.addChild(food);
        this.foods.push(food);

        return food;
    }

    makePowerup() {

        var powerup = new PIXI.Sprite(this.speed_powerup_texture);

        powerup.position.set(
            Math.random() * Window.screen_width,
            (Math.random() * Window.playable_height) + (Window.screen_height - Window.playable_height + 3)
        );

        this.stage.addChild(powerup);
        this.powerups.push(powerup);
    }
}

export default GameScene;