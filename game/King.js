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

module.exports = King;