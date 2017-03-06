var request = require('request');
var mongoose = require('mongoose');
var models = require('../model.js');

var MONGODB = 'mongodb://localhost/Team23-RateMyCourses';
var key = '9iDLLnSQRMwapjbMs5Yb7tnwyqAxK5ud';
var course = models.Course;

var url = 'https://cobalt.qas.im/api/1.0/courses/filter' + '?key=' + key + "&q=department:\"Computer Science&limit=10";

var db = mongoose.connect(MONGODB);
request(url, function(error, reponse, body){
	var result = JSON.parse(body);
	console.log(result[0]);
	result.forEach(function(e){
		pullData(e);
		if(result.indexOf(e) == result.length - 1){
			mongoose.connection.close();
		}
	});
});


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
	c.save(function(err){console.log(err)});

};

function addToDB(course){
	course.save(function(err){console.log(err)});
};
