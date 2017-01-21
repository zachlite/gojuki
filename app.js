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

// var sprites = {};
// var loader = PIXI.loader.add('cloudstars', "imgs/cloudstars.jpg").add('star1', "imgs/star1.png").add('star2', "imgs/star2.png").add('star3', "imgs/star3.png").add('star4', "imgs/star4.png").add('ship', "imgs/ship_blue.png").add('shield_straight', "imgs/shield_straight.png").add('shield_edge', "imgs/shield_edge.png").add('title_ship', "imgs/title_ship.png").load(function(loader, resources) {
//     sprites.cloudstars = new PIXI.TilingSprite(resources.cloudstars.texture);
//     sprites.star1 = new PIXI.TilingSprite(resources.star1.texture);
//     sprites.star2 = new PIXI.TilingSprite(resources.star2.texture);
//     sprites.star3 = new PIXI.TilingSprite(resources.star3.texture);
//     sprites.star4 = new PIXI.TilingSprite(resources.star4.texture);
//     sprites.ship = new PIXI.Sprite(resources.ship.texture);
//     sprites.shield_straight = new PIXI.Sprite(resources.shield_straight.texture);
//     sprites.shield_edge = new PIXI.Sprite(resources.shield_edge.texture);
//     sprites.title_ship = new PIXI.Sprite(resources.title_ship.texture);
//     var ready = setTimeout(accountSetup, 3000);
// })
// 
// pixi.loader.add('car', 'car.png').load(function(loader, resources) {

//     var car = new pixi.Sprite(resources.car.texture);

//     car.width = 50;
//     car.height = 50;

//     car.x = app.renderer.width / 2;
//     car.y = app.renderer.height / 2;

//     car.anchor.x = .5;
//     car.anchor.y = .5;

//     app.stage.addChild(car);

//     app.ticker.add(function() {
//         car.rotation += .01;
//     });
// });