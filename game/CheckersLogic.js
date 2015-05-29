/**
 * Created by Dan on 2015.05.25..
 */
var CheckersUI = require("./CheckersUI"),
	Board = require("./Board");

var CheckersLogic = function(fieldInARow) {
	this._fieldInARow = fieldInARow || 8;
};

CheckersLogic.prototype = {
	initGame: function() {
		this._ui = new CheckersUI(this);

		this._ui.createBoard();
	},

	loadPosition: function(position) {
		this._board = Board.createBoardFromPosition(position, this._fieldInARow);

		if(this.hasUI()) {
			this._ui.drawPosition(this._board);
		}
	},

	getPosition: function() {
		return this._board.getPosition();
	},

	hasUI: function() {
		return this._ui != null;
	},

	getFieldInARow: function() {
		return this._fieldInARow;
	},

	moveFigure: function(fromPosition, toPosition) {
		var figure = this._board.getCell(fromPosition);
		this._board.setCell(toPosition, figure);
		this._board.clearCell(fromPosition);
	}
};

module.exports = CheckersLogic;