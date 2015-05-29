/**
 * Created by Dan on 2015.05.29..
 */

var expect = require("chai").expect,
	Men = require("./../../game/Men");

describe("Men", function() {
	describe("#getOutputToken", function() {
		it("should give a 'O' character if white Men created", function() {
			var men = new Men(Men.WHITE);

			expect(men.getOutputToken()).to.eql("O");
		});

		it("should give a 'o' character if black Men created", function() {
			var men = new Men(Men.BLACK);

			expect(men.getOutputToken()).to.eql("o");
		});
	});
});