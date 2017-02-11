import * as Utils from "./../utils/Utils.js";
import Window from "./../utils/Window.js";
import Scene from "./Scene.js";
import Bug from "./../players/Bug.js";
import Base from "./components/Base.js";

class GameScene extends Scene {
    constructor() {
        super();

        this.base = new Base();
        this.stage.addChild(this.base.sprite);



        this.foods = [];

        this.bug = new Bug();
        this.actors.push(this.bug);
        this.stage.addChild(this.bug.sprite);
        
        this.food_texture = PIXI.Texture.fromImage('img/food.png');

        for (var i = 0; i < 10; i++) {
            this.makeFood();
        }


        this.powerups = [];
        this.speed_powerup_texture = PIXI.Texture.fromImage("img/speed.png");

        // setTimeout(() => {
            // setInterval(() => {
                this.makePowerup();
            // }, 1000);
        // }, 5000);
    }

    update() {

        super.update();

        this.didBugEatFood();

        this.didBugReturnToBase();

        this.didBugCollectPowerup();

    }

    didBugEatFood() {
        for (var food in this.foods) {

            if (Utils.hitTestRectangle(this.foods[food], this.bug.sprite)) {
                
                // the food is collected
                if (this.bug.foods < this.bug.max_foods) {
                    this.bug.foods += 1;

                    // the food gets removed
                    this.stage.removeChild(this.foods[food]);
                    this.foods.splice(food, 1);

                    // make more food
                    this.makeFood();
                }
            }
        }
    }

    didBugReturnToBase() {
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

    makeFood() {
        
        var food = new PIXI.Sprite(this.food_texture);
        
        food.position.set(
            Math.random() * Window.screen_width,
            Math.random() * Window.screen_height
        );
        
        food.scale.set(0.2, 0.2);
        food.rotation = Math.random() * 2 * Math.PI;
        this.stage.addChild(food);
        this.foods.push(food);
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