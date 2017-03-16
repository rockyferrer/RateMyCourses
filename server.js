var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var models = require('./model.js');
var pw = require('./password.js');
var nonEndPts = require('./nonEndPointFunctions.js');

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
    cookie: {
        secure: false
    }
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
        Course.find({
            courseCode: req.query.courseCode,
            department: req.query.department
        }, function(err, courses) {
            if (err) {
                res.send(err);
            }
            res.json(courses);
        });
    } else if (code) {
        Course.find({
            courseCode: code
        }, function(err, courses) {
            if (err) {
                res.send(err);
            }
            res.json(courses);
        });
    } else if (dept) {
        Course.find({
            department: dept
        }, function(err, courses) {
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


function searchResults(req, res) {
    console.log(req.query);
        Course.find({
            courseCode: {$regex: '.*' + req.query + '.*'}
        },function(err, course) {
           if (err) {
               console.log(err);
               res.send(err);
               return;
            }
            console.log("Success");
            res.json(course);
        });


        Department.find({
            name: {$regex: '.*' + req.query + '.*'}
        },function(err, dept) {
           if (err) {
               console.log(err);
               res.send(err);
               return;
            }
            console.log("Success");
            res.json(dept);
        });
};

function getCourse(req, res) {
    console.log(new Date().toLocaleTimeString() + req.params.courseCode);
    var code = req.params.courseCode;

    Course.findOne({
        courseCode: code
    }, function(err, course) {
        if (err) {
            console.log(err);
            res.send(err);
            return;
        }
        console.log("Success");
        res.json(course);
    });
};

/**
 * Responds with suggested courses based on department parameter
 */
function getSuggestedCourses(req, res) {
    var dept = req.param.department;
    Course.find({
        department: dept
    }, function(err, courses) {
        if (err) {
            res.send(err);
            return;
        }
        res.json(courses);
    });
};

function getDepartment(req, res) {
    Department.findOne({
            name: req.param.department
        },
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
    Course.find({
            department: req.department
        },
        function(err, courses) {
            if (err) {
                res.send(err);
            } else {
                res.json(courses);
            }
        }
    );
}

//TODO: Implement
function validateUser(email, password) {
    User.findOne({ "email": email }, function(err, user) {
        if (err) {
            console.log("Error finding user.");
            return false;
        } else if (user == undefined) {
            return false;
        } else {
            console.log(user);
            //TODO: Add to cookie
            return (pw.validatePassphrase(password,
                user.salt, user.password));
        }
    });
    return true;
    //console.log(req.body);
    //User.find({ "email": req.body.email, "password": req.body.email })
    //res.end();
}

function createUser(data) {
    var hash = pw.createNewHash(data.password);
    var newUser = new User({
        email: data.email,
        password: hash.passwordHash,
        salt: hash.salt,
        department: data.department1,
        faculty: data.faculty,
        admin: false
    });
    return newUser;
}

function getUserInfo(req, res) {
    var user = req.param.userID;
    User.findOne({
        _id: user
    }, function(err, users) {
        if (err) {
            res.send(err);
        }
        res.json(users);
    });
}

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

app.param('query', function(req, res, next, query){
    req.query = query;
    next();
});

/**
 * API Endpoints
 */

//Department
//app.get('/dept/:department', getDepartment);
app.get('/api/dept/all', nonEndPts.getAllDepartments);
app.get('/api/dept/:department/courses', getDepartmentCourses);

//Course
app.get('/api/courses/:courseCode', getCourse);
app.get('/api/dept/:department/suggested', getSuggestedCourses);

//Search
app.get('/api/search/:query', searchResults);

//User
app.get('/api/user/:userID', getUserInfo);
app.post('/api/user/login', nonEndPts.userLogin);
app.post('/api/user/register', nonEndPts.userRegister);

// Misc
app.get('/api/faculties/all', nonEndPts.getAllFaculties);

// Angular (Normal) endpoints
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/search', function(req, res) {
    res.redirect('/');
});
app.get('/login', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/user/landing', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/user/profile', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/courses/:courseCode', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/dept/:department', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
})
