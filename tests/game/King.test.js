/**
 * Created by Dan on 2015.05.29..
 */

var expect = require("chai").expect,
	King = require("./../../game/King"),
	Men = require("./../../game/Men"),
	Position = require("./../../game/Position");


describe("King", function() {
	describe("#getOutputToken", function() {
		it("should give a 'K' character if white Men created", function() {
			var king = new King(Men.WHITE);

			expect(king.getOutputToken()).to.eql("K");
		});

		it("should give a 'k' character if black Men created", function() {
			var king = new King(Men.BLACK);

			expect(king.getOutputToken()).to.eql("k");
		});
	});

	describe("#isGoodDirection", function() {
		it("should return true if king and move is from bottom to up", function () {
			var whiteKing = new King(Men.WHITE),
				blackKing = new King(Men.BLACK),
				fromPosition = new Position(7, 7),
				toPosition = new Position(6, 6);

			expect(whiteKing.isGoodDirection(fromPosition, toPosition)).to.be.true;
			expect(blackKing.isGoodDirection(fromPosition, toPosition)).to.be.true;

		});

		it("should return true if king and move is from up to bottom", function () {
			var whiteKing = new King(Men.WHITE),
				blackKing = new King(Men.BLACK),
				fromPosition = new Position(6, 6),
				toPosition = new Position(7, 7);

			expect(whiteKing.isGoodDirection(fromPosition, toPosition)).to.be.true;
			expect(blackKing.isGoodDirection(fromPosition, toPosition)).to.be.true;

		});
	});

});