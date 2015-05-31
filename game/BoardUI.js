/**
 * Created by Dan on 2015.05.29..
 */

var CellUI = require("./CellUI"),
	Position = require("./Position"),
	FigureUI = require("./FigureUI");

var BoardUI = function(fieldInARow, paper) {
	this._fieldInArow = fieldInARow;
	this._paper = paper;

	this._initBoard();
};

BoardUI.FIELD_SIZE = 80;

BoardUI.prototype = {
	_initBoard: function() {
		this._board = [];
		for(var i = 0; i < this._fieldInArow; i++) {
			this._board[i] = [];
			for(var j = 0; j < this._fieldInArow; j++) {
				this._board[i][j] = null;
			}
		}
 	},

	addCellToPosition: function(position) {
		var cell = new CellUI(position);

		var field = this._createField(position);
		cell.setField(field);
		this._board[position.getRow()][position.getColumn()] = cell;
	},

	_createField: function(position) {
		var field = this._paper.rect(position.getColumn() * BoardUI.FIELD_SIZE, position.getRow() * BoardUI.FIELD_SIZE, BoardUI.FIELD_SIZE, BoardUI.FIELD_SIZE);
		field.attr("fill", position.getFieldColor());

		return field;
	},

	addFigureToPosition: function(position, cell) {
		var figure = this._createFigure(position, cell);
		this._addFigureToBoard(position, figure);
	},

	_createFigure: function(position, cell) {
		if(cell == null) return null;

		if(cell.isMen()) {
			return FigureUI.createMen(this._paper, position, cell.getColor(), BoardUI.FIELD_SIZE);
		} else {
			return FigureUI.createKing(this._paper, position, cell.getColor(), BoardUI.FIELD_SIZE);
		}
	},

	_addFigureToBoard: function(position, figure) {
		if(this.getCell(position) != null) {
			this.getCell(position).removeFigure();
		}

		if(figure != null){
			this.getCell(position).setFigure(figure);
		}
	},

	getFieldPositionByCoordinate: function(coordinate) {
		var position = null;
		this._board.forEach(function(row, rowIndex) {
			row.forEach(function(cell, columnIndex) {
				if(cell.isFieldInCoordinate(coordinate)) {
					position = new Position(rowIndex, columnIndex);
				}
			});
		});

		return position;
	},

	getCell: function(position) {
		return this._board[position.getRow()][position.getColumn()];
	}
};

module.exports = BoardUI;

