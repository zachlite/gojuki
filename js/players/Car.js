class Car {
    constructor () {
        this.speed = 5.0;

        this.sprite = new PIXI.Sprite(
            PIXI.Texture.fromImage("img/car.png")
        );

        this.sprite.width = 50.0;
        this.sprite.height = 50.0;

        this.sprite.position.set(100, 100);
        this.sprite.rotation = Math.PI / 2.0;
    }

    update () {
        if (this.sprite.x > 640 + 50) {
            this.sprite.x = 0;
        } else {
            this.sprite.x += this.speed;        
        }
    }   
}

export default Car;