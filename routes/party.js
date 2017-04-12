var express = require("express");
var sha1 = require('sha1');
var path = require("path");

module.exports = function (io) {
	
	let party = express.Router();

	function getPlayersInParty(partyId) {
		var players = [];
		var party = io.sockets.adapter.rooms[partyId];
		if (party) {
			for (var socketId in party.sockets) {
				players.push(io.sockets.connected[socketId]);
			}
		}
		return players;
	};

	function getPlayerNamesInParty(partyId) {
		var pNames = [];
		var players = getPlayersInParty(partyId);
		for (player in players) {
			pNames.push(players[player].playerName);
		}
		return pNames;
	}

	function getPartyId() {
		var partyId = sha1(Math.random());

		for (var socket in io.sockets.connected) {
			var pId = io.sockets.connected[socket].partyId;

			// get the players in this party
			var players = getPlayersInParty(pId);
			if (players.length) {
				if (players.length < 4 && players[0].inLobby) {			
					return pId;
				}
			}
		}

		return partyId;
	}
	
	party.get("/", function(req, res) {
		
		var partyId = getPartyId();
		res.redirect("./party/"+partyId);

	});

	party.get("/:party_id", function(req, res) {
		res.render("party", {party_id: req.params.party_id});
	});

	return {
		party: party,
		getPlayersInParty: getPlayersInParty,
		getPlayerNamesInParty: getPlayerNamesInParty
	};

}