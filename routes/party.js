var express = require("express");
let party = express.Router();
let partyController = require("../controllers/PartyController");

party.get("/", function(req, res) {
	
	// assume a player name has been set
	req.session.player_name = "baller9";

	// create a party
	var party_id = partyController.createParty();
	
	// forward to party url
	res.redirect("./party/"+party_id);

});

party.get("/:party_id", function(req, res) {

	if (!req.session.player_name) {
		res.redirect("./"+req.params.party_id+"/join");
	} else {
		console.log("add " + req.session.player_name + " as guest");
		partyController.addGuest(
			req.params.party_id,
			req.session.player_name
		);
		res.send("ok here is party " + req.params.party_id + "<br> you are playing as " + req.session.player_name);
	}

});

party.get("/:party_id/join", function(req, res) {
	res.send("need to join da party! <input placeholder='name'>");
});

module.exports = party;