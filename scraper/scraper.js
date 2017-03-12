var request = require('request');
var mongoose = require('mongoose');
var models = require('../model.js');

var MONGODB = 'mongodb://localhost/Team23-RateMyCourses';
var key = '9iDLLnSQRMwapjbMs5Yb7tnwyqAxK5ud';
var course = models.Course;

var url = 'https://cobalt.qas.im/api/1.0/courses/filter' + '?key=' + key + "&q=department:\"Computer Science&limit=10";

var db = mongoose.connect(MONGODB);
mongoose.Promise = Promise;


var CourseScraper = require('./CourseScraper');

var cs = new CourseScraper(db, 'Computer Science');

// Logging methods
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + MONGODB);
});

mongoose.connection.on('error', function(error) {
    console.log('Mongoose connection error: ' + error);
});

mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected.');
});

// Clean shutdown methods
gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
    })
};