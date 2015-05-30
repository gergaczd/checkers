/**
 * Created by Dan on 2015.05.25..
 */

var Men  = function(color) {
	this._color = color;
};

Men.WHITE = "#FFFFFF";
Men.BLACK = "#000000";

Men.prototype = {
	getColor: function() {
		return this._color;
	},

	isMen: function() {
		return true;
	},

	getOutputToken: function() {
		var token = this._getToken();

		return this._normalizeToken(token);
	},

	_getToken: function() {
		return "o";
	},

	_normalizeToken: function(token) {
		if(this.getColor() == Men.WHITE) {
			return token.toUpperCase();
		} else {
			return token.toLowerCase();
		}
	},

	isWhite: function() {
		return this._color === Men.WHITE;
	},

	isGoodDirection: function(fromPosition, toPosition) {
		if(this.isWhite()) {
			if(fromPosition.isUpMove(toPosition)) {
				return true;
			}
		}else {
			if(!fromPosition.isUpMove(toPosition)) {
				return true;
			}
		}

		return false;
	},

	isSameColoredFigure: function(figure) {
		return this.getColor() === figure.getColor();
	},

	isPromote: function(position, rowCount) {
		if(this.isWhite()) {
			return position.getRow() === 0;
		} else {
			return position.getRow() === rowCount-1;
		}
	}
};

module.exports = Men;