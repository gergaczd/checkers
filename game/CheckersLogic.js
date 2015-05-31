/**
 * Created by Dan on 2015.05.25..
 */
var CheckersUI = require("./CheckersUI"),
	Board = require("./Board");

var CheckersLogic = function(fieldInARow) {
	this._fieldInARow = fieldInARow || 8;

	this._removablePositions = [];
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

	getBoard: function() {
		return this._board;
	},

	moveFigure: function(fromPosition, toPosition) {
		if(this.isValidMove(fromPosition, toPosition)) {
			this._board.moveToCell(fromPosition, toPosition);
			this._executeRemovable();

			return true;
		}
		return false;
	},

	isValidMove: function(fromPosition, toPosition) {
		if(!this._isValidCells(fromPosition, toPosition)) {
			return false;
		}

		if(!this._isGoodDirection(fromPosition, toPosition)) {
			return false;
		}

		if(!this._isValidBetweenFields(fromPosition, toPosition)) {
			return false;
		}

		if(this.getRemovablePositions().length == 0) {
			var figure = this._board.getCell(fromPosition);
			var hasCapture = this._board.hasAnyCaptureWithColor(figure.getColor());

			if(hasCapture) {
				this._removablePositions = [];
				return false;
			}
		}

		return true;
	},

	_isValidCells: function(fromPosition, toPosition) {
		if(!fromPosition.isDiagonal(toPosition)) return false;
		if(!fromPosition.isInDiagonalDistanceLimit(toPosition)) return false;

		return !this._board.isFigureInCell(toPosition);
	},

	_isGoodDirection: function(fromPosition, toPosition) {
		var figure = this._board.getCell(fromPosition);

		return figure.isGoodDirection(fromPosition, toPosition);
	},

	_isValidBetweenFields: function(fromPosition, toPosition) {
		var distance = fromPosition.getDiagonalDistance(toPosition);

		if(distance === 2) {
			var positionsBetween = fromPosition.getPositionsDuringDiagonalJump(toPosition);
			if(this.isEmptyPositions(positionsBetween)) {
				return false;
			}

			if(this.isOpponentOnPositions(positionsBetween, fromPosition)) {
				this._addToRemovableCells(positionsBetween);
			}
		}

		return true;
	},

	isEmptyPositions: function(positions) {
		var isEmpty = true;
		positions.forEach(function(position) {
			isEmpty = isEmpty && this._board.isEmptyCell(position);
		}, this);

		return isEmpty;
	},

	isOpponentOnPositions: function(positions, fromPosition) {
		var isOpponent = false,
			figure = this._board.getCell(fromPosition);

		positions.forEach(function(position) {
			isOpponent = isOpponent || !this._board.isSameColoredOnPosition(position, figure);
		}, this);

		return isOpponent;
	},

	_addToRemovableCells: function(positions) {
		this._removablePositions = this._removablePositions.concat(positions);
	},

	_executeRemovable: function() {
		this._removablePositions.forEach(function(position) {
			this._board.clearCell(position);
		}, this);

		this._removablePositions = [];
	},

	getRemovablePositions: function() {
		return this._removablePositions;
	}
};

module.exports = CheckersLogic;