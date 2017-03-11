var express = require("express");
var session = require("express-session");
var RedisStore = require("connect-redis")(session);
let uuidV1 = require("uuid/v1");
var party = require("./routes/party");
var app = express();

app.use(session({
	genid: function(req) {
		return uuidV1()
	},
    secret: "lickingdoorknobsisillegalonotherplanets",
    store: new RedisStore({host: 'localhost', port: 6379}),
    saveUninitialized: false,
    resave: false
}));


app.get("/", function(req, res) {
	if (!req.session.key) {
		console.log("no key!");
		req.session.key = "wassup";
	} else {
		console.log(req.session.key);
	}

	console.log(req.session.id);
    res.sendFile(__dirname + '/views/index.html');
});

app.use("/party", party);

app.listen(8080, function() {
    console.log("listning on port 8080");
});