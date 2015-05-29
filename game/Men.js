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
	}

};

module.exports = Men;