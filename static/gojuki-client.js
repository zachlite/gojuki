var IO = require("socket.io-client");
var socket = IO.connect();
var partyId = document.getElementById("party").dataset.partyId;
import Lobby from "./lobby/Lobby";
import Game from "./game/game";

var playerName = prompt("What is your player name?");
var playerNumber = null;
var roundsPlayed = 0;

socket.emit("REQUEST_JOIN_PARTY", playerName, partyId);

socket.on("REQUEST_JOIN_PARTY_RESPONSE", function(canJoin, pNumber) {
	if (canJoin) {
		playerNumber = pNumber;
		console.log("joined party");
		goToLobby() // fixed for now.

	} else {
		console.log("can not join party!");
		alert("This party is full");
		window.location.href = "/";
	}
});

// socket.on("LOBBY", function(playerNumber) {
// 	goToLobby(playerNumber);
// });

socket.on("GO_TO_GAME", function() {
	goToGame();
});

// socket.on("UPGRADES", function(){
// 	goToUpgrades(playerNumber);
// });

var currentScene = null;
var playerStats = null;

function goToLobby() {
	console.log("lobby here!");
	console.log(playerNumber);
	currentScene = new Lobby(socket, playerNumber);
}

function goToGame() {
	console.log("game here!");
	console.log("you are player " + playerNumber);
	if(currentScene) currentScene.unmount(); 
	currentScene = new Game(socket, playerNumber);
}

function goToUpgrades() {
	console.log("upgrades here!");
	console.log(playerNumber);
}







// var Lobby = require("./lobby/lobby.js");
// var socket = require("socket.io");

// const mountPoint = document.getElementById('gojuki');

// var lobby = new Lobby(socket, mountPoint);



// // class GojukiClientManager {
// // 	constructor(socket) {
// // 		this.socket = socket;
// // 		this.roundsPlayed = 0;
// // 		this.nextScene = "round";
// // 		this.playerStats = null;
// // 	}

// // 	nextScene() {
// // 		switch(this.nextScene) {
// // 			case "round":
// // 				var round = new Round(this.socket, this.playerStats);
// // 				this.playerStats = round.start();
// // 				break;

// // 			case "upgrades":


// // 		}
// // 	}
// // }




// while(1) {

// 	var lobby = new Lobby(socket, mountPoz1int);
// 	lobby.join();
// 	lobby.waitForPlayers();

// 	var playerStats = null;
// 	var numRounds = 3;

// 	for (var i = 1; i <= numRounds; i++) {

// 		var isLastRound = (i == numRounds) ? true : false;
// 		var round = new Round(socket, mountPoint, playerStats, isLastRound);
// 		round.play();
// 		playerStats = round.getPlayerStats();

// 		var upgrades = new Upgrades(socket, mountPoint, playerStats);
// 		upgrades.waitForUpgrades();
// 		playerStats = upgrades.getPlayerStats();
// 	}
// }

// class Lobby {
// 	constructor(socket, mountPoint) {

// 	}

// 	join() {

// 	}

// 	waitForPlayers() {
// 		this.socket.on("PLAYER_JOINED", function() {

// 		});

// 		this.socket.on("PLAYER_LEFT", function() {

// 		});
		
// 	}
// }
