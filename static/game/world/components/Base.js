import Window from "./../../utils/Window.js";

class Base {
    constructor(base_number, starting_value, playerName) {

        var baseSize = 70;

        var bases = {
            "1": {
                "color": "0xff0000",
                "position": new PIXI.Point(0, Window.screen_height - Window.playable_height)
            },
            "2": {
                "color": "0xffff00",
                "position": new PIXI.Point(Window.screen_width - baseSize, Window.screen_height - Window.playable_height)
            },
            "3": {
                "color": "0xff00ff",
                "position": new PIXI.Point(0, Window.screen_height - baseSize)
            },
            "4": {
                "color": "0x00ffff",
                "position": new PIXI.Point(Window.screen_width - baseSize, Window.screen_height - baseSize)
            },
        }

        this.playerNameText = new PIXI.Text(playerName.toString(), {fontSize: 16, fill: ['#ffffff']});
        this.playerNameText.y = 50;
        this.collected_text = new PIXI.Text(starting_value.toString());

        var base_texture = PIXI.Texture.fromImage("/img/base.png");
        this.sprite = new PIXI.Sprite(base_texture);
        
        this.sprite.tint = bases[base_number].color;
        this.sprite.position.copy(bases[base_number].position);

        this.sprite.addChild(this.collected_text);
        this.sprite.addChild(this.playerNameText);

        this.foodCollected = 0;
    }

    updateFoodCollectedDisplay(food) {
        this.collected_text.text = food.toString();
        this.foodCollected = food;
    }
}

export default Base;