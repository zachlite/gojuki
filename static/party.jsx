import React from "react";
import ReactDOM from "react-dom";
import IO from "socket.io-client";

class Party extends React.Component {
	constructor(props) {
		super(props);
		this.playerMax = 4;
		this.state = {
			secondsElapsed: 0,
			playersMissing: this.playerMax,
			players: [],
			timeToGameStart: 10
		};
		this.connectToPartyServer();
	}

	connectToPartyServer() {
		var socket = IO.connect();
		// 
		this.playerName = prompt("What is your playername?");
		socket.emit("ADD_PLAYER", this.playerName, this.props.partyId);

		socket.on("connect", () => {
			console.log("client connected");
		});

		socket.on("PLAYER_JOINED", (players) => {
			console.log("player joined!");	
			this.updatePlayersInParty(players);
		});

		socket.on("PLAYER_LEFT", (players) => {
			console.log("player left!");
			this.updatePlayersInParty(players);
			clearInterval(this.gameStartTimer);
			this.setState({
				timeToGameStart: 10
			})
		});

		socket.on("GAME_STARTING", () => {
			console.log("game starting");
			this.gameStartTimer = setInterval(() => this.tick(), 1000);
		});
	}

	tick() {

		if (this.state.timeToGameStart === 0) {
			// this.startGame();
		} else {
			this.setState((prevState) => ({
				timeToGameStart: prevState.timeToGameStart - 1
			}));
		}
	}

	updatePlayersInParty(players) {
		this.setState({
			players: players,
			playersMissing: this.playerMax - players.length
		});
	}

	render() {

		var countdown = (this.state.players.length == 4) ?
			<p>Starting game in {this.state.timeToGameStart} seconds</p> : 
			null;

		return (
			<div>
				<a href="/">Home</a>
				<h1>Party Lobby</h1>
				<h3>Waiting for {this.state.playersMissing} more player(s)...</h3>
				<PlayerList players={this.state.players}/>
				{countdown}
			</div>
		);
	}
}

class PlayerList extends React.Component {
	render() {
		return (
			<ul>
				{this.props.players.map((playerName, index) => (
					<li key={index}>player {index + 1}: {playerName}</li>
				))}
			</ul>
		);
	}
}


const party = document.getElementById('party');
ReactDOM.render(<Party partyId={party.dataset.partyId}/>, party);
