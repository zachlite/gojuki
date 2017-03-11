var express = require("express");
var app = express();
var http = require("http");
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/socket_test.html');
});


var port = 8080;
server.listen(port, function () {
	console.log("listening on port " + port);
});


io.sockets.on("connection", function(socket) {
	
	console.log("connected client!: " + socket.id);
	
	socket.on('ADD_PLAYER', function (player_name, party_id) {
		socket.player_name = player_name;
		socket.party_id = party_id;
		socket.join(party_id);

		var players = [];
		console.log("players in " + party_id + ":");
		for (var socket_id in io.sockets.adapter.rooms[party_id].sockets) {
			var player_name = io.sockets.connected[socket_id].player_name
			console.log("\t" + player_name);
			players.push(player_name);
		}

		io.in(party_id).emit("PLAYER_JOINED", players);
	});

	socket.on('disconnect', function(){
		console.log("client disconnected");
		if (socket.player_name) {
			console.log(socket.player_name + " is leaving");
			console.log("players in " + socket.party_id + ":");
			var party = io.sockets.adapter.rooms[socket.party_id];
			if (party) {
				var players = [];
				for (var socket_id in party.sockets) {
					var player_name = io.sockets.connected[socket_id].player_name;
					console.log("\t" + player_name);
					players.push(player_name);
				}	
				
				io.in(socket.party_id).emit("PLAYER_LEFT", players)
			}
		}
	});


});

