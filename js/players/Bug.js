import Keyboard from "./../utils/Keyboard.js";
import Window from "./../utils/Window.js";

class Bug {
    constructor () {

        this.v = 0.0;
        this.v_max = 8.0;
        this.v_max_reverse = -5.0;
        this.acc = 1.0;
        this.friction = .98;

        this.turn_speed = .015;
        this.sprite = this.initSprite();
    }

    initSprite() {
        var sprite = new PIXI.Sprite(
            PIXI.Texture.fromImage("img/car.png")
        );
        
        sprite.width = 20.0;
        sprite.height = 20.0;
        sprite.anchor.set(.5, .7);
        sprite.position.set(Math.random() * 1000, Math.random() * 500);
        sprite.rotation = Math.PI / 2.0;
        
        return sprite;
    }

    update () {

        if (Keyboard.is_pressed.left) {
            this.turnLeft();
        } else if (Keyboard.is_pressed.right) {
            this.turnRight();
        }

        if (Keyboard.is_pressed.up) {
            this.thrust();
        } else if (Keyboard.is_pressed.down) {
            this.reverse();        
        } else {
            this.coast();
        }


        // good to know...
        // 
        // if (this.sprite.position.x > Window.screen_width - this.sprite.width / 2.0) {
        //     this.sprite.position.x = Window.screen_width - this.sprite.width / 2.0;
        //     this.v_max = Math.min(Math.abs(5.0 / Math.cos(this.sprite.rotation)), 10);
        // } else {
        //     this.v_max = 10;
        // }

    }

    turnLeft() {
        this.sprite.rotation -= (this.turn_speed * this.v);
    }

    turnRight() {
        this.sprite.rotation += (this.turn_speed * this.v);
    }

    thrust() {

        this.v = Math.min(
            this.v + this.acc,
            this.v_max
        );

        this.move();
    }

    reverse() {

        this.v = Math.max(
            this.v - .5,
            this.v_max_reverse
        );

        this.move();
    }

    coast() {

        var v_adj = this.v * this.friction;
        this.v = (Math.abs(v_adj) < 0.1) ? 0 : v_adj;

        this.move();

    }

    move () {

        var heading = this.sprite.rotation;
        var x_disp = Math.sin(heading);
        var y_disp = Math.cos(heading) * -1;
        
        this.sprite.x += (x_disp * this.v);
        this.sprite.y += (y_disp * this.v);
        
    }

}

export default Bug;