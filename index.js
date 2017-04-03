var express = require("express");
var party = require("./routes/party");
var app = express();
var http = require("http");
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var mustacheExpress = require("mustache-express");
var path = require("path");

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");
app.disable('view cache');

app.use("/static", express.static(path.join(__dirname, "/static")));
app.use("/img", express.static(path.join(__dirname, "/img")));

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.use("/party", party);

app.get("/upgrades", function(req, res) {
	res.render("upgrades", {data: req.query.data});
});

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

	socket.on('REQUEST_JOIN_PARTY', function (playerName, partyId) {
		var players = getPlayersInParty(partyId);
		var response = {};

		if (players.length >= 4) {
			response.canJoin = false;
			response.error = "Party is full";	
		} else if (players.indexOf(playerName) > -1) {
			response.canJoin = false;
			response.error = "The name '" + playerName + "' is taken by another player.";
		} else {
			response.canJoin = true;
			response.playerNumber = players.length + 1;
			response.currentScene = null;
			socket.playerName = playerName;
			socket.partyId = partyId;
			socket.join(partyId);
		}

		socket.emit("REQUEST_JOIN_PARTY_RESPONSE", response);

	});

	socket.on("PLAYER_IN_LOBBY", function () {
		console.log(socket.playerName + " in party.");
		var partyId = socket.partyId;
		var players = getPlayersInParty(partyId);
		io.in(partyId).emit("PLAYER_JOINED_LOBBY", players);
		if (players.length == 2) {
			io.in(partyId).emit("LOBBY_ENDED", players);
		}
	});

	socket.on("NEED_PLAYERS", function () {
		socket.emit("NEED_PLAYERS_RESPONSE", getPlayersInParty(socket.partyId));
	});

	socket.on("GAME_OVER", function () {
		io.in(socket.partyId).emit("GAME_ENDED");
	});

	socket.on("GAME_TIME_TICK", function (gameTime) {
		io.in(socket.partyId).emit("GAME_TIME_TICKED", gameTime);
	});

	socket.on("UPGRADES_TIME_TICK", function (upgradesTime) {
		io.in(socket.partyId).emit("UPGRADES_TIME_TICKED", upgradesTime);
	});

	socket.on("UPGRADES_OVER", function () {
		io.in(socket.partyId).emit("UPGRADES_ENDED");
	});

	socket.on("PLAYER_EVENT", function (type, data) {
		socket.broadcast.to(socket.partyId).emit("PLAYER_EVENT", type, data);
	});

	socket.on("disconnect", function() {
		console.log("client disconnected");
		if (socket.playerName) {
			console.log(socket.playerName + " left " + socket.partyId);
			var players = getPlayersInParty(socket.partyId);
			io.in(socket.partyId).emit("PLAYER_LEFT", players);
		}
	});

});

server.listen(8080, function() {
    console.log("listning on port 8080");
});