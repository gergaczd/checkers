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
		});
	});

	describe("#isValidMove", function() {
		var logic;
		beforeEach(function() {
			logic = new CheckersLogic(8);
		});

		it("should not allow not diagonal move", function() {
			logic.loadPosition("o3/4/4/4/4/4/4/4");

			var from = new Position(0,1),
				to = new Position(0,2);

			expect(from.isDiagonal(to)).to.be.false;
			expect(logic.isValidMove(from, to)).to.be.false;
		});

		it("should not allow if a figure is in the destination position", function() {
			logic.loadPosition("o3/1O2/4/4/4/4/4/4");

			var from = new Position(0,1),
				to = new Position(1,2);

			expect(logic.isValidMove(from, to)).to.be.false;
		});

		it("should not allow if the diagonal distance is more than 1 and empty field was between", function() {
			logic.loadPosition("o3/1O2/4/4/4/4/4/4");

			var from = new Position(1,2),
				to = new Position(3,4);

			expect(from.getDiagonalDistance(to)).to.gt(1);
			expect(logic.isValidMove(from, to)).to.be.false;
		});

		it("should not allow if the diagonal distance is 3 and figures are between", function() {
			logic.loadPosition("o3/1O2/1O2/4/4/4/4/4");

			var from = new Position(0,1),
				to = new Position(3,4);

			expect(from.getDiagonalDistance(to)).to.eql(3);
			expect(logic.isValidMove(from, to)).to.be.false;
		});
	});

});