class GameLoop {
    
    constructor(game_updater, game_renderer) {
        this.game_updater = game_updater;
        this.game_renderer = game_renderer;
        this.start();
    }

    start() {

        var mainLoop = () => {

            this.loop_handle = requestAnimationFrame(mainLoop);

            // update 
            this.game_updater.update();

            // render  
            this.game_renderer.render();

        };

        mainLoop();

    }

    stop() {
        cancelAnimationFrame(this.loop_handle);
    }

}


export default GameLoop