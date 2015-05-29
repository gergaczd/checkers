/**
 * Created by Dan on 2015.05.25..
 */

var FigureFactory = require("./FigureFactory"),
	Men = require("./Men");

var Board = function(fieldInARow) {
	this._fieldInARow = fieldInARow;
};

Board.prototype = {
	loadPosition: function(position) {
		this._board = [];

		position.split("/").forEach(function(rowDescriptor, rowIndex) {
			var row = this.createRow(rowDescriptor, rowIndex);
			this._addRowToBoard(row, rowIndex);
		}, this);
	},

	getPosition: function() {
		var position = "";
		this._board.forEach(function(row, rowIndex) {
			position += this.getRow(rowIndex);

			if(rowIndex !== this._fieldInARow-1) {
				position += "/";
			}
		}, this);

		return position;
	},

	_addRowToBoard: function(row, rowIndex) {
		if(!(this._board instanceof  Array)) {
			this._board = [];
		}

		this._board[rowIndex] = row;
	},

	createRow: function(rowDescriptor, rowIndex) {
		var row = [];

		rowDescriptor.split("").forEach(function(cell) {
			if(this._isNumberToken(cell)) {
				row = row.concat(this._createDoubleEmptyCells(cell));
			} else {
				row = row.concat(this._crateFigureWithSurroundedEmptyField(cell, rowIndex));
			}
		}, this);

		this._validateRowLength(row);

		return row;
	},

	getRow: function(rowIndex) {
		var outputRow = "";
		var emptyContinually = 0;
		this._board[rowIndex].forEach(function(cell) {
			if(cell == null) {
				emptyContinually++;
			} else {
				outputRow += this.getEmptyCounter(emptyContinually);
				outputRow += cell.getOutputToken();
				emptyContinually = 0;
			}
		}, this);

		outputRow += this.getEmptyCounter(emptyContinually);

		return outputRow;
	},

	getEmptyCounter: function(emptyContinually) {
		if(emptyContinually !== 0) {
			if(this._isEven(emptyContinually)) {
				emptyContinually = emptyContinually/2;
			} else {
				emptyContinually = (emptyContinually-1)/2;
			}
		}

		if(emptyContinually === 0) return "";

		return emptyContinually.toString();
 	},

	_isNumberToken: function(token) {
		return !isNaN(parseInt(token,10));
	},

	_crateFigureWithSurroundedEmptyField: function(cell, rowIndex) {
		var figure = FigureFactory.createFigureFromId(cell);
		var cells = [];
		if(this._isEven(rowIndex)) {
			cells = [null, figure];
		} else {
			cells = [figure, null];
		}

		return cells;
	},

	_isEven: function(number) {
		return number % 2 == 0;
	},

	_createDoubleEmptyCells: function(cellCount) {
		var multiCellCount = parseInt(cellCount, 10);
		var cells = [];
		while(multiCellCount > 0) {
			cells.push(null, null);
			multiCellCount--;
		}

		return cells;
	},

	getCell: function(position) {
		return this._board[position.getRow()][position.getColumn()];
	},

	_validateRowLength: function(row) {
		if(row.length != this._fieldInARow) {
			throw new Error("Incorrect number of field in row");
		}
	},

	isFigureInCell: function(position) {
		if(this._board[position.getRow()][position.getColumn()] instanceof Men) {
			return true;
		}
		return false;
	},

	clearCell: function(position) {
		this._board[position.getRow()][position.getColumn()] = null;
	},

	setCell: function(position, value) {
		this._board[position.getRow()][position.getColumn()] = value;
	}
};

Board.createBoardFromPosition = function(position, fieldInARow) {
	var board = new Board(fieldInARow);

	board.loadPosition(position);

	return board;
};

module.exports = Board;