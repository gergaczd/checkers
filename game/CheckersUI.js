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

				if(board.isFigureInCell(row, column)) {
					if(cell.isMen()) {
						this._createMen(row, column, cell.getColor());
					} else {
						this._createKing(row, column, cell.getColor());
					}
				}
			}
		}
	},

	_createMen: function(row, column, color) {
		var halfFieldSize = this._fieldSize/2;

		var x0 = (column*this._fieldSize) + halfFieldSize,
			y0 = (row*this._fieldSize) +halfFieldSize,
			r = halfFieldSize-5;

		var circle = this._paper.circle(x0, y0, r);

		this._decorateCircle(circle, color);

		return circle;
	},

	_createKing: function(row, column, color) {
		var halfFieldSize = this._fieldSize/2;

		var x0 = (column*this._fieldSize) + halfFieldSize,
			y0 = (row*this._fieldSize) +halfFieldSize,
			r = halfFieldSize-5;

		var set = this._paper.set();

		var circle1 = this._paper.circle(x0,y0,r),
			circle2 = this._paper.circle(x0,y0,r-5),
			circle3 = this._paper.circle(x0,y0,r-10);

		this._decorateCircle(circle1, color);
		this._decorateCircle(circle2, color);
		this._decorateCircle(circle3, color);

		set.push(circle1, circle2, circle3);
		return set;
	},

	_decorateCircle: function(circle, color) {
		circle.attr("fill", color);
		circle.attr("stroke-width", 2);
		circle.attr("stroke", this._changeColor(color));
	},

	_changeColor: function(color) {
		if(color == "#FFFFFF" || color == "#FFF") {
			return "#000000";
		}
		return "#FFFFFF";

	}
};

module.exports = CheckersUI;