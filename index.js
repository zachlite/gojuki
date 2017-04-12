var express = require("express");
var app = express();
var http = require("http");
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var party = require("./routes/party")(io);
var mustacheExpress = require("mustache-express");
var path = require("path");

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");
app.disable('view cache');

app.use("/static", express.static(path.join(__dirname, "/static")));
app.use("/img", express.static(path.join(__dirname, "/img")));
app.use("/style", express.static(path.join(__dirname, "/style")));

app.get("/", function(req, res) {
	res.render("index");
});

app.use("/party", party.party);

app.get("/upgrades", function(req, res) {
	res.render("upgrades", {data: req.query.data});
});


io.sockets.on("connection", function(socket) {

	socket.on('REQUEST_JOIN_PARTY', function (playerName, partyId) {
		var players = party.getPlayerNamesInParty(partyId);
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
		var partyId = socket.partyId;
		socket.inLobby = true;
		var playerNames = party.getPlayerNamesInParty(partyId);
		io.in(partyId).emit("PLAYER_JOINED_LOBBY", playerNames);
		if (playerNames.length == 4) {

			var players = party.getPlayersInParty(partyId);
			for (var player in players) {
				players[player].inLobby = false;
			}

			io.in(partyId).emit("LOBBY_ENDED", playerNames);
		}
	});

	socket.on("NEED_PLAYERS", function () {
		socket.emit("NEED_PLAYERS_RESPONSE", party.getPlayerNamesInParty(socket.partyId));
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

	socket.on("WINNER_ANNOUNCEMENT_OVER", function () {
		io.in(socket.partyId).emit("WINNER_ANNOUNCEMENT_ENDED");
	});

	socket.on("disconnect", function() {
		if (socket.playerName) {
			var players = party.getPlayerNamesInParty(socket.partyId);
			io.in(socket.partyId).emit("PLAYER_LEFT", players);
		}
	});

});

server.listen(8080, function() {
    console.log("listning on port 8080");
});