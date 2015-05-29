/**
 * Created by Dan on 2015.05.29..
 */
var expect = require("chai").expect,
	CheckersLogic = require("./../../game/CheckersLogic"),
	Position = require("./../../game/Position");

describe("CheckersLogic", function() {

	describe("#moveFigure", function() {

		it("should move a figure from (0,1) to (1,0)", function() {
			var logic = new CheckersLogic(8);
			var inPosition = "o3/4/4/4/4/4/4/4",
				outPosition = "4/o3/4/4/4/4/4/4",
				fromPos = new Position(0,1),
				toPos = new Position(1,0);

			logic.loadPosition(inPosition);
			logic.moveFigure(fromPos, toPos);

			expect(logic.getPosition()).to.eql(outPosition);
		})
	});
});