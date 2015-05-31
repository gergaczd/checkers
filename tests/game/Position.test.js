/**
 * Created by Dan on 2015.05.30..
 */

var expect = require("chai").expect,
	Position = require("./../../game/Position");

var printTestCase = function(testCase) {
	return testCase.position.toString() + "->" + testCase.givenPosition.toString()
};

describe("Position", function() {
	describe("#isDiagonal", function() {
		it("should return false if the given position is the same point", function() {
			var position = new Position(2,2),
				givenPosition = new Position(2,2);

			expect(position.isDiagonal(givenPosition)).to.be["false"];
		});

		[
			{
				position: new Position(2,2),
				givenPosition: new Position(3,3),
				expect: "true"
			},
			{
				position: new Position(2,2),
				givenPosition: new Position(3,3),
				expect: "true"
			},
			{
				position: new Position(2,2),
				givenPosition: new Position(4,2),
				expect: "false"
			},
			{
				position: new Position(0,0),
				givenPosition: new Position(0,7),
				expect: "false"
			},
			{
				position: new Position(2,2),
				givenPosition: new Position(3,1),
				expect: "true"
			},
			{
				position: new Position(2,2),
				givenPosition: new Position(1,3),
				expect: "true"
			}
		].forEach(function(testCase) {
			it("should return" + testCase.expect + ": " + printTestCase(testCase), function() {
				var isDiagonal = testCase.position.isDiagonal(testCase.givenPosition);
				expect(isDiagonal).to.be[testCase.expect];
			});
		});
	});

	describe("#getDiagonalDistance", function() {
		it("should return 0 if the 2 position is not diagonal", function() {
			var position = new Position(2,1),
				givenPosition = new Position(3,1);

			expect(position.getDiagonalDistance(givenPosition)).to.eql(0);
		});

		it("should return 2 if diagonal and the attributes difference is 2", function() {
			var position = new Position(2,1),
				givenPosition = new Position(4,3);

			expect(position.getDiagonalDistance(givenPosition)).to.eql(2);
		});
	});

	describe("#getPositionsDuringDiagonalJump", function() {
		[
			{
				description: "should give empty array if the two given position is not diagonal",
				position: new Position(2,1),
				givenPosition: new Position(2,2),
				expected: []
			},
			{
				description: "should return an empty array if the two given position distance only one (and diagonal)",
				position: new Position(1,1),
				givenPosition: new Position(2,2),
				expected: []
			},
			{
				description: "should return (1,1) if the two given position is (0,0) and (2,2)",
				position: new Position(0,0),
				givenPosition: new Position(2,2),
				expected: [new Position(1,1)]
			},
			{
				description: "should return multiple position if distance is more than 2",
				position: new Position(0,0),
				givenPosition: new Position(4,4),
				expected: [new Position(1,1), new Position(2,2), new Position(3,3)]
			},
			{
				description: "should return multiple position if distance is more than 2",
				position: new Position(3,3),
				givenPosition: new Position(5,1),
				expected: [new Position(4,2)]
			}
		].forEach(function(testCase) {
			it(testCase.description, function() {
				expect(testCase.position.getPositionsDuringDiagonalJump(testCase.givenPosition))
					.to.eql(testCase.expected);
			})
		});
	});

	describe("#upwardDiagonals", function() {
		it("should give positions at distance 1 by vary the column and decrease the row by 1", function() {
			var position = new Position(3,3),
				expected = [new Position(2,2), new Position(2,4)];

			expect(position.upwardDiagonals(1)).to.eql(expected);
		});

		it("should give positions at distance 2 by vary the column and decrease the row by 2", function() {
			var position = new Position(0,2),
				expected = [new Position(-2,0), new Position(-2,4)];

			expect(position.upwardDiagonals(2)).to.eql(expected);
		})
	});

	describe("#downwardDiagonals", function() {
		it("should give positions at distance 1 by vary the column and increase the row by 1", function() {
			var position = new Position(3,3),
				expected = [new Position(4,2), new Position(4,4)];

			expect(position.downwardDiagonals(1)).to.eql(expected);
		});

		it("should give positions at distance 2 by vary the column and increase the row by 2", function() {
			var position = new Position(0,2),
				expected = [new Position(2,0), new Position(2,4)];

			expect(position.downwardDiagonals(2)).to.eql(expected);
		})
	});
});