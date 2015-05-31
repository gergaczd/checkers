/**
 * Created by Dan on 2015.05.25..
 */

var BoardUI = require("./BoardUI"),
	ColorIndicatorUI = require("./ColorIndicatorUI"),
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

		for(var i = 0; i < this._fieldInARow; i++) {
			for(var j = 0; j < this._fieldInARow; j++) {
				var position = new Position(i,j);
				this._board.addCellToPosition(position);
			}
		}
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
		var element = this.paper.getElementByPoint(coordinate.getX(), coordinate.getY());

		if(element !== null) {
			var position = this._board.getFieldPositionByCoordinate(coordinate);

			if(this._logic.moveFigure(figure.position, position)) {
				this.drawPosition(this._logic.getBoard(), this._logic.getNextColor());
			} else {
				figure.revertToOrigin();
			}
		} else {
			figure.revertToOrigin();
		}
	},

	drawPosition: function(logicBoard, nextColor) {
		for(var row = 0; row < this._fieldInARow; row++) {
			for(var column = 0; column < this._fieldInARow; column++) {
				var position = new Position(row, column);

				var cell = logicBoard.getCell(position);
				this._board.addFigureToPosition(position, cell);

			}
		}

		this._colorIndicator.setToColor(nextColor);
	}
};

module.exports = CheckersUI;