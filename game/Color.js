/**
 * Created by Dan on 2015.05.31..
 */

var Color = {
	WHITE: "#FFFFFF",
	BLACK: "#000000",

	isSame: function(color, compareColor) {
		return color === compareColor;
	},

	changeColor: function(color) {
		if(color === Color.WHITE) {
			return Color.BLACK;
		} else {
			return Color.WHITE;
		}
	},

	isWhite: function(color) {
		return color == Color.WHITE;
	}
};

module.exports = Color;