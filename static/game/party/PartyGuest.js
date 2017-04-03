import {sceneManager} from "../world/SceneManager.js";

class PartyGuest {
    constructor(playerNumber, players, socket) {
        this.guest_number = playerNumber;
        this.players = players;
        this.socket = socket;

        this.socket.on("PLAYER_EVENT", (type, data) => {
            this.receiveEvent(JSON.parse(type), JSON.parse(data));
        })
    }

    broadcastEvent(type, data) {
        this.socket.emit("PLAYER_EVENT", JSON.stringify(type), JSON.stringify(data));
    }

    receiveEvent(type, data) {
        sceneManager.currentScene.didReceiveEvent(type, data);
    }

    destroy() {
        this.socket.removeAllListeners("PLAYER_EVENT");
    }
}

export default PartyGuest;