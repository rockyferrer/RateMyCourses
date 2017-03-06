var request = require('request');
var mongoose = require('mongoose');

var MONGODB = 'mongo://localhost/Team23-RateMyCourses';
var key = '9iDLLnSQRMwapjbMs5Yb7tnwyqAxK5ud';

var url = 'https://cobalt.qas.im/api/1.0/courses/filter' + '?key=' + key + "&q=department:\"Computer Science&limit=100";

var db = mongoose.connect('MONGODB');

request(url, function(error, reponse, body){
	var result = JSON.parse(body);
	console.log(Object.keys(result).length);
	result.forEach(console.log(this.code));
	pullData(result);
});


function pullData(result){
	var course ={
		courseCode: result.code,
		title: result.name,
		department: result.department,
		description: result.description,
		popularTags: [],
		classSize: result.meetingSections[0].size,
		ratings: []
	};

	addToDB(course);

};

function addToDB(course){
	db.Courses.insert(course);
};
