 /**
 * Created by Dan on 2015.05.25..
 */
var expect = require("chai").expect,
	FigureFactory = require("./../../game/FigureFactory"),
	Men = require("./../../game/Men"),
	King = require("./../../game/King");

describe("FigureFactory", function() {
	describe("#createFigureFromId", function() {
		[
			{
				figureId: "O",
				figureName: "white Men",
				expectInstance: Men,
				expectColor: Men.WHITE
			},
			{
				figureId: "o",
				figureName: "black Men",
				expectInstance: Men,
				expectColor: Men.BLACK
			},
			{
				figureId: "K",
				figureName: "white King",
				expectInstance: King,
				expectColor: Men.WHITE
			},
			{
				figureId: "k",
				figureName: "black King",
				expectInstance: King,
				expectColor: Men.BLACK
			}
		].forEach(function(descriptor) {
			it("should create a " + descriptor.figureName + " for input " + descriptor.figureId, function() {
				var figure = FigureFactory.createFigureFromId(descriptor.figureId);

				expect(figure).to.be.instanceOf(descriptor.expectInstance);
				expect(figure.getColor()).to.be.eql(descriptor.expectColor);
			});
		});

		it("should return null if the figureId is not proper", function() {
			expect(FigureFactory.createFigureFromId("b")).to.be.null;
		});
	});

	describe("#isValidFigureId", function() {
		["O", "o", "K", "k"].forEach(function(type) {
			it("should return true for " + type, function() {
				expect(FigureFactory.isValidFigureId(type)).to.be.true;
			});
		});

		["B","b", "p"].forEach(function(type) {
			it("should return false for " + type, function() {
				expect(FigureFactory.isValidFigureId(type)).to.be.false;
			})
		})
	})
});