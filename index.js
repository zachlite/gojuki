var express = require("express");
var app = express();

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/home.html');
});

// routes
// /
// /login
// /lobby
// /play


var birds = express.Router();

birds.get('/', function (req, res) {
    res.send("birds home");
});

birds.get('/about', function (req, res) {
    res.send("birds about");
});

birds.get("/about/something", function (req, res) {
    res.send("about something");
});


app.use("/birds", birds);

app.listen(8081, function() {
    console.log("listning on port 8081");
});