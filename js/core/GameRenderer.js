class GameRenderer {
    constructor (game_env) {
        this.game_env = game_env;
        this.renderer = PIXI.autoDetectRenderer(640, 480);
        document.body.appendChild(this.renderer.view);
    }

    render() {
        this.renderer.render(this.game_env.scene.sprites);
    }
}

export default GameRenderer;