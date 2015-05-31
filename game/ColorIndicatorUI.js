/**
 * Created by Dan on 2015.05.31..
 */
var Coordinate = require("./Coordinate"),
	Color = require("./Color");

var ColorIndicatorUI = function(paddingLeft, paddingTop, boardSize) {
	this._height = boardSize;
	this._width = 50;

	this._paper = Raphael(paddingLeft, paddingTop, this._width, this._height);

	this._createColorCircles();
};

ColorIndicatorUI.CIRCLE_RADIUS = 20;

ColorIndicatorUI.prototype = {

	setToColor: function(color) {
		if(Color.isWhite(color)) {
			this._setAttributesForBlackCircle(0.2);
			this._setAttributesForWhiteCircle(1);
		} else {
			this._setAttributesForWhiteCircle(0.2);
			this._setAttributesForBlackCircle(1);
		}
	},

	_createColorCircles: function() {
		this._createBlackCircle();

		this._createWhiteCircle();
	},

	_createBlackCircle: function() {
		var coordinate = this._calculateBlackCoordinate();
		this._blackCircle = this._paper.circle(coordinate.getX(), coordinate.getY(), ColorIndicatorUI.CIRCLE_RADIUS);

		this._setAttributesForBlackCircle(1);
	},

	_calculateBlackCoordinate: function() {
		var x = this._width/2,
			y = this._height/2 - 50;

		return new Coordinate(x,y);
	},

	_setAttributesForBlackCircle: function(opacity) {
		this._blackCircle.attr({
			"fill": Color.BLACK,
			"stroke": Color.WHITE,
			"stroke-width": 2,
			"opacity": opacity
		});
	},

	_createWhiteCircle: function() {
		var coordinate = this._calculateWhiteCoordinate();
		this._whiteCircle = this._paper.circle(coordinate.getX(), coordinate.getY(), ColorIndicatorUI.CIRCLE_RADIUS);

		this._setAttributesForWhiteCircle(1);
	},

	_calculateWhiteCoordinate: function() {
		var x = this._width/2,
			y = this._height/2 + 50;

		return new Coordinate(x,y);
	},

	_setAttributesForWhiteCircle: function(opacity) {
		this._whiteCircle.attr({
			"fill": Color.WHITE,
			"stroke": Color.BLACK,
			"stroke-width": 2,
			"opacity": opacity
		});
	}

};

module.exports = ColorIndicatorUI;


