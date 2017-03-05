var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

var MONGODB = 'NOT SET'

mongoose.connect(MONGODB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));


function getCourses(req, res){
	var courses = db.getCourses();
	res.send(JSON.stringify(courses));
}

app.get('/courses', getCourses);
