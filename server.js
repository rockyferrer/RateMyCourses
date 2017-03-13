var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var models = require('./model.js');

var app = express();

var MONGODB = 'mongodb://localhost/Team23-RateMyCourses';

// Create mongo connection and setup event handlers
mongoose.connect(MONGODB);
var db = mongoose.connection;
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + MONGODB);
});
mongoose.connection.on('error', function(error) {
    console.log('Mongoose connection error: ' + error);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected.');
});

// Create mongoose schemas
// TODO: Add the other schemas once defined
var Course = mongoose.connection.model('Course', models.courseSchema);
var Department = mongoose.connection.model('Department', models.departmentSchema);

//Set up static path so /img will be treated as assets/img
app.use(express.static(__dirname + '/public'));
// Use HTTP port
app.listen(8080, function() {
    console.log("Listening on port 8080.")
});

/**
 * Returns matching courses. 
 * Optional course code and department parameters.
 */
function getCourses(req, res) {
    console.log(req.query);
    var code = req.query.courseCode;
    var dept = req.query.department;
    if (code && dept) {
        Course.find({ courseCode: req.query.courseCode, department: req.query.department }, function(err, courses) {
            if (err) {
                res.send(err);
            }
            res.json(courses);
        });
    } else if (code) {
        Course.find({ courseCode: code }, function(err, courses) {
            if (err) {
                res.send(err);
            }
            res.json(courses);
        });
    } else if (dept) {
        Course.find({ department: dept }, function(err, courses) {
            if (err) {
                res.send(err);
            }
            res.json(courses);
        });
    } else {
        Course.find(function(err, courses) {
            if (err) {
                res.send(err);
            }
            res.json(courses);
        });
    }

};

function getDepartment(req, res) {
    Department.findOne({ name: req.param.department },
        function(err, department) {
            if (err) {
                res.send(err);
            } else {
                res.sendFile(__dirname + '/assets/department.html');
            }
        }
    );
}

function getDepartmentCourses(req, res) {
    console.log(req.department);
    Course.find({ department: req.department },
        function(err, courses) {
            if (err) {
                res.send(err);
            } else {
                res.json(courses);
            }
        }
    );
}

function getAllDepartments(req, res) {
    res.send("NEED TO IMPLEMENT");
}

function getAllFaculties(req, res) {
    res.send("NEED TO IMPLEMENT");
}

// TODO: Add error checking
app.param('department', function(req, res, next, department) {
    req.department = department;
    next();
});

// API Endpoints
app.get('/dept/:department', getDepartment);
app.get('/api/dept/all', getAllDepartments);
app.get('/api/faculties/all', getAllFaculties);
app.get('/api/dept/:department/courses', getDepartmentCourses);

// Angular (Normal) endpoints
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/login', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/courses', getCourses);