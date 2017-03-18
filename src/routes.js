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

/**
 * Executes a search query on the database. Query is used as a potential course code,
 * part of a description, a department, or course title.
 */
function searchResults(req, res) {
    //find courses that contain the query in one of its fields
    Course.find({
        $or: [{ courseCode: { $regex: new RegExp('.*' + req.query + '.*', "i") } },
            { title: { $regex: new RegExp('.*' + req.query + '.*', "i") } },
            { department: { $regex: new RegExp('.*' + req.query + '.*', "i") } },
            { description: { $regex: new RegExp('.*' + req.query + '.*', "i") } }
        ]
    }, function(err, courses) {
        //error check
        if (err) {
            console.log(err);
            res.send(err);
            return;
        }
        //Store department results
        var depts = {};
        //Count the amount of courses that are a part of each department
        courses.forEach(
            function(course) {
                var dept = course.department;
                //add the dept field if needed
                if (!(dept in depts)) {
                    depts[dept] = 0;
                }
                //increment the count
                depts[dept]++;
            });

        //find the 3 most common departments from the courses we found
        var popular = [];
        if (depts.length <= 3) {
            popular = deps;
        }
        for (var i = 0; i < 3; i++) {
            var max = utils.findMax(depts);
            popular.push(max);
            delete depts[max];
        }
        //send the json response
        var json = { courses: courses, depts: popular };
        res.json(json);
    }).limit(50); //match at most 50 courses

};

function getCourse(req, res) {
    console.log(new Date().toLocaleTimeString() + req.params.courseCode);
    var code = req.params.courseCode;
    if ("user" in req.session) {
        user = req.session.user;
        user.coursesViewed.push(code);
        console.log(user.coursesViewed);
        console.log(user.email);
        User.update({ email: user.email }, { $set: { coursesViewed: user.coursesViewed } }).exec();
    }

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
    //find department and send its json
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
    //find all the courses from a specific department
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

function getUserInfo(req, res) {
    var user = req.param.userID;
    //find user and send its json
    User.findOne({
        _id: user
    }, function(err, users) {
        if (err) {
            res.send(err);
        }
        res.json(users);
    });
}
//send the user's course history
function getUserHistory(req, res) {
    res.json(req.session.user.coursesViewed);
}

//send the courses the user has visited
function getUserRated(req, res) {
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

function userLogin(req, res) {
    User.findOne({ "email": req.body.email }, function(err, user) {
        if (err) {
            console.log("Error finding user.");
            return false;
        } else if (user == null) {
            console.log("no user found");
            res.send(false);
        } else {
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
    //hash password
    var hash = pw.createNewHash(data.password);
    //update the user with the new data
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

//delete a user from the database
function deleteUser(req, res) {
    User.remove({ __id: req.session.user.__id });
}

//get all faculties in the database
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

//get all departments in the database
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

//post a new rating
function postRating(req, res) {
    console.log("post rating");
    var data = req.body;
    console.log(data);
    //create the rating
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
    //update user parameters
    user = req.session.user;
    user.coursesViewed.push(req.courseCode);
    User.update({ email: user.email }, { $set: { coursesRated: user.coursesRated } });
    var course;
    Course.findOne({
        courseCode: req.courseCode
    }, function(err, course) {
        if (err) {
            res.send(err);
        }
        updateRating(req, res, course);
    });
    //update the course

    function updateRating(req, res, course) {
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

        //send the new rating
        res.send(newRating);
    }
}

function deleteRating(req, res) {
    var data = req.body;
    var course;

    //find the course in the database so that it can be updated based on its currents values
    Course.find({
        courseCode: req.courseCode
    }, function(err, crs) {
        course = crs;
    });
    var len = course.ratingCount;

    //update the course
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

    //remove the rating from the database
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