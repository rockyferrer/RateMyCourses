var mongoose = require('mongoose');
var models = require('./model.js');

var db = mongoose.connection;

// Create mongoose schemas
// TODO: Add the other schemas once defined
var Course = db.model('Course', models.courseSchema);
var Department = db.model('Department', models.departmentSchema);
var Tag = db.model('Tag', models.tagSchema);
var Rating = db.model('Rating', models.ratingSchema);
var User = db.model('User', models.userSchema);
// TODO: Mongoose throws an error for user
//var User = mongoose.connection.model('User', models.userSchema);

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
        $or: [{ courseCode: { $regex: '.*' + req.query + '.*' } },
            { title: { $regex: '.*' + req.query + '.*' } },
            { department: { $regex: '.*' + req.query + '.*' } },
            { description: { $regex: '.*' + req.query + '.*' } }
        ]
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

// TODO: Implement multiple departments
function userRegister(req, res) {
    console.log(req.body);
    var newUser = util.createUser(req.body);
    console.log(newUser);
    newUser.save(function(error, usr) {
        if (error) {
            console.log(error);
            res.send(error);
        } else {
            console.log("Created a new user.");
            req.session.user = usr;
            res.status(200).end();
        }
    });
}

function userLogin(req, res) {
    console.log(req.body.email + " - " + req.body.password);
    if (validateUser(req.body.email, req.body.password)) {
        res.status(200).end();
    } else {
        res.status(404).end();
    }
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

// TODO: Figure out how to add ids to the ratings
function postRating(data) {
    var newRating = new Rating({
        user: data.user,
        dateTaken: data.date,
        difficulty: data.difficulty,
        workload: data.workload,
        learningExp: data.learningExp,
        overall: data.overall,
        prof: data.prof,
        tags: data.tags,
        helpfulness: 0,
        comment: data.comment
    });
    var len = data.course.ratings.length;
    data.course.ratings.push(data.user);
    if (len == 0) {
        var overall = 0;
    }
    Course.update({
        courseCode: data.course.courseCode
    }, {
        $set: {
            overall: (data.course.overall * len + data.overall) / (len + 1),
            difficulty: (data.course.difficulty * len + data.difficulty) / (len + 1),
            workload: (data.course.workload * len + data.workload) / (len + 1),
            learningExp: (data.course.learningExp * len + data.learningExp) / (len + 1),
            ratings: data.course.ratings
        }
    });

    return newRating;
}

module.exports = {
    getCourses,
    searchResults,
    getCourse,
    getSuggestedCourses,
    getDepartment,
    getDepartmentCourses,
    validateUser,
    getUserInfo,
    userRegister,
    userLogin,
    getAllFaculties,
    getAllDepartments,
    postRating
};