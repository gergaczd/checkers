/**
 * Created by Dan on 2015.05.29..
 */

var FigureUI = function(paper, position, color, fieldSize) {
	this.paper = paper;
	this.position = position;
	this.color = color;
	this._fieldSize = fieldSize;
	this._isMen = true;
	this._figure = null;
};

FigureUI.createMen = function(paper, position, color, fieldSize) {
	var figure = new FigureUI(paper, position, color, fieldSize);
	figure.redraw();
	return figure;
};

FigureUI.createKing = function(paper, position, color, fieldSize) {
	var figure = new FigureUI(paper, position, color, fieldSize);
	figure.changeToKing();
	figure.redraw();
	return figure;
};

FigureUI.prototype = {

	changeToKing: function() {
		this._isMen = false;
	},

	isMen: function() {
		return this._isMen;
	},

	redraw: function() {
		this.removeFigure();

		if(this.isMen()) {
			this._figure = this._createMen();
		} else {
			this._figure = this._createKing();
		}

		this._attachDrag();

	},

	removeFigure: function() {
		if(this._figure != null) {
			this._figure.remove();
		}
	},

	refreshPosition: function(position) {
		this.position = position;
		this.redraw();
	},

	_createMen: function() {
		var halfFieldSize = this._fieldSize/2;

		var x0 = (this.position.getColumn()*this._fieldSize) + halfFieldSize,
			y0 = (this.position.getRow()*this._fieldSize) +halfFieldSize,
			r = halfFieldSize-5;

		var circle = this.paper.circle(x0, y0, r);

		this._decorateCircle(circle);

		return circle;
	},

	_createKing: function() {
		var halfFieldSize = this._fieldSize/2;

		var x0 = (this.position.getColumn()*this._fieldSize) + halfFieldSize,
			y0 = (this.position.getRow()*this._fieldSize) + halfFieldSize,
			r = halfFieldSize-5;

		var set = this.paper.set();

		var circle1 = this.paper.circle(x0,y0,r),
			circle2 = this.paper.circle(x0,y0,r-5),
			circle3 = this.paper.circle(x0,y0,r-10);

		this._decorateCircle(circle1);
		this._decorateCircle(circle2);
		this._decorateCircle(circle3);

		set.push(circle1, circle2, circle3);
		return set;
	},

	_decorateCircle: function(circle) {
		circle.attr("fill", this.color);
		circle.attr("stroke-width", 2);
		circle.attr("stroke", this._changeColor());
	},

	_changeColor: function() {
		if(this.color == "#FFFFFF" || this.color == "#FFF") {
			return "#000000";
		}
		return "#FFFFFF";
	},

	_attachDrag: function() {
		this._figure.drag(this._onMove, this._onStart, this._onEnd, this, this, this);
	},

	_onMove: function(deltaX, deltaY) {
		var position = {cx: this._originX + deltaX, cy: this._originY + deltaY};
		if(this.isMen()) {
			this._figure.attr(position);
		} else {
			[0,1,2].forEach(function(index) {
				this._figure[index].attr(position);
			}, this);
		}
	},

	_onStart: function() {
		this._storeOriginPosition();
		this._bringToFront();
	},

	_storeOriginPosition: function() {
		if(this.isMen()) {
			this._originX = this._figure.attr("cx");
			this._originY = this._figure.attr("cy");
		} else {
			this._originX = this._figure[0].attr("cx");
			this._originY = this._figure[0].attr("cy");
		}
	},

	_bringToFront: function() {
		if(this.isMen()) {
			this._figure.toFront();
		} else {
			this._figure.forEach(function(figure) {
				figure.toFront();
			});
		}
	},

	_onEnd: function() {
		eve("drag/figure/finished", null, this);
	},

	getFigureCoordinate: function() {
		if(this.isMen()) {
			return {
				x: this._figure.attr("cx"),
				y: this._figure.attr("cy")
			};
		} else {
			return {
				x: this._figure[0].attr("cx"),
				y: this._figure[0].attr("cy")
			};
		}
	},

	revertToOrigin: function() {
		if(this.isMen()) {
			this._figure.attr({cx: this._originX, cy: this._originY});
		} else {
			this._figure.forEach(function(figure) {
				figure.attr({cx: this._originX, cy: this._originY})
			}, this);
		}
	}
};

module.exports = FigureUI;