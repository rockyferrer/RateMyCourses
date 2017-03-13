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
    user: {type: String, required: true},
    datePosted: { type: Date, default: Date.now, required },
    dateTaken: {type: Date, default: Date.now, required},
    difficulty: {type: Number},
    workload: {type: Number},
    learningExp: {type: Number},
    overall: {type: Number},
    prof: {type: String},
    tags: [String],
    comment: { type: String, required: true }
});

var departmentSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

var userSchema = new mongoose.Schema({
	uid: {type: int, required: true},
	fname: {type: String, required: true},
	lname: {type: String, required: true},
	department: {type: [String]},
	faculty: {type: String},
	email: {type: String, required: true},
	password: {type: String, required: true},
	admin: {type: boolean, required: true},
	coursesViewed: {type: [String]},
	coursesRated: {type: [String]}
});

var course = mongoose.model('Course', courseSchema);
var tag = mongoose.model('Tag', tagSchema);
var rating = mongoose.model('Rating', ratingSchema);
var department = mongoose.model('Department', departmentSchema);
//var course = mongoose.connection.model('Course', courseSchema);
//var tag = mongoose.connection.model('Tag', tagSchema);
//var rating = mongoose.connection.model('Rating', ratingSchema);
//var department = mongoose.connection.model('Department', departmentSchema);


module.exports = {
    courseSchema: courseSchema,
    tagSchema: tagSchema,
    ratingSchema: ratingSchema,
    departmentSchema: departmentSchema
};
