/**
 * Created by Dan on 2015.05.25..
 */
var CheckersLogic = require("./CheckersLogic");
var checkers = new CheckersLogic(8);

checkers.initGame();
checkers.loadPosition("oooo/oooo/4/4/4/4/OOOO/OOOO");

module.exports = checkers;