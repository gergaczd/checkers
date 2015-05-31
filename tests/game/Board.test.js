/**
 * Created by Dan on 2015.05.25..
 */

var expect = require("chai").expect,
	Board = require("./../../game/Board"),
	Men = require("./../../game/Men"),
	King = require("./../../game/King"),
	Position = require("./../../game/Position"),
	Color = require("./../../game/Color");

var expectNullCells = function(row, cellIndices) {
	cellIndices.forEach(function(index) {
		expect(row[index]).to.be.null;
	});
};

describe("Board", function() {
	describe("#createRow", function() {
		var board;
		beforeEach(function() {
			board = new Board(8);
		});

		it("should create a row with 8 empty field for '4' and 0", function() {
			var row = board.createRow("4", 0);

			expectNullCells(row, [0,1,2,3,4,5,6,7]);
			expect(row.length).to.eql(8);
		});

		it("should create a row with 8 empty field for '4' and 1", function() {
			var row = board.createRow("4", 1);

			expectNullCells(row, [0,1,2,3,4,5,6,7]);
			expect(row.length).to.eql(8);
		});

		it("should create a row with a white Men at index 1 for 'O3' and 0", function() {
			var row = board.createRow("O3", 0);
			expect(row[1]).to.instanceOf(Men);
			expect(row[1].getColor()).to.be.eql(Color.WHITE);

			expectNullCells(row, [0,2,3,4,5,6,7]);
			expect(row.length).to.eql(8);
		});

		it("should create a row with 4 black Men started from index 1 for 'oooo' and 0", function() {
			var row = board.createRow("oooo", 0);

			[1,3,5,7].forEach(function(index) {
				expect(row[index]).to.instanceOf(Men);
				expect(row[index].getColor()).to.be.eql(Color.BLACK);
			});

			expectNullCells(row, [0,2,4,6]);
		});

		it("should throw an error if too many cell generated in row", function() {
			expect(board.createRow.bind(board, "O4")).to.throw(Error);
			expect(board.createRow.bind(board, "5")).to.throw(Error);
			expect(board.createRow.bind(board, "OoOoO")).to.throw(Error);
		});

		it("should throw an error if not enough cell generated in row", function() {
			expect(board.createRow.bind(board, "oOo")).to.throw(Error);
			expect(board.createRow.bind(board, "3")).to.throw(Error);
		});

	});

	describe("#createBoardFromPosition", function() {
		it("should put a white men to (0,1) position", function() {
			var inPosition = "K3/4/4/4/4/4/4/4";
			var board = Board.createBoardFromPosition(inPosition, 8);

			var position = new Position(0,1);

			var figure = board.getCell(position);
			expect(board.isFigureInCell(position)).to.be.true;
			expect(figure.getColor()).to.be.eql(Color.WHITE);
		});
	});

	describe("#getEmptyCounter", function() {
		var board;

		beforeEach(function() {
			board = new Board(8);
		});

		it("should give half of the emptyFields if emptyFields is even", function() {
			expect(board.getEmptyCounter(8)).to.eql("4");
			expect(board.getEmptyCounter(2)).to.eql("1");
		});

		it("should give half of the emptyFields-1 if emptyFields is odd", function() {
			expect(board.getEmptyCounter(3)).to.eql("1");
			expect(board.getEmptyCounter(5)).to.eql("2");
		});

		it("should give empty string if emptyFields are 0", function() {
			expect(board.getEmptyCounter(0)).to.eql("");
		});
	});

	describe("#getRow", function() {
		["4", "oooo", "O3", "O2O", "3k", "KKK1"].forEach(function(row) {
			it("should give back '" + row + "' if '" + row + "' loaded", function() {
				var position = row + "/4/4/4/4/4/4/4";
				var board = Board.createBoardFromPosition(position, 8);

				expect(board.getRow(0)).to.eql(row);

			});
		});
	});

	describe("#getPosition", function() {
		it("should give back the loaded position", function() {
			var position = "K3/4/4/4/4/4/4/4";
			var board = Board.createBoardFromPosition(position, 8);

			expect(board.getPosition()).to.be.eql(position);
		});
	});
});