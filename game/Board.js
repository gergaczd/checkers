/**
 * Created by Dan on 2015.05.25..
 */

var FigureFactory = require("./FigureFactory"),
	Position = require("./Position"),
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
				row = row.concat(this._createFigureWithSurroundedEmptyField(cell, rowIndex));
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

	_createFigureWithSurroundedEmptyField: function(cell, rowIndex) {
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
		return this.getCell(position) instanceof Men;
	},

	setCell: function(position, value) {
		this._board[position.getRow()][position.getColumn()] = value;
	},

	moveToCell: function(fromPosition, toPosition) {
		var figure = this.getCell(fromPosition);
		if(this._isPromoting(toPosition, figure)) {
			figure = FigureFactory.createKingFromMen(figure);
		}
		this.setCell(toPosition, figure);
		this.clearCell(fromPosition);
	},

	_isPromoting: function(position, figure) {
		if(figure instanceof  Men) {
			return figure.isPromote(position, this._fieldInARow);
		}

		return false;
	},

	clearCell: function(position) {
		this.setCell(position, null);
	},

	isEmptyCell: function(position) {
		return this.getCell(position) === null;
	},

	isSameColoredOnPosition: function(position, figure) {
		var onCellFigure = this.getCell(position);

		return onCellFigure.isSameColoredFigure(figure);
	},

	hasAnyMoveWithColor: function(color) {
		return this._takeWhileOnBoard(function(cell, position) {
			return this._hasAnyMoveFromCellWithColor(cell, position, color);
		});
	},

	_hasAnyMoveFromCellWithColor: function(cell, position, color) {
		if(!this._isSameColoredInCell(cell, color)) return false;

		var destinations = cell.getCaptureDestinations(position, this._fieldInARow);
		var hasJumpMove = this._takeWhileOnPositions(destinations, function(destination) {
			return this._canJump(position, destination);
		});

		if(!hasJumpMove) {
			destinations = cell.getMoveDestinations(position, this._fieldInARow);
			hasJumpMove = this._takeWhileOnPositions(destinations, function(destination) {
				return this.isEmptyCell(destination);

			});
		}

		return hasJumpMove;
	},

	hasAnyCaptureWithColor: function(color) {
		return this._takeWhileOnBoard(function(cell, position) {
			return this._hasCaptureFromCellWithColor(cell, position, color);
		});
	},

	_hasCaptureFromCellWithColor: function(cell, position, color) {
		if(!this._isSameColoredInCell(cell, color)) return false;

		var destinations = cell.getCaptureDestinations(position, this._fieldInARow);
		var canCapture = this._takeWhileOnPositions(destinations, function(destination) {
			return this._canCapture(position, destination);
		});

		return canCapture;
	},

	_isSameColoredInCell: function(cell, color) {
		return (cell instanceof Men && cell.isColor(color));
	},

	_canCapture: function(fromPosition, toPosition) {
		if(!this.isEmptyCell(toPosition)) return false;

		var betweenPosition = fromPosition.getNextPositionTowardAPosition(toPosition);

		return this._isOpponentFiguresOnPositions(fromPosition, betweenPosition);
	},

	_canJump: function(fromPosition, toPosition) {
		if(!this.isEmptyCell(toPosition)) return false;

		var betweenPosition = fromPosition.getNextPositionTowardAPosition(toPosition);

		return this.isFigureInCell(betweenPosition);
	},

	_isOpponentFiguresOnPositions: function(position, opponentPosition) {
		var figure = this.getCell(position);
		return this.isFigureInCell(opponentPosition) && !this.isSameColoredOnPosition(opponentPosition, figure);
	},

	_takeWhileOnBoard: function(func) {
		var rowIndex = 0,
			columnIndex = 0,
			found = false,
			row, cell, position;

		while(rowIndex < this._board.length && !found) {
			row = this._board[rowIndex];
			columnIndex = 0;
			while(columnIndex < row.length && !found) {
				cell = row[columnIndex];
				position = new Position(rowIndex, columnIndex);
				found = func.call(this, cell, position);

				columnIndex++;
			}
			rowIndex++;
		}

		return found;
	},

	_takeWhileOnPositions: function(positions, func) {
		var index = 0, found = false;
		while(index < positions.length && !found) {
			var position = positions[index];

			found = func.call(this, position);
			index++;
		}
		return found;
	}
};

Board.createBoardFromPosition = function(position, fieldInARow) {
	var board = new Board(fieldInARow);

	board.loadPosition(position);

	return board;
};

module.exports = Board;