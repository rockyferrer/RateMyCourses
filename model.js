var mongoose = require('mongoose');

// TODO: Do we want faculty?

var courseSchema = new mongoose.Schema({
    courseCode: { type: String, required: true },
    title: { type: String, required: true },
    department: { type: String, required: true },
    faculty: { type: String, required: true },
    description: { type: String },
    popularTags: [String],
    classSize: { type: Number },
    ratings: [String]
});

var tagSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

var ratingSchema = new mongoose.Schema({
    user: { type: String, required: true },
    datePosted: { type: Date, default: Date.now, required: true },
    dateTaken: { type: Date, default: Date.now, required: true },
    difficulty: { type: Number, required: true },
    workload: { type: Number, required: true },
    learningExp: { type: Number, required: true },
    overall: { type: Number, required: true },
    prof: { type: String },
    tags: [String],
    helpfulness: { type: Number, required: true },
    comment: { type: String, required: true }
});

var departmentSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

var userSchema = new mongoose.Schema({
    department: { type: [String] },
    faculty: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean, required: true },
    coursesViewed: { type: [String] },
    coursesRated: { type: [String] }
});

//models for each schema
var course = mongoose.model('Course', courseSchema);
var tag = mongoose.model('Tag', tagSchema);
var rating = mongoose.model('Rating', ratingSchema);
var department = mongoose.model('Department', departmentSchema);
//var user = mongoose.model('User', userSchema);
//var course = mongoose.connection.model('Course', courseSchema);
//var tag = mongoose.connection.model('Tag', tagSchema);
//var rating = mongoose.connection.model('Rating', ratingSchema);
//var department = mongoose.connection.model('Department', departmentSchema);


module.exports = {
    courseSchema: courseSchema,
    tagSchema: tagSchema,
    ratingSchema: ratingSchema,
    departmentSchema: departmentSchema,
    userSchema: userSchema
};
