import Window from "./../../utils/Window.js";
import PlayerConfig from "./../../players/PlayerConfig.js";

class Base {
    constructor(playerNumber, starting_value, playerName) {
        
        this.playerNameText = new PIXI.Text(playerName.toString(), {fontSize: 16, fill: ['#ffffff']});
        this.playerNameText.y = 50;
        this.collected_text = new PIXI.Text(starting_value.toString());

        var base_texture = PIXI.Texture.fromImage("/img/base.png");
        this.sprite = new PIXI.Sprite(base_texture);
        
        this.sprite.tint = PlayerConfig[playerNumber].color;
        this.sprite.position.copy(PlayerConfig[playerNumber].basePosition);

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