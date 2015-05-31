/**
 * Created by Dan on 2015.05.25..
 */
var CheckersLogic = require("./CheckersLogic");
var checkers = new CheckersLogic(8);

checkers.initGame();
//checkers.loadPosition("kooo/oooo/4/4/4/4/OOOO/OOOK");
checkers.loadPosition("o3/4/4/K3/4/4/4/4");

eve.on("new/game", function() {
	checkers.loadPosition("kooo/oooo/4/4/4/4/OOOO/OOOK");
});

module.exports = checkers;