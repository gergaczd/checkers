/**
 * Created by Dan on 2015.05.28..
 */

var CellUI = function(position) {
	this._position = position;

	this._field = null;
	this._figure = null;
};

CellUI.prototype = {

	getFigure: function() {
		return this._figure;
	},

	getField: function() {
		return this._field;
	},

	setFigure: function(figure) {
		this._figure = figure;
	},

	setField: function(field) {
		this._field = field;
	},

	isFieldInCoordinate: function(coordinate) {
		return this._field.isPointInside(coordinate.getX(), coordinate.getY());
	},

	clearFigure: function() {
		this.setFigure(null);
	},

	removeFigure: function() {
		if(this.getFigure() !== null) {
			this.getFigure().removeFigure();
		}

		this.clearFigure();
	}
};

module.exports = CellUI;