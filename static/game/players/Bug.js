import Keyboard from "./../utils/Keyboard.js";
import Window from "./../utils/Window.js";
import PlayerConfig from "./PlayerConfig.js";

class Bug {
    constructor (number, v_max) {
        this.v = 0.0;
        this.v_max = v_max;
        this.v_max_reverse = -5.0;
        this.v_max_orig = this.v_max;
        this.v_max_reverse_orig = this.v_max_reverse;
        this.acc = 1.0;
        this.friction = .9;
        this.turn_speed = .1;
        this.sprite = this.initSprite(number);
    }

    initSprite(number) {
        var frames = [];
        for (var i = 1; i <= 4; i++) {
            frames.push(PIXI.Texture.fromImage("/img/bug/bug" + i + ".png"))
        }

        var bug = new PIXI.extras.AnimatedSprite(frames);
        bug.position.copy(PlayerConfig[number].startPosition);
        bug.tint = PlayerConfig[number].color;
        bug.anchor.set(.5, .7);
        bug.scale.x *= .1;
        bug.scale.y *= .1;
        bug.animationSpeed = .25;
        return bug;
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

        if (this.v > 0) {
            this.sprite.play();
        } else {
            this.sprite.stop();
        }


        if (this.sprite.position.x > Window.screen_width - this.sprite.width / 2.0) {
            this.sprite.position.x = Window.screen_width - this.sprite.width / 2.0;
        
        } else if (this.sprite.position.x < 0 + this.sprite.width / 2.0) {
            this.sprite.position.x = 0 + this.sprite.width / 2.0;
        }

        if (this.sprite.position.y > Window.screen_height - this.sprite.height / 2.0) {
            this.sprite.position.y = Window.screen_height - this.sprite.height / 2.0;
        
        } else if (this.sprite.position.y < (Window.screen_height - Window.playable_height) + this.sprite.height / 2.0) {
            this.sprite.position.y = (Window.screen_height - Window.playable_height) + this.sprite.height / 2.0;
        }

    }

    turnLeft() {
        this.sprite.rotation -= this.turn_speed;
    }

    turnRight() {
        this.sprite.rotation += this.turn_speed;
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

    superSpeed() {
        var initial = this.v_max;
        this.v_max = 8;

        setTimeout(() => {
            this.v_max = initial;
        }, 5000);
    }

    stuckInGoo() {
        var initial_v_max = this.v_max_orig;
        var initial_v_max_reverse = this.v_max_reverse_orig;
        this.v_max = .5;
        this.v_max_reverse = -.5;
        setTimeout(() => {
            this.v_max = initial_v_max;
            this.v_max_reverse = initial_v_max_reverse;
        }, 5000);
    }

}

export default Bug;