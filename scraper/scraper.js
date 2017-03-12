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




/*function parseJSON(body){
	var result = JSON.parse(body);
	console.log(result[0]);
	result.forEach(function(e){
		pullData(e);
	});
	saveToDB(data);

};

function pullData(result){
	console.log(result);

	var c = new course({
		courseCode: 'CSCXXX',
		title: result.name,
		department: 'Computer Science',
		description: result.description,
		popularTags: [],
		classSize: 9999, //TODO: Fix this
		ratings: []
	});
	console.log("*********************************************");
	console.log(c);
	console.log("=============================================");
	data.push(c);
};

function saveToDB(courses){
	/*course.create(courses, function (err) {
		console.log(err);	
	});*/
/*courses.forEach(function(e) {
		e.save(function(err){
		    if(err){
		        console.log(err);
		    }
		    else{
		        console.log('Sucess!');
		    }
		});	
	});
	mongoose.connection.close();
	//course.save(function(err){console.log(err)});
};*/

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