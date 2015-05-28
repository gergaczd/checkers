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
		this._ui = new CheckersUI(this._fieldInARow);

		this._ui.createBoard();
	},

	loadPosition: function(position) {
		this._board = Board.createBoardFromPosition(position, this._fieldInARow);

		this._ui.drawPosition(this._board);
	}
};

module.exports = CheckersLogic;