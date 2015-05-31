/**
 * Created by Dan on 2015.05.25..
 */
var CheckersLogic = require("./CheckersLogic");
var checkers = new CheckersLogic(8);

var BASE_POSITION = "oooo/oooo/4/4/4/4/OOOO/OOOO";

checkers.initGame();
checkers.loadPosition(BASE_POSITION);

eve.on("game/new", function() {
	checkers.loadPosition(BASE_POSITION);
});

var socket = io.connect(location.origin);

eve.on("player-connect", function() {
	socket.emit("new-player");
});

socket.on("start-game", function(game) {
	checkers.loadPosition(game.position, game.nextColor);
	eve("start-game");
});

eve.on("player-moved", function(gameStatus) {
	socket.emit("player-moved", gameStatus);
});

socket.on("player-moved", function(gameStatus) {
	checkers.loadPosition(gameStatus.position, gameStatus.nextColor);
});

socket.on("game-disconnected", function() {
	eve("game-disconnected");
});

eve("player-connect");

module.exports = checkers;