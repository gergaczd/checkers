/**
 * Created by Dan on 2015.05.25..
 */
var CheckersLogic = require("./CheckersLogic");
var checkers = new CheckersLogic(8);

var BASE_POSITION = "oooo/oooo/4/4/4/4/OOOO/OOOO";

checkers.initGame();
checkers.loadPosition(BASE_POSITION);

eve.on("game/new", function() {
	checkers.loadPosition(BASE_POSITION);
});

module.exports = checkers;