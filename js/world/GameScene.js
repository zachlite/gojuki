import Scene from "./Scene.js";
import Car from "./../players/Car.js";

class GameScene extends Scene {
    constructor() {
        super();
       
        this.car = new Car();
        
        this.actors.push(this.car);
        this.stage.addChild(this.car.sprite);
    }

    update() {

        // update all children of this scene
        super.update();
        
        // handle updates of scene specific events
    }
}

export default GameScene;