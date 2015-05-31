/**
 * Created by Dan on 2015.05.31..
 */
var Color = require("./game/Color");

var Game = function(whitePlayer, blackPlayer) {
	this._gameId = Game.nextId();
	this._white = whitePlayer;
	this._black = blackPlayer;

	this._currentPosition = Game.BASE_POSITION;
	this._currentNextColor = Color.BLACK;
	this._notifyUsersToStart();
};

Game.prototype = {
	getGameId: function() {
		return this._gameId;
	},

	_notifyUsersToStart: function() {
		this._white.emit("start-game", {
			position: Game.BASE_POSITION,
			playerColor: Color.WHITE,
			nextColor: Color.BLACK
		});

		this._black.emit("start-game", {
			position: Game.BASE_POSITION,
			playerColor: Color.BLACK,
			nextColor: Color.BLACK
		});
	},

	getWhite: function() {
		return this._white;
	},

	getBlack: function() {
		return this._black;
	},

	playerMoved: function(gameStatus) {
		this._currentPosition = gameStatus.position;
		this._currentNextColor = gameStatus.nextColor;

		this._white.emit("player-moved", gameStatus);
		this._black.emit("player-moved", gameStatus);
	},

	disconnectedGame: function() {
		this._white.emit("game-disconnected");
		this._white.emit("game-disconnected");
	},

	clearGame: function() {
		this._white = null;
		this._black = null;
	}
};

Game.BASE_POSITION = "oooo/oooo/4/4/4/4/OOOO/OOOO";
Game.Id = 0;
Game.nextId = function() {
	return ++Game.Id;
};

module.exports = Game;