import {scene_manager} from "./SceneManager.js";
import Window from "./../utils/Window.js";
import Scene from "./Scene.js";

class UpgradeScene extends Scene{
    constructor(party_guest, scene_data) {
        super();

        console.log("UPGRADES SCENE");
        console.log(scene_data);
    }

    update() {
        super.update();
    }

}

export default UpgradeScene;

// Hi everyone, long time lurker here, but that ends tonight!

// As someone who has very little experience making games, I wanted to share my perspective of what its been like to get started.  This is aimed at people who have little experience making games, or are just starting out, but more experienced game developers might find it interesting as well.

// For a little background, I've been programming professionally for a few years now, but I've never made games..  made an iphone game once but it sucekd

// everyone says "Make games, not engines"
// true, but without structure, shit can get crazy
// especially if you find some random tutorial or blog online with example code.  It can be hard to figure out how to structure your game
