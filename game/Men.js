/**
 * Created by Dan on 2015.05.25..
 */

var Men  = function(color) {
	this._color = color;
};

Men.WHITE = "white";
Men.BLACK = "black";

Men.prototype = {
	getColor: function() {
		return this._color;
	},

	isMen: function() {
		return true;
	}
};

module.exports = Men;