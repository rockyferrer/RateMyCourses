var mongoose = require('mongoose');

// TODO: Change types to schema

var courseSchema = new mongoose.Schema({
    courseCode: { type: String, required: true },
    title: { type: String, required: true },
    department: { type: String, require: true },
    description: { type: String, require: true },
    popularTags: [String],
    classSize: { type: Number },
    ratings: [String]
});

var tagSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

var ratingSchema = new mongoose.Schema({
    comment: { type: String, required: true }
});

var departmentSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

<<<<<<< HEAD
var userSchema = new mongoose.Schema({
	uid: {type: int, required: true},
	fname: {type: String, required: true},
	lname: {type: String, required: true},
	department: {type: [String], required: true},
	 
});

var course = mongoose.model('Course', courseSchema);
var tag = mongoose.model('Tag', tagSchema);
var rating = mongoose.model('Rating', ratingSchema);
var department = mongoose.model('Department', departmentSchema);
=======
//var course = mongoose.connection.model('Course', courseSchema);
//var tag = mongoose.connection.model('Tag', tagSchema);
//var rating = mongoose.connection.model('Rating', ratingSchema);
//var department = mongoose.connection.model('Department', departmentSchema);
>>>>>>> 3dd8890a8615566cbd1e05ce4637527948c84ec1


module.exports = {
    courseSchema: courseSchema,
    tagSchema: tagSchema,
    ratingSchema: ratingSchema,
    departmentSchema: departmentSchema
};