var redis = require("redis");
var sha1 = require('sha1');

class PartyController {
	constructor() {
		this.redis = redis.createClient();
	}

	createParty() {
		// create a party and add it to redis
		var party_id = sha1("sdf");
		var party = {
			guests: []
		};

		this.redis.set(party_id, JSON.stringify(party));

		// return party_id
		return party_id;
	}

	addGuest(party_id, player_name) {
		var that = this;
		this.redis.get(party_id, function (err, reply) {
			var party = JSON.parse(reply);
			party.guests.push(player_name);
			that.redis.set(party_id, JSON.stringify(party));
		});
	}
}

module.exports = new PartyController();