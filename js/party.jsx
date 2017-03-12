import React from "react";
import ReactDOM from "react-dom";
import IO from "socket.io-client";

class Party extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			secondsElapsed: 0,
			playersMissing: 4,
			players: []
		};
		this.connectToPartyServer();
		// this.players = [
		// 	{
		// 		"name": "zachlite",
		// 		"id": 1
		// 	},
		// 	{
		// 		"name": "monkeyman",
		// 		"id": 2
		// 	}
		// ];
		setInterval(() => this.tick(), 1000);
	}

	connectToPartyServer() {
		var socket = IO.connect();

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
		});
	}

	updatePlayersInParty(players) {
		console.log(players.length);
		this.setState({
			players: players,
			playersMissing: this.state.playersMissing - players.length
		});
	}

	tick() {
		// this.setState({secondsElapsed: this.state.secondsElapsed + 1});
	}

	render() {
		return (
			<div>
				<a href="/">Home</a>
				<h1>Party Lobby</h1>
				<h3>Waiting for {this.state.playersMissing} more player(s)...</h3>
				<PlayerList players={this.state.players}/>
				<div>seconds elapsed: {this.state.secondsElapsed}</div>
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
