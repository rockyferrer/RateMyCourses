var mongoose = require('mongoose');

// TODO: Change types to schema

var courseSchema = new mongoose.Schema({
	courseCode: {type: String, required: true},
	title: {type: String, required: true},
	department: {type: String, require: true},
	description: {type:String, require: true},
	popularTags: [String],
	classSize: {type: Number},
	ratings: [String]
});

var tagSchema = new mongoose.Schema({
	name: {type: String, required: true}
});

var ratingSchema = new mongoose.Schema({
	comment: {type: String, required: true}
});

var departmentSchema = new mongoose.Schema({
	name: {type: String, required: true}
});

var course = mongoose.model('Course', courseSchema);
var tag = mongoose.model('Tag', tagSchema);
var rating = mongoose.model('Rating', ratingSchema);
var department = mongoose.model('Department', departmentSchema);


module.exports = {Course: course, Tag: tag, Rating: rating, Department: department};
