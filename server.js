/**
 * Created by Dan on 2015.05.25..
 */
var express = require("express");
var app = express(),
	bodyParser = require("body-parser"),
	browserify = require("browserify-middleware"),
	PORT = process.env.PORT || 3000,
	server = require("http").Server(app),
	io = require("socket.io")(server);

var GameStore = require("./GameStore");

app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/src/js/game", browserify("./game"));

app.use(express.static('public'));


var store = new GameStore();

io.on("connection", function(socket) {
	socket.on("new-player", function() {
		store.addNewPlayer(socket);
	});

	socket.on("player-moved", function(data) {
		store.playerMoved(socket.id, data);
	});

	socket.on("disconnect", function() {
		store.gameDisconnectedByPlayer(socket.id);
	});
});

server.listen(PORT, function() {
	console.log("server listening on port: " + PORT);
});