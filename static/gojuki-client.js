var IO = require("socket.io-client");
var socket = IO.connect();
var partyId = document.getElementById("party").dataset.partyId;
import Lobby from "./lobby/Lobby";
import Game from "./game/game";
import Upgrades from "./upgrades/Upgrades";


var playerName = null;
while (!playerName) {
	playerName = prompt("What is your player name?");
}

var playerNumber = null;

socket.emit("REQUEST_JOIN_PARTY", playerName, partyId);

socket.on("REQUEST_JOIN_PARTY_RESPONSE", function(response) {
	if (response.canJoin) {
		playerNumber = response.playerNumber;
		goToGame() // fixed for now.  go to currentScene
	} else {
		alert(response.error);
		window.location.href = "/";
	}
});


var currentScene = null;
var playerData = null;
var roundNumber = 0;


socket.on("LOBBY_ENDED", function() {
	goToGame(); // should always to go game.
});

socket.on("GAME_ENDED", function(){	
	if (roundNumber == 3) {
		goToGameOver();
	} else {
		goToUpgrades();
	}
});

socket.on("UPGRADES_ENDED", function() {
	goToGame();
})

socket.on("WINNER_ANNOUNCEMENT_ENDED", function() {
	window.location.href = "/";
});

function goToLobby() {
	currentScene = new Lobby(socket, playerNumber);
}

function goToGame() {	
	console.log("GOING TO Game");
	roundNumber++;
	if(currentScene) {
		playerData = currentScene.getPlayerData();
		currentScene.stop();
	}

	currentScene = new Game(socket, playerNumber, playerData, roundNumber);
}

function goToUpgrades() {
	console.log("GOING TO Upgrades");
	if (currentScene) {
		playerData = currentScene.getPlayerData();
		currentScene.stop();
	}

	// playerData = {
 //            food: 100,
 //            food_carry_limit: 50,
 //            speed: 5,
 //            goo: 0
	// }

	currentScene = new Upgrades(socket, playerNumber, playerData);
}

function goToGameOver() {
	currentScene.announceWinner();
}
