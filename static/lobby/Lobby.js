import React from "react";
import ReactDOM from "react-dom";
import IO from "socket.io-client";

class Lobby {
	constructor(socket, playerNumber) {
		const party = document.getElementById('party');
		var lobbyView = React.createElement(LobbyView, 
			{
				"socket": socket, 
				"playerNumber": playerNumber
			}
		);
		ReactDOM.render(lobbyView, party);
	}
	unmount() {
		var party = document.getElementById("party");
		party.parentNode.removeChild(party);
	}
}


class LobbyView extends React.Component {
	constructor(props) {
		super();
		this.socket = props.socket;
		this.playerMax = 4;
		this.state = {
			playersMissing: this.playerMax,
			players: []
		};
		this.listen();
		this.socket.emit("PLAYER_IN_LOBBY");
	};

	listen() {
		this.socket.on("PLAYER_JOINED_LOBBY", (players) => {
			console.log("player joined lobby!");
			this.updatePlayers(players);
		});

		this.socket.on("PLAYER_LEFT", (players) => {
			console.log("player left lobby");
			this.updatePlayers(players);
		});	
	};

	updatePlayers(players) {
		this.setState({
			players: players,
			playersMissing: this.playerMax - players.length
		});
	};

	render() {
		return (
			<div>
				<a href="/">Home</a>
				<h1>Party Lobby</h1>
				<h3>Waiting for {this.state.playersMissing} more player(s)...</h3>
				<PlayerList players={this.state.players}/>
			</div>
		);	
	};
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

export default Lobby;
