/**
 * Created by Dan on 2015.05.25..
 */
var CheckersUI = require("./CheckersUI"),
	Color = require("./Color"),
	Board = require("./Board");

var CheckersLogic = function(fieldInARow) {
	this._fieldInARow = fieldInARow || 8;

	this._removablePosition = null;
	this._captured = false;
};

CheckersLogic.prototype = {
	initGame: function() {
		this._ui = new CheckersUI(this);

		this._ui.createBoard();
	},

	loadPosition: function(position, nextColor) {
		this._nextColor = nextColor || Color.BLACK;
		this._board = Board.createBoardFromPosition(position, this._fieldInARow);

		this._drawPosition();
	},

	getNextColor: function() {
		return this._nextColor;
	},

	_calculateNextColor: function() {
		if(!this._captured || !this._board.hasAnyCaptureWithColor(this._nextColor)) {
			this._changeNextColor();
		}
		this._captured = false;
	},

	_changeNextColor: function() {
		this._nextColor = Color.changeColor(this._nextColor);
	},

	_checkFinished: function() {
		if(!this._board.hasAnyMoveWithColor(this._nextColor)) {
			if(this.hasUI()) {
				this._ui.finished(this._nextColor);
			}
		}
	},

	_drawPosition: function() {
		if(this.hasUI()) {
			this._ui.drawPosition(this._board, this._nextColor);
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
			this._calculateNextColor();
			this._drawPosition();
			this._checkFinished();
			return true;
		}
		return false;
	},

	isValidMove: function(fromPosition, toPosition) {
		this._captured = false;
		if(!this._isValidColorOnPosition(fromPosition)) {
			return false;
		}

		if(!this._isValidCells(fromPosition, toPosition)) {
			return false;
		}

		if(!this._isGoodDirection(fromPosition, toPosition)) {
			return false;
		}
		if(!this._isValidBetweenFields(fromPosition, toPosition)) {
			return false;
		}

		if(!this.hasRemovable()) {
			var figure = this._board.getCell(fromPosition);
			var hasCapture = this._board.hasAnyCaptureWithColor(figure.getColor());

			if(hasCapture) {
				this._removablePosition = null;
				return false;
			}
		}

		return true;
	},

	_isValidColorOnPosition: function(position) {
		if(!this._board.isFigureInCell(position)){
			return false;
		}

		var figure = this._board.getCell(position);
		return figure.isColor(this._nextColor);
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
			var positionBetween = fromPosition.getNextPositionTowardAPosition(toPosition);
			if(this._board.isEmptyCell(positionBetween)) {
				return false;
			}

			if(this.isOpponentOnPosition(positionBetween, fromPosition)) {
				this._addToRemovable(positionBetween);
			}
		}

		return true;
	},

	isOpponentOnPosition: function(position, fromPosition) {
		var figure = this._board.getCell(fromPosition);

		return !this._board.isSameColoredOnPosition(position, figure);
	},

	_addToRemovable: function(position) {
		this._captured = true;
		this._removablePosition = position;
	},

	_executeRemovable: function() {
		if(this.hasRemovable()) {
			this._board.clearCell(this._removablePosition);
		}

		this._removablePosition = null;
	},

	hasRemovable: function() {
		return this._removablePosition != null;
	}
};

module.exports = CheckersLogic;