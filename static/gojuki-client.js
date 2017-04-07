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
		goToUpgrades() // fixed for now.  go to currentScene
	} else {
		alert(response.error);
		window.location.href = "/";
	}
});


var currentScene = null;
var playerData = null;
var roundNumber = 1;


socket.on("LOBBY_ENDED", function() {
	goToGame(); // should always to go game.
});

socket.on("GAME_ENDED", function(){
	roundNumber++;
	
	if (roundNumber < 4) {
		goToUpgrades();
	} else {
		goToGameOver();
	}
});

socket.on("UPGRADES_ENDED", function() {
	goToGame();
})

function goToLobby() {
	currentScene = new Lobby(socket, playerNumber);
}

function goToGame() {	
	console.log("STARTING GAME");
	if(currentScene) {
		console.log("CLEANING PREVIOUS SCENE");
		playerData = currentScene.getPlayerData(); 
		currentScene.stop();
	}

	currentScene = new Game(socket, playerNumber, playerData, roundNumber);
}

function goToUpgrades() {
	console.log("STARTING UPGRADES");
	if (currentScene) {
		console.log("CLEANING PREVIOUS SCENE");

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
	// announce player ranks
	console.log("game over");
}
