/**
 * Created by Dan on 2015.05.25..
 */

var expect = require("chai").expect,
	Board = require("./../../game/Board"),
	Men = require("./../../game/Men"),
	King = require("./../../game/King");

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
			expect(row[1].getColor()).to.be.eql(Men.WHITE);

			expectNullCells(row, [0,2,3,4,5,6,7]);
			expect(row.length).to.eql(8);
		});

		it("should create a row with 4 black Men started from index 1 for 'oooo' and 0", function() {
			var row = board.createRow("oooo", 0);

			[1,3,5,7].forEach(function(index) {
				expect(row[index]).to.instanceOf(Men);
				expect(row[index].getColor()).to.be.eql(Men.BLACK);
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
			var position = "K3/4/4/4/4/4/4/4";
			var board = Board.createBoardFromPosition(position, 8);

			var figure = board.getCell(0,1);
			expect(board.isFigureInCell(0,1)).to.be.true;
			expect(figure.getColor()).to.be.eql(Men.WHITE);
		});
	});
});