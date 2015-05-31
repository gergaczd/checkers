/**
 * Created by Dan on 2015.05.25..
 */

var BoardUI = require("./BoardUI"),
	ColorIndicatorUI = require("./ColorIndicatorUI"),
	GameControlUI = require("./GameControlUI"),
	Color = require("./Color"),
	Position = require("./Position");

var CheckersUI = function(logic) {
	this._logic = logic;
	this._fieldInARow = this._logic.getFieldInARow();
	this._topPadding = 20;
	this._leftPadding = 20;

	this._handleDragFinished = CheckersUI.prototype._handleDragFinished.bind(this);
	this._handleRetire = CheckersUI.prototype._handleRetire.bind(this);
	this._handleDisconnect = CheckersUI.prototype._handleDisconnect.bind(this);
	this._newGame = CheckersUI.prototype._newGame.bind(this);
	this._connectAgain = CheckersUI.prototype._connectAgain.bind(this);
	this._startGame = CheckersUI.prototype._startGame.bind(this);
};

CheckersUI.prototype = {
	createBoard: function() {
		this.paper = this._createPaper();

		this._createBoardOnPaper();

		this._attachEvents();

		this._createColorIndicator();
		this._createGameControl();
	},

	_createPaper: function() {
		var boardSize = this._getBoardSize();
		return Raphael(this._leftPadding, this._topPadding,
			boardSize, boardSize);
	},

	_getBoardSize: function() {
		return this._fieldInARow * BoardUI.FIELD_SIZE;
	},

	_createBoardOnPaper: function() {
		this._board = new BoardUI(this._fieldInARow, this.paper);

		this._forEach(function(position) {
			this._board.addCellToPosition(position);
		});
	},

	_attachEvents: function() {
		eve.on("drag/figure/finished", this._handleDragFinished);
		eve.on("game/retire", this._handleRetire);
		eve.on("game-disconnected", this._handleDisconnect);
		eve.on("start-game", this._startGame);
	},

	_createColorIndicator: function() {
		var paddingLeft = this._getBoardSize() + this._topPadding + this._leftPadding;
		this._colorIndicator = new ColorIndicatorUI(paddingLeft, this._topPadding, this._getBoardSize());
	},

	_createGameControl: function() {
		this._gameControl = new GameControlUI(this._topPadding,this._getBoardSize());
	},

	_handleDragFinished: function(figure) {
		var coordinate = figure.getFigureCoordinate();
		var position = this._board.getFieldPositionByCoordinate(coordinate);

		if(position != null && this._logic.moveFigure(figure.position, position)) {
			this._notifyServer();
		} else {
			figure.revertToOrigin();
		}
	},

	_handleRetire: function() {
		var message = "Game finished! You gave up!\nClick here to start a new game";
		this._popupMessage(message, this._newGame);
	},

	_handleDisconnect: function() {
		var message = "Opponent is disconnected!\nClick to play new game";
		this._popupMessage(message, this._connectAgain);
	},

	_startGame: function() {
		var message = "Game started!\nClick to begin!";
		this._popupMessage(message);
	},

	drawPosition: function(logicBoard, nextColor) {
		this._forEach(function(position) {
			var cell = logicBoard.getCell(position);
			this._board.addFigureToPosition(position, cell);
		});

		this._colorIndicator.setToColor(nextColor);
	},

	finished: function(lostColor) {
		var message = "Game finished! " + Color.getName(lostColor) + " lost the game\nClick here to start a new game!";
		this._popupMessage(message, this._newGame);
	},

	_newGame: function() {
		eve("game/new");
	},

	_connectAgain: function() {
		this._newGame();
		eve("player-connect");
	},

	_popupMessage: function(message, callback) {
		this._clearPopup();
		var background = this.paper.rect(0,0, this._getBoardSize(), this._getBoardSize());

		background.attr({
			fill: Color.WHITE,
			opacity: 0.6
		});

		var text = this.paper.text(this._getBoardSize()/2, this._getBoardSize()/2, message);

		text.attr({ "font-size": 26 });

		this._popup = this.paper.set();

		this._popup.push(background, text);
		this._popup.toFront();

		var self = this;
		this._popup.click(function() {
			self._clearPopup();
			callback && callback();
		});
	},

	_clearPopup: function() {
		if(this._popup) {
			this._popup.remove();
		}
	},

	_notifyServer: function() {
		eve("player-moved", null, {
			position: this._logic.getPosition(),
			nextColor: this._logic.getNextColor()
		});
	},

	_forEach: function(func) {
		for(var row = 0; row < this._fieldInARow; row++) {
			for(var column = 0; column < this._fieldInARow; column++) {
				var position = new Position(row, column);
				func.call(this, position);
			}
		}
	}
};

module.exports = CheckersUI;