var express = require("express");
var party = require("./routes/party");
var app = express();
var http = require("http");
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var mustacheExpress = require("mustache-express");

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.use("/dist", express.static(__dirname + "/dist"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.use("/party", party);



function getPlayersInParty(partyId) {
	var players = [];
	var party = io.sockets.adapter.rooms[partyId];
	if (party) {
		for (var socketId in party.sockets) {
			players.push(io.sockets.connected[socketId].playerName);
		}
	}
	return players;
};

io.sockets.on("connection", function(socket) {

	console.log("connected client!: " + socket.id);

	socket.on('ADD_PLAYER', function (playerName, partyId) {
		socket.playerName = playerName;
		socket.partyId = partyId;
		socket.join(partyId);
		console.log(playerName + " joined " + partyId);
		
		var players = getPlayersInParty(partyId);

		io.in(partyId).emit("PLAYER_JOINED", players);
	});

	socket.on("disconnect", function() {
		console.log("client disconnected");
		if (socket.playerName) {
			console.log(socket.playerName + " left " + socket.partyId);
			console.log(socket.partyId);
			var players = getPlayersInParty(socket.partyId);
			io.in(socket.partyId).emit("PLAYER_LEFT", players);
		}
	});

});

server.listen(8080, function() {
    console.log("listning on port 8080");
});