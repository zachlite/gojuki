import {scene_manager} from "../world/SceneManager.js";

class PartyGuest {
    constructor(playerNumber, players, socket) {
        this.guest_number = playerNumber;
        this.players = players;
        this.socket = socket;

        this.socket.on("PLAYER_EVENT", (type, data) => {
            console.log("event received!");
            // console.log(type);
            // console.log(data);
            // return;
            this.receiveEvent(JSON.parse(type), JSON.parse(data));
        })
    }

    
    loadScene(scene_id) {
        var scene_data = null;
        
        if (scene_manager.current_scene) {
            scene_data = scene_manager.current_scene.getSceneData();        
        }

        scene_manager.createScene(scene_id, this, scene_data);
    }
    
        
    /* communication with players:
    events that happen in this gamescene:
    *********************************************/
    broadcastEvent(type, data) {
        this.socket.emit("PLAYER_EVENT", JSON.stringify(type), JSON.stringify(data));
    }

    receiveEvent(type, data) {
        scene_manager.current_scene.didReceiveEvent(type, data);
    }


    // broadcastPlayerPosition() {

    // }

    // broadcastFoodCreated() {

    // }

    // broadcastFoodEaten() {

    // }

    // broadcastScoreChanged() {

    // }

    // broadcastPowerupCreated() {

    // }

    // broadcastPowerupConsumed() {

    // }


    /* communication with players:
    events that happen in this gamescene:
    *********************************************/
    
}

export default PartyGuest;