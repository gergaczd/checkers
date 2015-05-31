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

King.prototype.getCaptureDestinations = function(position, rowCount) {
	var upward = position.upwardDiagonals(2),
		downward = position.downwardDiagonals(2);

	var destinations = upward.concat(downward);
	return this._filterDestinations(destinations, rowCount);
};


module.exports = King;