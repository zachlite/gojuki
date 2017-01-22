import Keyboard from "./../utils/Keyboard.js";

class Car {
    constructor () {
        this.speed = 6.0;
        this.turn_speed = .1;
        this.sprite = this.initSprite();
    }

    initSprite() {
        var sprite = new PIXI.Sprite(
            PIXI.Texture.fromImage("img/car.png")
        );
        
        sprite.width = 50.0;
        sprite.height = 50.0;
        sprite.anchor.set(.5, .8);
        sprite.position.set(100, 100);
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
            this.moveForward();
        } else if (Keyboard.is_pressed.down) {
            this.moveBackward();
        }
        
    }

    turnLeft() {
        this.sprite.rotation -= this.turn_speed;
    }

    turnRight() {
        this.sprite.rotation += this.turn_speed;
    }

    moveForward() {
        var heading = this.sprite.rotation;
        var x_disp = Math.sin(heading);
        var y_disp = Math.cos(heading) * -1;

        this.sprite.x += (x_disp * this.speed);
        this.sprite.y += (y_disp * this.speed);
    }

    moveBackward() {

    }
}

export default Car;