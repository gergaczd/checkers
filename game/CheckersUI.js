/**
 * Created by Dan on 2015.05.25..
 */

var BoardUI = require("./BoardUI"),
	ColorIndicatorUI = require("./ColorIndicatorUI"),
	Color = require("./Color"),
	Position = require("./Position");

var CheckersUI = function(logic) {
	this._logic = logic;
	this._fieldInARow = this._logic.getFieldInARow();
	this._boardPadding = 20;

	this._handleDragFinished = CheckersUI.prototype._handleDragFinished.bind(this);
};

CheckersUI.prototype = {
	createBoard: function() {
		this.paper = this._createPaper();

		this._createBoardOnPaper();

		this._attachEvents();

		this._createColorIndicator();
	},

	_createPaper: function() {
		var boardSize = this._getBoardSize();
		return Raphael(this._boardPadding, this._boardPadding,
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
	},

	_createColorIndicator: function() {
		var paddingLeft = this._getBoardSize() + 2*this._boardPadding;
		this._colorIndicator = new ColorIndicatorUI(paddingLeft, this._boardPadding, this._getBoardSize());
	},

	_handleDragFinished: function(figure) {
		var coordinate = figure.getFigureCoordinate();
		var position = this._board.getFieldPositionByCoordinate(coordinate);

		if(position == null || !this._logic.moveFigure(figure.position, position)) {
			figure.revertToOrigin();
		}
	},

	drawPosition: function(logicBoard, nextColor) {
		this._forEach(function(position) {
			var cell = logicBoard.getCell(position);
			this._board.addFigureToPosition(position, cell);
		});

		this._colorIndicator.setToColor(nextColor);
	},

	finished: function(lostColor) {
		var message = "Game finished! " + Color.getName(lostColor) + " lost the game\nClick to start new game!";

		this._popupMessage(message);
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
			eve("new/game");
		});
	},

	_clearPopup: function() {
		if(this._popup) {
			this._popup.remove();
		}
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