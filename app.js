var PIXI = require("pixi.js");

var app = new PIXI.Application();
document.body.appendChild(app.view);

function degreesToRad(degrees) {
    return degrees * 0.0174533;
}


class Car {
    constructor() {

        this.speed = 10;

        this.sprite = new PIXI.Sprite.fromImage("car.png");
        this.sprite.pivot = new PIXI.Point(50,250);
        this.sprite.width = 50;
        this.sprite.height = 50;
        this.sprite.x = app.renderer.width / 2.0;
        this.sprite.y = app.renderer.height / 2.0;

        app.stage.addChild(this.sprite);
    }

    moveForward() {
        var heading = this.sprite.rotation;
        var x_disp = Math.sin(heading);
        var y_disp = Math.cos(heading) * -1;

        this.sprite.x += (x_disp * this.speed);
        this.sprite.y += (y_disp * this.speed);
    }

    turnLeft() {
        this.sprite.rotation -= degreesToRad(10);
    }

    turnRight() {
        this.sprite.rotation += degreesToRad(10);
    }


}

var car = new Car();
window.addEventListener("keydown", (e) => {
    if (e.code == "ArrowUp") {
        car.moveForward();
    } else if (e.code == "ArrowLeft") {
        car.turnLeft();
    } else if (e.code == "ArrowRight") {
        car.turnRight();
    }

})