/**
 * Created by Dan on 2015.05.31..
 */

var GameControlUI = function(padding, boardSize) {
	this._padding = padding;
	this._paddingLeft = 2*padding + boardSize;
	this._width = 100;
	this._height = boardSize;

	this._paper = Raphael(this._paddingLeft, this._padding, this._width, this._height);

	this._createRetireButton();
};

GameControlUI.prototype = {
	_createRetireButton: function() {
		var rect = this._paper.rect(0,0, this._width, 40, 5);
		rect.attr({ "fill": "#E6E6E6" });

		var text = this._paper.text(this._width/2, 20, "Give Up!");
		text.attr({ "font-size": 18 });


		this._retireBtn = this._paper.set();
		this._retireBtn.push(rect, text);
		this._retireBtn.attr({ "cursor": "pointer" });

		this._retireBtn.click(function() {
			eve("game/retire");
		});
	}
};

module.exports = GameControlUI;