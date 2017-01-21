class GameLoop {
    
    constructor(scope) {
        this.scope = scope;
        this.paused = false;
        this.start();
    }

    start() {

        var mainLoop = () => {

            this.loop_handle = requestAnimationFrame(mainLoop);

            // update 
            this.scope.gameUpdater.update();

            // render  
            this.scope.gameRenderer.render();

        };

        mainLoop();

    }

    stop() {
        cancelAnimationFrame(this.loop_handle);
    }

}


export default GameLoop