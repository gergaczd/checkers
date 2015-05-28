/**
 * Created by Dan on 2015.05.25..
 */
var express = require("express");
var app = express(),
	bodyParser = require("body-parser"),
	browserify = require("browserify-middleware"),
	PORT = process.env.PORT || 3000;


app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/src/js/game", browserify("./game"));

app.use(express.static('public'));

app.listen(PORT, function() {
	console.log("server listening on port: " + PORT);
});