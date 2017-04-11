var express = require("express");
var sha1 = require('sha1');
var path = require("path");

module.exports = function (io) {
	
	let party = express.Router();
	
	party.get("/", function(req, res) {
		
		// var parties = io.sockets.adapter.rooms;
		// res.send(parties);

		// create a party
		// var partyId = sha1(Math.random());

		// var parties = io.sockets.adapter.rooms;
		// for (var party in parties) {
		// 	var numPlayers = parties[party].sockets.length;
		// 	console.log("testing party"); console.log(parties[party]);
		// 	if (numPlayers < 4) {
		// 		partyId = parties[party][partyId];
		// 		break;
		// 	}
		// }


		// // forward to party url
		var partyId = sha1(Math.random());
		res.redirect("./party/"+partyId);

	});

	party.get("/:party_id", function(req, res) {
		// does this party exist?
		// is there room in this party?
		var parties = io.sockets.adapter.rooms;
		console.log(parties);
		console.log("at party " + req.params.party_id);
		// res.sendFile(path.resolve(__dirname + "/../views/party.html"));
		res.render("party", {party_id: req.params.party_id});
	});

	return party;

}