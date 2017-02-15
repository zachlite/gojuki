import {scene_manager} from "../world/SceneManager.js";



class PartyGuest {
    constructor() {
        // tell the game manager i'm ready to play
        this.player_id = "player2";
        this.guest_number = null;
        this.players = null;
    }

    // communicates with the game manager
    // communicates with other players
    // implements scene changes
    // controls the active scene

   
    /* communication with GameManager:
    *********************************************/
    reportPlayerInitialized() {
        // send player id
        // get back players
        this.players = ["player1", "player2", "player3", "player4"];
        for (var player in this.players) {
            if (this.players[player] == this.player_id)
                this.guest_number = parseInt(player) + 1;
        }

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
        console.log(type);
        console.log(data);
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