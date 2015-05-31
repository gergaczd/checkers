/**
 * Created by Dan on 2015.05.31..
 */
var expect = require("chai").expect,
	Color = require("./../../game/Color");

describe("Color", function() {
	describe("#isSame", function() {
		it("should return true if two black color was given", function() {
			expect(Color.isSame(Color.BLACK, Color.BLACK)).to.be.true;
		});

		it("should return true if two white color was given", function() {
			expect(Color.isSame(Color.WHITE, Color.WHITE)).to.be.true;
		});
	});

	describe("#changeColor", function() {
		it("should change the white color to black", function() {
			expect(Color.changeColor(Color.WHITE)).to.eql(Color.BLACK);
		});

		it("should change the black color to white", function() {
			expect(Color.changeColor(Color.BLACK)).to.eql(Color.WHITE);
		});
	});

});