var request = require('request');
var mongoose = require('mongoose');
var models = require('../src/model.js');

var MONGODB = 'mongodb://localhost/Team23-RateMyCourses';

var db = mongoose.connect(MONGODB);
mongoose.Promise = Promise;


var CourseScraper = require('./CourseScraper');

for (var i = 0; i < 7000; i += 100) {
    new CourseScraper(db, i);
}

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
