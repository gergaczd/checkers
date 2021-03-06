/**
 * Created by Dan on 2015.05.25..
 */
var Men = require("./Men");

var King = function() {
	Men.apply(this, arguments);

};

King.prototype = Object.create(Men.prototype);
King.prototype.constructor = King;

King.prototype.isMen = function() {
	return false;
};

King.prototype._getToken = function() {
	return "k";
};

King.prototype.isGoodDirection = function(fromPosition, toPosition) {
	return true;
};

King.prototype.isPromote = function(position, rowCount) {
	return false;
};

King.prototype._getMoveDestinationsByDistance = function(position, rowCount, distance) {
	var upward = position.upwardDiagonals(distance),
		downward = position.downwardDiagonals(distance);

	var destinations = upward.concat(downward);
	return this._filterDestinations(destinations, rowCount);
};

module.exports = King;