var mongoose = require('mongoose');
var models = require('./model.js');
var pw = require('./password.js');
var utils = require('./utils.js');

var db = mongoose.connection;

// Create mongoose schemas
var Course = db.model('Course', models.courseSchema);
var Department = db.model('Department', models.departmentSchema);
var Tag = db.model('Tag', models.tagSchema);
var Rating = db.model('Rating', models.ratingSchema);
var User = db.model('User', models.userSchema);

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
        $or: [{ courseCode: { $regex: new RegExp('.*' + req.query + '.*', "i") } },
            { title: { $regex: new RegExp('.*' + req.query + '.*', "i") } },
            { department: { $regex: new RegExp('.*' + req.query + '.*', "i") } },
            { description: { $regex: new RegExp('.*' + req.query + '.*', "i") } }
        ]
    }, function(err, courses) {
        if (err) {
            console.log(err);
            res.send(err);
            return;
        }
        console.log("Success");
        var depts = {};
        courses.forEach(
            function(course) {
                var dept = course.department;
                if (!(dept in depts)) {
                    depts[dept] = 0;
                }
                depts[dept]++;
            });
        var popular = [];
        if (depts.length <= 3) {
            popular = deps;
        }
        for (var i = 0; i < 3; i++) {
            var max = findmax(depts);
            popular.push(max);
            delete depts[max];
        }
        var json = { courses: courses, depts: popular };
        res.json(json);
    }).limit(50);

};

function findmax(ls) {
    var max = -1;
    var max_key = "";
    for (item in ls) {
        if (ls[item] > max) {
            max = ls[item];
            max_key = item;
        }
    }
    return max_key;
}

function getCourse(req, res) {
    console.log(new Date().toLocaleTimeString() + req.params.courseCode);
    var code = req.params.courseCode;
    user = req.session.user;
    user.coursesViewed.push(code);
    User.update({email: user.email}, {$set : {coursesViewed: user.coursesViewed}});   
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
    var dept = req.params.department;
    console.log(dept);
    Course.find({
        department: dept
    }, function(err, courses) {
        if (err) {
            res.send(err);
            console.log(err);
            return;
        }
        console.log("success");
        res.json(courses);

    }).limit(10);
};

function getDepartment(req, res) {
    Department.findOne({
            name: req.param.department
        },
        function(err, department) {
            if (err) {
                res.send(err);
            } else {
                res.json(deparment)
            }
        }
    );
}

function getAllDepartmentCourses(req, res) {
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

//TODO: Delete? This function should no longer be needed - David
/*function validateUser(email, password) {
    User.findOne({
        "email": email
    }, function(err, user) {
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
}*/

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

function getUserHistory(req, res){
    res.json(req.session.user.coursesViewed);
}

function getUserRated(req, res){
    res.json(req.session.user.coursesRated);
}


// TODO: Implement multiple departments
function userRegister(req, res) {
    console.log(req.body);
    var newUser = utils.createUser(req.body);
    console.log(newUser);
    newUser.save(function(error, usr) {
        if (error) {
            console.log(error);
            res.send(error);
        } else {
            console.log("Created a new user. Password: " + req.body.password);
            req.session.user = usr;
            res.status(200).end();
        }
    });
}

//TODO: Implement
function userLogin(req, res) {
    User.findOne({ "email": req.body.email }, function(err, user) {
        if (err) {
            console.log("Error finding user.");
            return false;
        } else if (user == null) {
            console.log("no user found");
            res.send(false);
        } else {
            console.log(user);
            //TODO: Add to cookie
            if (pw.validatePassphrase(req.body.password,
                    user.salt, user.password)) {
                console.log("succesful login");
                req.session.user = user;
                res.send(true);
            } else {
                console.log("bad password")
                res.send(false);
            };
        }
    });

}

function updateUser(req, res) {
    data = req.body;
    var hash = pw.createNewHash(data.password);
    User.update({ "__id": req.session.user.__id }, {
        $set: {
            email: data.email,
            password: hash.passwordHash,
            salt: hash.salt,
            department: data.department1,
            faculty: data.faculty,
            admin: false
        }
    });
}

function deleteUser(req, res) {
    User.remove({ __id: req.session.user.__id });
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

//TODO: Figure out how to actually get all the data
function postRating(req, res) {
    var data = req.body;
    var newRating = new Rating({
        dateTaken: data.date,
        difficulty: data.difficulty,
        workload: data.workload,
        learningExp: data.learningExp,
        overall: data.overall,
        tags: data.tags,
        helpfulness: 0,
        comment: data.comment,
        course: req.courseCode
    });
    
    user = req.session.user;
    user.coursesViewed.push(req.courseCode);
    User.update({email: user.email}, {$set : {coursesViewed: user.coursesViewed}});   
    
    var course;
    Course.find({
        courseCode: req.courseCode
    }, function(err, crs) {
        course = crs;
    });
    var len = course.ratingCount;
    Course.update({
        courseCode: course.courseCode
    }, {
        $set: {
            overall: (course.overall * len + data.overall) / (len + 1),
            difficulty: (course.difficulty * len + data.difficulty) / (len + 1),
            workload: (course.workload * len + data.workload) / (len + 1),
            learningExp: (course.learningExp * len + data.learningExp) / (len + 1),
            ratingCount: len + 1
        }
    });

    res.send(newRating);
}

function deleteRating(req, res) {
    var data = req.body;
    var course;
    Course.find({
        courseCode: req.courseCode
    }, function(err, crs) {
        course = crs;
    });
    var len = course.ratingCount;
    Course.update({
        courseCode: course.courseCode
    }, {
        $set: {
            overall: (course.overall * len - data.overall) / (len - 1),
            difficulty: (course.difficulty * len - data.difficulty) / (len - 1),
            workload: (course.workload * len - data.workload) / (len - 1),
            learningExp: (course.learningExp * len - data.learningExp) / (len - 1),
            ratingCount: len - 1
        }
    });

    Ratings.remove({ __id: data.__id });
}

module.exports = {
    getCourses: getCourses,
    searchResults: searchResults,
    getCourse: getCourse,
    getSuggestedCourses: getSuggestedCourses,
    getDepartment: getDepartment,
    getAllDepartmentCourses: getAllDepartmentCourses,
    getUserInfo: getUserInfo,
    getUserHistory: getUserHistory,
    getUserRated: getUserRated,
    userRegister: userRegister,
    userLogin: userLogin,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getAllFaculties: getAllFaculties,
    getAllDepartments: getAllDepartments,
    postRating: postRating,
    deleteRating: deleteRating
};
