class Base {
    constructor() {

        this.food_collected = 0;
        this.collected_text = new PIXI.Text("0");

        var base_texture = PIXI.Texture.fromImage("img/base.png");
        this.sprite = new PIXI.Sprite(base_texture);
        this.sprite.position.set(0, 0);

        this.sprite.addChild(this.collected_text);
    }

    collectFood(food) {
        this.food_collected += food;
        this.collected_text.text = this.food_collected;

    }
}

export default Base;