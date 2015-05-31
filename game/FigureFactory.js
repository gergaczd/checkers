/**
 * Created by Dan on 2015.05.25..
 */
var Men = require("./Men"),
	King = require("./King"),
	Color = require("./Color");

var FigureFactory = {
	createFigureFromId: function(figureId) {
		switch(figureId) {
			case "O": return new Men(Color.WHITE);
			case "o": return new Men(Color.BLACK);
			case "K": return new King(Color.WHITE);
			case "k": return new King(Color.BLACK);
			default: return null;
		}
	},

	_figureTypes: ["O", "o", "K", "k"],

	isValidFigureId: function(figureId) {
		return this._figureTypes.indexOf(figureId) > -1;
	},

	createKingFromMen: function(men) {
		return new King(men.getColor());
	}
};

module.exports = FigureFactory;