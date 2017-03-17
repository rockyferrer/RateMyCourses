var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var models = require('./model.js');
var path = require('path');
var utils = require('./utils.js');
var routes = require('./routes.js');

var app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

var MONGODB = 'mongodb://localhost/Team23-RateMyCourses';

// Create mongo connection and setup event handlers
mongoose.connect(MONGODB);
var db = mongoose.connection;
mongoose.Promise = global.Promise;
db.on('connected', function() {
    console.log('Mongoose connected to ' + MONGODB);
});
db.on('error', function(error) {
    console.log('Mongoose connection error: ' + error);
});
db.on('disconnected', function() {
    console.log('Mongoose disconnected.');
});



//Set up static path so ../index.html can be referenced
var staticFilesPath = path.resolve(__dirname, '../public');
app.use(express.static(staticFilesPath));
// Use HTTP port
app.listen(8080, function() {
    console.log("Listening on port 8080.")
});

// Setup session and cookies
app.use(session({
    secret: 'pla37SN4KMz9I2t3B4qZd9Nh82758BJx',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}));



// TODO: Add error checking
app.param('department', function(req, res, next, department) {
    req.department = department;
    next();
});

app.param('courseCode', function(req, res, next, courseCode) {
    req.courseCode = courseCode;
    next();
});

app.param('userID', function(req, res, next, userID) {
    req.userID = userID;
    next();
});

app.param('query', function(req, res, next, query) {
    req.query = query;
    next();
});

/**
 * API Endpoints
 */

//Department
//app.get('/dept/:department', getDepartment);
app.get('/api/dept/all', routes.getAllDepartments);
app.get('/api/dept/:department/courses', routes.getDepartmentCourses);

//Course
app.get('/api/courses/:courseCode', routes.getCourse);
app.get('/api/dept/:department/suggested', routes.getSuggestedCourses);
app.post('/api/dept/:department/suggested', routes.getSuggestedCourses);

//Search
app.get('/api/search/:query', routes.searchResults);

//User
app.get('/api/user/:userID', routes.getUserInfo);
app.post('/api/user/login', routes.userLogin);
app.post('/api/user/register', routes.userRegister);

// Misc
app.get('/api/faculties/all', routes.getAllFaculties);

/**
 * public Endpoints
 */

app.get('/', function(req, res) {
    res.sendFile(staticFilesPath + '/index.html');
});
app.get('/search', function(req, res) {
    res.sendFile(staticFilesPath + '/index.html');
});
app.get('/login', function(req, res) {
    res.sendFile(staticFilesPath + '/index.html');
});
app.get('/user/landing', function(req, res) {
    res.sendFile(staticFilesPath + '/index.html');
});
app.get('/user/profile', function(req, res) {
    res.sendFile(staticFilesPath + '/index.html');
});
app.get('/courses/:courseCode', function(req, res) {
    res.sendFile(staticFilesPath + '/index.html');
});

app.get('/dept/:department', function(req, res) {
    res.sendFile(staticFilesPath + '/index.html');
})