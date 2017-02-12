class Base {
    constructor(base_number) {

        var bases = {
            "1": {
                "color": "0xff0000",
                "position": new PIXI.Point(0, 0)
            },
            "2": {
                "color": "0xffff00",
                "position": new PIXI.Point(500, 0)
            },
            "3": {
                "color": "0xff00ff",
                "position": new PIXI.Point(0, 500)
            },
            "4": {
                "color": "0x00ffff",
                "position": new PIXI.Point(500, 500)
            },
        }

        this.food_collected = 0;
        this.collected_text = new PIXI.Text("0");

        var base_texture = PIXI.Texture.fromImage("img/base.png");
        this.sprite = new PIXI.Sprite(base_texture);
        
        this.sprite.tint = bases[base_number].color;
        this.sprite.position.copy(bases[base_number].position);

        this.sprite.addChild(this.collected_text);
    }

    collectFood(food) {
        this.food_collected += food;
        this.collected_text.text = this.food_collected.toString();

    }
}

export default Base;