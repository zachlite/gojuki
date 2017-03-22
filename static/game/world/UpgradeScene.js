import {scene_manager} from "./SceneManager.js";
import Window from "./../utils/Window.js";
import Scene from "./Scene.js";


class ItemStepper {
    constructor(item, original_value, scene) {
        this.item = item;
        this.scene = scene;
        this.stepper_container = new PIXI.Container();

        this.stepper_display = new PIXI.Text(original_value.toString(), {fill: 0xffffff});
        this.stepper_display.position.set(0, 0);

        var up_btn_texture = PIXI.Texture.fromImage('img/up.png');
        var down_btn_texture = PIXI.Texture.fromImage("img/down.png");

        var up_btn = new PIXI.Sprite(up_btn_texture);
        var down_btn = new PIXI.Sprite(down_btn_texture);

        up_btn.scale.set(0.5, 0.5);
        down_btn.scale.set(0.5, 0.5);

        up_btn.interactive = true;
        down_btn.interactive = true;

        up_btn.position.set(this.stepper_display.width * 3, -15);
        down_btn.position.set(this.stepper_display.width * 3, 15);

        up_btn.on("mouseup", this.didPressUp.bind(this));
        down_btn.on("mouseup", this.didPressDown.bind(this));

        this.stepper_container.addChild(this.stepper_display);
        this.stepper_container.addChild(up_btn);
        this.stepper_container.addChild(down_btn);
    }

    didPressUp() {
        this.scene.didAddItem(this.item)
    }

    didPressDown() {
        this.scene.didRemoveItem(this.item);
    }

    setStepperDisplay(val) {
        this.stepper_display.text = val.toString();
    }
}



class UpgradeScene extends Scene{
    constructor(party_guest, scene_data) {
        super();

        scene_data = scene_data || {
            food: 20,
            food_carry_limit: 5,
            speed: 5,
            goo: 3
        };
        
        this.upgrades = {
            "food_carry_limit": {
                cost: 3,
                current_value: scene_data.food_carry_limit,
                starting_value: scene_data.food_carry_limit,
                title: "Food Limit",
                description: "Increase the amount of food you can hold before needing to return to your base.",
                layout: {
                    x: 250,
                    y: 200
                }
            },
            "speed": {
                cost: 5,
                current_value: scene_data.speed,
                starting_value: scene_data.speed,
                title: "Top Speed",
                description: "Increase your top speed.",
                layout: {
                    x: 250,
                    y: 350
                }
            },
            "goo": {
                cost: 8,
                current_value: scene_data.goo,
                starting_value: scene_data.goo,
                title: "Sticky Goo",
                description: "Drop sticky goo to slow your opponents down fro 5 seconds.",
                layout: {
                    x: 650,
                    y: 200
                }
            }
        };

        this.steppers = {}; 
        var count = 0;
        for (var upgrade in this.upgrades) {
            
            var stepper = new ItemStepper(
                upgrade, 
                this.upgrades[upgrade].starting_value,
                this
            );

            stepper.stepper_container.position.set(
                this.upgrades[upgrade].layout.x, 
                this.upgrades[upgrade].layout.y
            );

            this.stage.addChild(stepper.stepper_container);
            this.steppers[upgrade] = stepper;
        }


        this.food_available = scene_data.food;
        this.food_display = new PIXI.Text("Food available to spend: " + this.food_available.toString(), {fill :0xffffff});
        this.food_display.position.set(20, 20);

        this.time_left_display = new PIXI.Text("Time until next round: " + 20 + " seconds", {fill: 0xffffff});
        this.time_left_display.position.set(Window.screen_width - this.time_left_display.width - 20, 20);

        this.stage.addChild(this.food_display);
        this.stage.addChild(this.time_left_display);

    }

    didRemoveItem(type) {
        if (this.upgrades[type].current_value > this.upgrades[type].starting_value) {
            this.food_available += this.upgrades[type].cost;
            this.food_display.text = "Food available to spend: " + this.food_available.toString();
            this.steppers[type].setStepperDisplay(--this.upgrades[type].current_value);

            if (this.upgrades[type].current_value == this.upgrades[type].starting_value) {

            }
        }
    }

    didAddItem(type) {
        var cost = this.upgrades[type].cost;
        if (this.food_available >= cost) {
            this.food_available -= cost;
            this.food_display.text = "Food available to spend: " + this.food_available.toString();
            this.steppers[type].setStepperDisplay(++this.upgrades[type].current_value);
        }
    }

    didReceiveEvent(type, data) {
        switch(type) {
            case "game_time_tick":
                this.didTimeChange(data);
                break;
        }      
    }

    didTimeChange(time_left) {
        this.time_left_display.text = "Time until next round: " + (time_left/1000.0).toString() + " seconds";
    }

    getSceneData() {
        return {
            food: this.food_available,
            food_carry_limit: this.upgrades["food_carry_limit"].current_value,
            speed: this.upgrades["speed"].current_value,
            goo: this.upgrades["goo"].current_value
        };
    }

    update() {
        super.update();
    }

}

export default UpgradeScene;
