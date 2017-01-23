class SceneManager {

    constructor() {
        this.scenes = {};
        this.current_scene = null;
    }

    createScene(id, Tscene) {
        var scene_instance = new Tscene();
        this.scenes[id] = scene_instance;
    }

    goToScene(id) {
        
        if (this.scenes[id]) {

            if (this.current_scene) {
                this.current_scene.pause();
            }

            this.current_scene = this.scenes[id];
            this.current_scene.resume();
            return true;
        }

        return false;
    }   

}

export let scene_manager = new SceneManager();
