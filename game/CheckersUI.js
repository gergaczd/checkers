/**
 * Created by Dan on 2015.05.25..
 */

var CheckersUI = function(fieldInARow) {
	this._fieldInARow = fieldInARow || 8;
	this._fieldSize = 80;
	this._boardPadding = 20;
};

CheckersUI.prototype = {
	createBoard: function() {
		this._paper = this._createPaper();

		this._createBoardOnPaper();
	},

	_createPaper: function() {
		var boardSize = this._getBoardSize();
		return Raphael(this._boardPadding, this._boardPadding,
			boardSize, boardSize);
	},

	_getBoardSize: function() {
		return this._fieldInARow*this._fieldSize;
	},

	_createBoardOnPaper: function() {
		this._board = [];
		for(var i = 0; i < this._fieldInARow; i++) {
			this._board[i] = [];
			for(var j = 0; j < this._fieldInARow; j++) {
				this._board[i][j] = this._createField(i,j);
			}
		}
	},

	_createField: function(row, column) {
		var field = this._paper.rect(column * this._fieldSize, row * this._fieldSize, this._fieldSize, this._fieldSize);
		this._setColorForField(field, row, column);
		return field;
	},

	_setColorForField: function(field, row, column) {
		if((row+column) % 2 == 0) {
			field.attr("fill", "#CCCCCC");
		} else {
			field.attr("fill", "#555555");
		}
	},

	drawPosition: function(board) {
		for(var row = 0; row < this._fieldInARow; row++) {
			for(var column = 0; column < this._fieldInARow; column++) {
				var cell = board.getCell(row, column);

				if(cell != null) {
					var figure;
					if(cell.isMen()) {
						figure = this._paper.circle((column*this._fieldSize) +(this._fieldSize/2),(row*this._fieldSize) +(this._fieldSize/2), (this._fieldSize/2)-5);
					}

					figure.attr("fill", cell.getColor());
				}
			}
		}
	}
};

module.exports = CheckersUI;