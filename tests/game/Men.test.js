/**
 * Created by Dan on 2015.05.29..
 */

var expect = require("chai").expect,
	Men = require("./../../game/Men"),
	Position = require("./../../game/Position"),
	Color = require("./../../game/Color");

describe("Men", function() {
	describe("#getOutputToken", function() {
		it("should give a 'O' character if white Men created", function() {
			var men = new Men(Color.WHITE);

			expect(men.getOutputToken()).to.eql("O");
		});

		it("should give a 'o' character if black Men created", function() {
			var men = new Men(Color.BLACK);

			expect(men.getOutputToken()).to.eql("o");
		});
	});

	describe("#isGoodDirection", function() {
		it("should return true if white men and move is from bottom to up", function() {
			var men = new Men(Color.WHITE),
				fromPosition = new Position(7,7),
				toPosition = new Position(6,6);

			expect(men.isGoodDirection(fromPosition, toPosition)).to.be.true;
		});

		it("should return false if white men and move is from up to bottom", function() {
			var men = new Men(Color.WHITE),
				fromPosition = new Position(6,6),
				toPosition = new Position(7,7);

			expect(men.isGoodDirection(fromPosition, toPosition)).to.be.false;
		});

		it("should return true if black men and move is from up to bottom", function() {
			var men = new Men(Color.BLACK),
				fromPosition = new Position(6,6),
				toPosition = new Position(7,7);

			expect(men.isGoodDirection(fromPosition, toPosition)).to.be.true;
		});

		it("should return false if black men and move is from bottom to up", function() {
			var men = new Men(Color.BLACK),
				fromPosition = new Position(7,7),
				toPosition = new Position(6,6);

			expect(men.isGoodDirection(fromPosition, toPosition)).to.be.false;
		});
	});

	describe("#isPromote", function() {
		it("should return true if white men and the given position's row is 0", function() {
			var men = new Men(Color.WHITE),
				position =  new Position(0,2);

			expect(men.isPromote(position, 8)).to.be.true;
		});

		it("should return true if black men and the given position's row is equal of the biggest row index", function() {
			var men = new Men(Color.BLACK),
				position = new Position(7,2);

			expect(men.isPromote(position, 8)).to.be.true;
		});
	});

	describe("#getCaptureDestinations", function() {
		it("should filter the diagonals according to the given rowCount for a black men", function() {
			var men = new Men(Color.BLACK),
				position = new Position(6,6),
				expected = [];

			expect(position.downwardDiagonals(2).length).to.eql(2);
			expect(men.getCaptureDestinations(position, 8)).to.eql(expected);
		});

		it("should filter the diagonals according to the 0 index for a white men", function() {
			var men = new Men(Color.WHITE),
				position = new Position(1,1),
				expected = [];

			expect(position.upwardDiagonals(2).length).to.eql(2);
			expect(men.getCaptureDestinations(position, 8)).to.eql(expected);
		});

		it("should give the two upward diagonals in normal case (if not in the boundary fields) for a white men", function() {
			var men = new Men(Color.WHITE),
				position = new Position(4,4),
				expected = [new Position(2,2), new Position(2,6)];

			expect(position.upwardDiagonals(2).length).to.eql(2);
			expect(men.getCaptureDestinations(position, 8)).to.eql(expected);
		});

	});
});