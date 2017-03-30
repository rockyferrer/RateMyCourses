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
 * Executes a search query on the database. Query is used as a potential course code,
 * part of a description, a department, or course title.
 */
function searchResults(req, res) {
    //find courses that contain the query in one of its fields
    Course.find({
        $or: [{
                courseCode: {
                    $regex: new RegExp('.*' + req.query + '.*', "i")
                }
            },
            {
                title: {
                    $regex: new RegExp('.*' + req.query + '.*', "i")
                }
            },
            {
                department: {
                    $regex: new RegExp('.*' + req.query + '.*', "i")
                }
            },
            {
                description: {
                    $regex: new RegExp('.*' + req.query + '.*', "i")
                }
            }
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
        var json = {
            courses: courses,
            depts: popular
        };
        res.json(json);
    }).limit(50); //match at most 50 courses

};

function getCourse(req, res) {
    console.log(new Date().toLocaleTimeString() + req.courseCode);
    var code = req.courseCode;
    if ("user" in req.session) {
        user = req.session.user;
        if (user.coursesViewed.indexOf(code) <= -1) {
            user.coursesViewed.push(code);
            console.log(user.coursesViewed);
            console.log(user.email);
            User.update({
                email: user.email
            }, {
                $set: {
                    coursesViewed: user.coursesViewed
                }
            }).exec();
        }
    }
	console.log(code);
    Course.findOne({
        courseCode: code
    }, function(err, course) {
        if (err) {
            console.log(err);
            res.send(err);
            return;
        }
        console.log("Success");
		console.log(course.courseCode);
        res.json(course);
    });
};

/**
 * Responds with suggested courses based on department parameter
 */
function getSuggestedCourses(req, res) {
    var dept = req.department;
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
            name: req.department
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
    var user = req.userID;
    console.log("looking for user: " + user);
    //find user and send its json
    User.findOne({
        email: user
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
    User.findOne({
        "email": req.body.email
    }, function(err, user) {
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
                if (user.admin) {
                    req.session.isAdmin = true;
                    res.send("1");
                } else {
                    res.send("2");
                }

            } else {
                console.log("bad password")
                res.send("3");
            };
        }
    });
}


function updateUser(req, res) {
    var data = req.body;
	var user = req.session.user;
	
	if(data.type == 'email'){
    User.update({
        _id: req.session.user._id
    }, {
        $set: {
            email: data.value
 		}	       
    });
		
	}
	
	else if (data.type == 'password'){
		//hash password
    	var hash = pw.createNewHash(data.value);
		salt = hash.salt;
		password = hash.passwordHash;
    User.update({
        _id: req.session.user._id
    }, {
        $set: {
            password: password,
			salt: salt
 		}	       
    });

	}
	
	else if(data.type == 'department1'){
    User.update({
        _id: req.session.user._id
    }, {
        $set: {
            department1: data.value
 		}	       
    });
		
	}

	else if(data.type == 'faculty'){
    User.update({
        _id: req.session.user._id
    }, {
        $set: {
            faculty: data.value
 		}	       
    });
		
	}
}

//delete a user from the database
function deleteUser(req, res) {
    User.remove({
        _id: req.session.user._id
    });
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

function getRatings(req, res){
	var crs;
	Course.findOne({
        courseCode: req.courseCode
    }, function(err, course) {
        if (err) {
            res.send(err);
        }
	Rating.find({_id: {$in: course.ratings}},
		function(err, ratings){
			if (err) {
				res.send(err);
			}
			else{
				res.json(ratings);
			}
		});
	
    });
	
}

//post a new rating
function postRating(req, res) {
    var data = req.body;
	user = req.session.user;
	//create the rating
    var newRating = new Rating({
		user: req.session.user,
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
    user.coursesRated.push(req.courseCode);
 	User.update({
        email: user.email
    }, {
        $set: {
            coursesRated: user.coursesRated
        }
    });
    
	newRating.save(function(error, rating) {
        if (error) {
            console.log(error);
            res.send(error);
        }
    });

    var courseToUpdate;
    Course.findOne({
        courseCode: req.courseCode
    }, function(err, course) {
        if (err) {
            res.send(err);
        }
        courseToUpdate = course;
        updateCourseRating(data, res, courseToUpdate, newRating);
	});
	
	
}

//update the course
function updateCourseRating(data, res, course, newRating) {
    var len = parseInt(course.ratingCount);
    var overall = parseInt(data.overall);
    var difficulty = parseInt(data.difficulty);
    var workload = parseInt(data.workload);
    var learningExp = parseInt(data.learningExp);

    for (tag in data.tags) {
        if (course.popularTags.indexOf(tag) <= -1) {
            course.popularTags.push(tag);
        }
    }
    course.ratings.push(newRating);
    course.update({
        $set: {
            overall: (course.overall * len + overall) / (len + 1),
            difficulty: (course.difficulty * len + difficulty) / (len + 1),
            workload: (course.workload * len + workload) / (len + 1),
            learningExp: (course.learningExp * len + learningExp) / (len + 1),
            ratingCount: len + 1,
            popularTags: course.popularTags,
            ratings: course.ratings
        }
    }, function(err, newRating) {
        if (err) {
            res.send(err);
        }
        //send the new rating
        res.send(newRating);
    });
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

    index = course.ratings.indexOf(req.rating);
    if (index > -1) {
        course.ratings.splice(index, 1);
    }
    //update the course
    Course.update({
        courseCode: course.courseCode
    }, {
        $set: {
            overall: (course.overall * len - data.overall) / (len - 1),
            difficulty: (course.difficulty * len - data.difficulty) / (len - 1),
            workload: (course.workload * len - data.workload) / (len - 1),
            learningExp: (course.learningExp * len - data.learningExp) / (len - 1),
            ratingCount: len - 1,
            ratings: course.ratings
        }
    });
	Rating.remove({_id: req.rating});
}


function updateHelpfulness(req, res) {
    var data = req.body;
    var rating;
    var course;

    //find the course in the database so that it can be updated based on its currents values
    Course.find({
        courseCode: req.courseCode
    }, function(err, crs) {
        course = crs;
    });

    index = course.ratings.indexOf(req.rating);
    if (index > -1) {
        rating = req.course.ratings[index]
    }
    rating.update({ $set: { helpfulness: rating.helpfulness - data.vote } });

}

module.exports = {
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
    deleteRating: deleteRating,
    updateHelpfulness: updateHelpfulness,
	getRatings: getRatings
};
