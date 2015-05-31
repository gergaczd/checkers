/**
 * Created by Dan on 2015.05.31..
 */
var Game = require("./Game");

var GameStore = function() {

	this._lobby = [];

	this._gameMap = {};
	this._playerGameMap = {};
};

GameStore.prototype = {
	addNewPlayer: function(socket) {
		this._lobby.push(socket);

		this._playerArrived();
	},

	_playerArrived: function() {
		if(this._hasEnoughPlayerInLobby()) {
			this._createPairFromLobby();
		}
	},

	_hasEnoughPlayerInLobby: function() {
		return this._lobby.length > 1;
	},

	_createPairFromLobby: function() {
		var whitePlayer = this._lobby.shift(),
			blackPlayer = this._lobby.shift();

		var createdGame = new Game(whitePlayer, blackPlayer);
		this._addToGameMap(createdGame);
	},

	_addToGameMap: function(game) {
		var gameId = game.getGameId();
		this._gameMap[gameId] = game;
		this._playerGameMap[game.getWhite().id] = gameId;
		this._playerGameMap[game.getBlack().id] = gameId;
	},

	getGameByPlayerId: function(playerId) {
		var gameId = this._playerGameMap[playerId];
		return this._gameMap[gameId];
	},

	gameDisconnectedByPlayer: function(playerId) {
		var game = this.getGameByPlayerId(playerId);

		if(game) {
			game.disconnectedGame();
			this._clearGame(game);
		}
	},

	_clearGame: function(game) {
		if(game) {
			this._playerGameMap[game.getWhite().id] = null;
			this._playerGameMap[game.getBlack().id] = null;
			this._gameMap[game.getGameId()] = null;

			game.clearGame();
		}

	},

	playerMoved: function(playerId, gameStatus) {
		var game = this.getGameByPlayerId(playerId);

		game && game.playerMoved(gameStatus);
	}
};

module.exports = GameStore;