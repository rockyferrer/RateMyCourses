var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var models = require('./model.js');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
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

// Create mongoose schemas
// TODO: Add the other schemas once defined
var Course = db.model('Course', models.courseSchema);
var Department = db.model('Department', models.departmentSchema);
var Tag = db.model('Tag', models.tagSchema);
var Rating = db.model('Rating', models.ratingSchema);
var User = db.model('User', models.userSchema);
// TODO: Mongoose throws an error for user
//var User = mongoose.connection.model('User', models.userSchema);

//Set up static path so /js will be treated as public/js
app.use(express.static(__dirname + '/public'));
// Use HTTP port
app.listen(8080, function() {
    console.log("Listening on port 8080.")
});

// Setup session and cookies
app.use(session({
    secret: 'pla37SN4KMz9I2t3B4qZd9Nh82758BJx',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


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

function getCourse(req, res) {
    var code = req.query.courseCode;
    var dept = req.query.department;
    if (code && dept) {
        Course.findOne({ courseCode: code, department: dept }, function(err, courses) {
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

/**
 * Returns suggested courses based on department parameter
 */
function getSuggestedCourses(req, res) {
    var dept = req.param.department;
    if (dept) {
        Course.find({department: dept}, function(err, courses) {
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
    Course.find().distinct('department',
        function(err, depts) {
            if (err) {
                res.send(err);
            } else {
                res.json(depts);
            }
        }
    );
}

function getAllFaculties(req, res) {
    Course.find().distinct('faculty',
        function(err, faculties) {
            if (err) {
                res.send(err);
            } else {
                res.json(faculties);
            }
        }
    );
}

function userLogin(req, res) {
    console.log(req.body);
    res.end();
}

function userRegister(req, res) {
    console.log(req.body);
    var newUser = new User({
        email: req.body.email,
        password: req.body.password,
        department: req.body.department1,
        faculty: req.body.faculty,
        admin: false
    });
    console.log(newUser);
    newUser.save(function(error) {
        if (error) {
            console.log(error);
            res.send(error);
        } else {
            console.log("Created a new user.");
        }
    });
    res.end();
}


// TODO: Add error checking
app.param('department', function(req, res, next, department) {
    req.department = department;
    next();
});

// API Endpoints

//Department
//app.get('/dept/:department', getDepartment);
app.get('/api/dept/all', getAllDepartments);
app.get('/api/dept/:department/courses', getDepartmentCourses);

//Course
app.get('/api/courses/:courseCode', getCourse);
app.get('/api/dept/:department/suggested', getSuggestedCourses);

//User
app.post('/api/user/login', userLogin);
app.post('/api/user/register', userRegister);

// Misc
app.get('/api/faculties/all', getAllFaculties);




// Angular (Normal) endpoints
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/login', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/courses', getCourses);
