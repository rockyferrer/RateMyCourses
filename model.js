var mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
	courseCode: {type: String, required: true},
	title: {type: String, required: true},
	department: {type: departmentSchema, require: true},
	description: {type:String, require: true},
	popularTags: {type: [{type: mongoose.Schema.type.ObjectId, ref: 'Tag'}]},
	classSize: {type: Number},
	ratings: {[{type: mongoose.Schema.type.ObjectId, ref: 'Rating']}
});

var course = mongoose.model('Course', courseSchema);


module.exports = {'Course': Course};
