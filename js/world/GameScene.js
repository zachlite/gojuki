import Window from "./../utils/Window.js";
import Scene from "./Scene.js";
import Bug from "./../players/Bug.js";


class Base {
    constructor() {

        this.food_collected = 0;
        this.collected_text = new PIXI.Text("0");

        var base_texture = PIXI.Texture.fromImage("img/base.png");
        this.sprite = new PIXI.Sprite(base_texture);
        this.sprite.position.set(0, 0);

        this.sprite.addChild(this.collected_text);
    }

    collectFood(food) {
        this.food_collected += food;
        this.collected_text.text = this.food_collected;

    }
}



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

        // update all children of this scene
        super.update();

        for (var food in this.foods) {

            if (this.hitTestRectangle(this.foods[food], this.bug.sprite)) {
                
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


        // check for the bug coming back to base
        if (this.hitTestRectangle(this.base.sprite, this.bug.sprite)) {
            this.base.collectFood(this.bug.foods);
            this.bug.foods = 0;
        }


        // check for powerup collection
        for (var powerup in this.powerups) {
            if (this.hitTestRectangle(this.powerups[powerup], this.bug.sprite)) {

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

    hitTestRectangle(r1, r2) {

        //Define the variables we'll need to calculate
        var hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

        //hit will determine whether there's a collision
        hit = false;

        //Find the center points of each sprite
        r1.centerX = r1.x + r1.width / 2;
        r1.centerY = r1.y + r1.height / 2;
        r2.centerX = r2.x + r2.width / 2;
        r2.centerY = r2.y + r2.height / 2;

        //Find the half-widths and half-heights of each sprite
        r1.halfWidth = r1.width / 2;
        r1.halfHeight = r1.height / 2;
        r2.halfWidth = r2.width / 2;
        r2.halfHeight = r2.height / 2;

        //Calculate the distance vector between the sprites
        vx = r1.centerX - r2.centerX;
        vy = r1.centerY - r2.centerY;

        //Figure out the combined half-widths and half-heights
        combinedHalfWidths = r1.halfWidth + r2.halfWidth;
        combinedHalfHeights = r1.halfHeight + r2.halfHeight;

        //Check for a collision on the x axis
        if (Math.abs(vx) < combinedHalfWidths) {

            //A collision might be occuring. Check for a collision on the y axis
            if (Math.abs(vy) < combinedHalfHeights) {

                //There's definitely a collision happening
                hit = true;
            } else {

                //There's no collision on the y axis
                hit = false;
            }
        } else {

            //There's no collision on the x axis
            hit = false;
        }

        //`hit` will be either `true` or `false`
        return hit;
    };
}

export default GameScene;