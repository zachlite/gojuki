var express = require("express");
var sha1 = require('sha1');
var path = require("path");
let party = express.Router();

party.get("/", function(req, res) {
	
	// create a party
	var party_id = sha1(Math.random());
	
	// forward to party url
	res.redirect("./party/"+party_id);

});

party.get("/:party_id", function(req, res) {
	// does this party exist?
	// is there room in this party?
	console.log("at party " + req.params.party_id);
	// res.sendFile(path.resolve(__dirname + "/../views/party.html"));
	res.render("party", {party_id: req.params.party_id});
});



module.exports = party;