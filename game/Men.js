/**
 * Created by Dan on 2015.05.25..
 */

var Color = require("./Color");

var Men  = function(color) {
	this._color = color;
};

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
		if(this.isWhite()) {
			return token.toUpperCase();
		} else {
			return token.toLowerCase();
		}
	},

	isWhite: function() {
		return Color.isWhite(this.getColor());
	},

	isGoodDirection: function(fromPosition, toPosition) {
		if(this.isWhite()) {
			return fromPosition.isUpMove(toPosition)
		}else {
			return !fromPosition.isUpMove(toPosition);
		}
	},

	isSameColoredFigure: function(figure) {
		return this.isColor(figure.getColor());
	},

	isColor: function(color) {
		return Color.isSame(this.getColor(), color);
	},

	isPromote: function(position, rowCount) {
		if(this.isWhite()) {
			return position.getRow() === 0;
		} else {
			return position.getRow() === rowCount-1;
		}
	},

	getCaptureDestinations: function(position, rowCount) {
		var destinations = [];
		if(this.isWhite()) {
			destinations = position.upwardDiagonals(2);
		} else {
			destinations = position.downwardDiagonals(2);
		}

		return this._filterDestinations(destinations, rowCount);
	},

	_filterDestinations: function(destinations, rowCount) {
		return destinations.filter(function(position) {
			return !position.isAnyBiggerThen(rowCount-1) && !position.isAnyLowerThen(0);
		})
	}
};

module.exports = Men;