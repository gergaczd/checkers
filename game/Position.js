/**
 * Created by Dan on 2015.05.29..
 */

var Position = function(row, column) {
	this._row = row;
	this._column = column;
};

Position.ODD_COLOR = "#555555";
Position.EVEN_COLOR = "#CCCCCC";

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
	}
};

module.exports = Position;