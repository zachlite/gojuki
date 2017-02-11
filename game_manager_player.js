class GameManager {
    constructor () {

    }


    // start and manage game clock
    // coordinate scene changes
        // (tell players to change their scenes)

    acknowledgeJoinedPlayer() {

    }

    acknowledgeLoadedScene() {

    }

    acknowledgeStoppedScene() {

    }

    instructLoadScene() {
        // tell them what scene to load
    }

    instructStartScene() {
        // tell them to start their current scene
    }        

    instructStopScene() {
        // tell players to stop their current scene
    }


}


class Player {
    constructor() {
        // tell the game manager i'm ready to play
    }

    // communicates with the game manager
    // communicates with other players
    // implements scene changes
    // controls the active scene

   
    /* communication with GameManager:
    *********************************************/
    reportPlayerInitialized() {

    }
    
    reportSceneLoaded() {
        // tell the scene manager the scene has been loaded
    }

    reportSceneStopped() {
        
    }
    
    loadScene() {
        // load the right scene
        // initialize the scene with data
    }
    
    startScene() {
        // start the scene once the scene manager gives the all clear
    }

    
    /* communication with players:
    events that happen in this gamescene:
    *********************************************/
    broadcastPlayerPosition() {

    }

    broadcastFoodCreated() {

    }

    broadcastFoodEaten() {

    }

    broadcastScoreChanged() {

    }

    broadcastPowerupCreated() {

    }

    broadcastPowerupConsumed() {

    }


    /* communication with players:
    events that happen in this gamescene:
    *********************************************/
    
    

}