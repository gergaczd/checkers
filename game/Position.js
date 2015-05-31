/**
 * Created by Dan on 2015.05.29..
 */

var Position = function(row, column) {
	this._row = row;
	this._column = column;
};

Position.ODD_COLOR = "#555555";
Position.EVEN_COLOR = "#CCCCCC";
Position.DISTANCE_LIMIT = 2;

Position.prototype = {
	getRow: function(){
		return this._row;
	},

	getColumn: function() {
		return this._column;
	},

	getFieldColor: function() {
		if((this.getRow() + this.getColumn()) % 2 == 0) {
			return Position.EVEN_COLOR;
		} else {
			return Position.ODD_COLOR;
		}
	},

	isDiagonal: function(position) {
		if(this._isSame(position)) {
			return false;
		}

		return  this._columnDistance(position) === this._rowDistance(position);
	},

	isInDiagonalDistanceLimit: function(position) {
		return this.getDiagonalDistance(position) <= Position.DISTANCE_LIMIT;
	},

	getDiagonalDistance: function(position) {
		if(!this.isDiagonal(position)) {
			return 0;
		}

		return this._columnDistance(position);
	},

	getPositionsDuringDiagonalJump: function(position) {
		var distance = this.getDiagonalDistance(position);
		distance--;
		if(distance < 1) {
			return [];
		}

		var positions = [];

		while(distance > 0) {
			positions.push(this._getPositionAtDistanceTowardGivenPosition(position, distance));
			distance--;
		}

		return positions;
	},

	_getPositionAtDistanceTowardGivenPosition: function(position, distance) {
		var normalizedColumnDiff = this._normalizeDifference(this._columnDifference(position)),
			normalizedRowDiff = this._normalizeDifference(this._rowDifference(position));

		var row = position.getRow() + (distance * normalizedRowDiff),
			column = position.getColumn() + (distance * normalizedColumnDiff);

		return new Position(row, column);
	},

	getNextPositionTowardAPosition: function(position) {
		var normalizedColumnDiff = this._normalizeDifference(this._columnDifference(position)),
			normalizedRowDiff = this._normalizeDifference(this._rowDifference(position));

		var row = position.getRow() + normalizedRowDiff,
			column = position.getColumn() + normalizedColumnDiff;

		return new Position(row, column);
	},

	_isSame: function(position) {
		return this.getRow() === position.getRow() &&
			this.getColumn() === position.getColumn();
	},

	_columnDistance: function(position) {
		return Math.abs(this._columnDifference(position));
	},

	_columnDifference: function (position) {
		return this.getColumn() - position.getColumn();
	},

	_rowDistance: function(position) {
		return Math.abs(this._rowDifference(position));
	},

	_rowDifference: function (position) {
		return this.getRow() - position.getRow();
	},

	_normalizeDifference: function(difference) {
		return difference / Math.abs(difference);
	},

	isUpMove: function(position) {
		return this._rowDifference(position) > 0;
	},

	upwardDiagonals: function(distance) {
		var upLeft = this._upLeftDiagonal(distance),
			upRight = this._upRightDiagonal(distance);

		return [upLeft, upRight];
	},

	_upLeftDiagonal: function(distance) {
		var row = this.getRow() - distance,
			column = this.getColumn() - distance;

		return new Position(row, column);
	},

	_upRightDiagonal: function(distance) {
		var row = this.getRow() - distance,
			column = this.getColumn() + distance;

		return new Position(row, column);
	},

	downwardDiagonals: function(distance) {
		var downLeft = this._downLeftDiagonal(distance),
			downRight = this._downRightDiagonal(distance);

		return [downLeft, downRight];
	},

	_downLeftDiagonal: function(distance) {
		var row = this.getRow() + distance,
			column = this.getColumn() - distance;

		return new Position(row, column);
	},

	_downRightDiagonal: function(distance) {
		var row = this.getRow() + distance,
			column = this.getColumn() + distance;

		return new Position(row, column);
	},

	isAnyBiggerThen: function(number) {
		return this.getRow() > number || this.getColumn() > number;
	},

	isAnyLowerThen: function(number) {
		return this.getRow() < number || this.getColumn() < number;
	},

	toString: function() {
		return "(" + this.getRow() + "," + this.getColumn() + ")";
	}
};

module.exports = Position;