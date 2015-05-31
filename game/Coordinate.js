/**
 * Created by Dan on 2015.05.31..
 */
var Coordinate = function(x,y) {
	this._x = x;
	this._y = y;
};

Coordinate.prototype = {
	getX: function() {
		return this._x;
	},

	getY: function() {
		return this._y;
	}
};

Coordinate.fromCircle = function(circle) {
	var x = circle.attr("cx"),
		y = circle.attr("cy");

	return new Coordinate(x,y);
};

Coordinate.fromCircleSet = function(circleSet) {
	var x = circleSet[0].attr("cx"),
		y = circleSet[0].attr("cy");

	return new Coordinate(x,y);
};

module.exports = Coordinate;