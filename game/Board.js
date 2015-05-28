/**
 * Created by Dan on 2015.05.25..
 */

var FigureFactory = require("./FigureFactory");

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

	_isNumberToken: function(token) {
		return !isNaN(parseInt(token,10));
	},

	_crateFigureWithSurroundedEmptyField: function(cell, rowIndex) {
		var figure = FigureFactory.createFigureFromId(cell);
		var cells = [];
		if(rowIndex % 2 == 0) {
			cells = [null, figure];
		} else {
			cells = [figure, null];
		}

		return cells;
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

	getCell: function(row, column) {
		return this._board[row][column];
	},

	_validateRowLength: function(row) {
		if(row.length != this._fieldInARow) {
			throw new Error("Incorrect number of field in row");
		}
	}
};

Board.createBoardFromPosition = function(position, fieldInARow) {
	var board = new Board(fieldInARow);

	board.loadPosition(position);

	return board;
};

module.exports = Board;