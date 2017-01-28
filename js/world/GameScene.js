import Scene from "./Scene.js";
import Car from "./../players/Car.js";

class GameScene extends Scene {
    constructor() {
        super();
       
        this.car = new Car();
        

        PIXI.loader
            .add('spritesheet', 'img/sprites.json')
            .load(() => {

                var straight_track_texture = PIXI.Texture.fromFrame("track/track-straight.png");
                var curved_track_texture = PIXI.Texture.fromFrame("track/track-turn.png");

                var track_1 = new PIXI.Sprite(straight_track_texture);
                var track_2 = new PIXI.Sprite(straight_track_texture);
                var track_3 = new PIXI.Sprite(curved_track_texture);
                
                track_2.x = track_1.x + straight_track_texture._frame.width - 2;
                track_3.x = track_2.x + straight_track_texture._frame.width + curved_track_texture._frame.width / 2.0 - 2;
                track_3.y = curved_track_texture._frame.width / 2.0;
                track_3.anchor.set(.5, .5);
                track_3.rotation = 3 * Math.PI / 2.0;



                console.log(track_3);

                this.stage.addChild(track_1);          
                this.stage.addChild(track_2);
                this.stage.addChild(track_3);
                this.stage.addChild(this.car.sprite);

            });
        
     

        // console.log(track);
        // this.stage.addChild(track);
        // console.log(PIXI.utils.TextureCache);

        this.actors.push(this.car);
    }

    update() {

        // update all children of this scene
        super.update();
        
        // handle updates of scene specific events
    }
}

export default GameScene;