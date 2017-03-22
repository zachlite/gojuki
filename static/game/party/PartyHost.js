class PartyHost {
    constructor() {
        this.party_guests = ["player1", "player2", "player3", "player4"];
        this.guests_joined = 0;
        this.timer = null;
    }


    // start and manage game clock
    // coordinate scene changes
        // (tell players to change their scenes)

    acknowledgeGuestJoined() {

        // respond with opponents
        
        // after responding,
        
        this.guests_joined++;
        if (this.guests_joined == this.party_guests.length || 1) {
            this.instructLoadScene();
        }
    }

    instructLoadScene() {
        // tell them what scene to load
        // include information specific to scene
        // console.log("tell load scene!");
     
    }

}

export default PartyHost;