/**
 * Created by Dan on 2015.05.29..
 */

var expect = require("chai").expect,
	King = require("./../../game/King"),
	Men = require("./../../game/Men");


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
});