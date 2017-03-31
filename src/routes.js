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
                    $regex: new RegExp('.*' + req.searchQuery + '.*', "i")
                }
            },
            {
                title: {
                    $regex: new RegExp('.*' + req.searchQuery + '.*', "i")
                }
            },
            {
                department: {
                    $regex: new RegExp('.*' + req.searchQuery + '.*', "i")
                }
            },
            {
                description: {
                    $regex: new RegExp('.*' + req.searchQuery + '.*', "i")
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
            popular = depts;
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
        if (course == null) res.status(404).end();
        res.json(course);
    });
};

function getPopularTags(req, res){
    //find the 3 most common departments from the courses we found
    code = req.courseCode;

    Course.findOne({
        courseCode: code
    }, function(err, course) {
        if (err) {
            console.log(err);
            res.send(err);
            return;
        }
        if (course == null) res.status(404).end();
        var popular = [];
        tags = course.popularTags;
        console.log(course._id);
        console.log("here");
        console.log(tags);
        console.log(course.popularTags);
        if (tags.length <= 3) {
            for(var i=0; i<tags.length; i++){
                popular.push(tags[i].name);
            }
        }
        else{
            for (var i = 0; i < 3; i++) {
                var max = utils.findMaxTag(tags);
                popular.push(tags[max].name);
                tags.splice(max, 1);
            }
        }
        res.json(popular);
    });

}

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
        console.log("success getting suggested courses");
        res.json(courses);

    }).limit(10);
};

function getUserSuggested(req, res) {
    console.log("Looking for courses for: " + req.session.user + " in " + req.session.user.department);
    Course.find({
        department: req.session.user.department
    }, function(err, courses) {
        if (err) {
            console.log(err)
        } else {
            //console.log(courses);
            res.json(courses);
        }
    }).limit(10);
}

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

function userLogout(req, res){
    delete req.session.user;
    delete req.session.isAdmin;
    res.status(200).end();
}

function updateUser(req, res) {
    console.log('updating user');
    var data = req.body;
	var user = req.session.user;

	if(data.type == 'email'){
    User.update({
        _id: user._id
    }, {
        $set: {
            email: data.value
 		}
    }, function(err, user) {
        if (err) {
            console.log(err);
            res.send(err);
            return;
        }
        console.log(user);
    });

	}

	else if (data.type == 'password'){
		//hash password
    	var hash = pw.createNewHash(data.value);
		salt = hash.salt;
		password = hash.passwordHash;
    User.update({
        _id: user._id
    }, {
        $set: {
            password: password,
			salt: salt
 		}
    });

	}

	else if(data.type == 'department1'){
    User.update({
        _id: user._id
    }, {
        $set: {
            department1: data.value
 		}
    });
    
	}

	else if(data.type == 'faculty'){
    User.update({
        _id: user._id
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
        email: req.username
    }, function(err, usr) {
        if (err) {
            console.log(err);
        }
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

function getRatings(req, res) {
    var crs;
    Course.findOne({
        courseCode: req.courseCode
    }, function(err, course) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            var ids = course.ratings.map(function(id) { return mongoose.Types.ObjectId(id); });
            console.log(ids);
            Rating.find({ "_id": { $in: ids } },
                function(err, ratings) {
                    if (err) {
                        res.send(err);
                    } else {
                        console.log(ratings);
                        res.json(ratings);
                    }
                }
            );
        }

    });

}

//post a new rating
function postRating(req, res) {
    var data = req.body;
    //user = req.session.user;
    //console.log("THIS IS THE USER:" + user);
    //create the rating

    var newRating = new Rating({
        user: 1,
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
    /*user.coursesRated.push(req.courseCode);
    User.update({
        email: user.email
    }, {
        $set: {
            coursesRated: user.coursesRated
        }
    }, function(err) {
        if (err) {
            console.log("Error updating user.");
            console.log(err);
        }

    });*/

    newRating.save(function(error, rating) {
        if (error) {
            console.log(error);
        }
    });

    var courseToUpdate;
    Course.findOne({
        courseCode: req.courseCode
    }, function(err, course) {
        if (err) {
            //res.send(err);
            console.log("Error updating course.");
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

    console.log(course._id);
    popularTags = course.popularTags;
    console.log(popularTags);
    for (var t = 0; t < data.tags.length; t++) {
        tag = data.tags[t];
        var flag = false;
        for(i in popularTags){
            if (tag == popularTags[i].name) {
                console.log("here")
                popularTags[i].number += 1;
                flag = true;
                break;
            }
        }
        if(!flag){
            var newTag = {"name": tag, "number":1};
            console.log(newTag);
            popularTags.push(newTag);
        }
    }
    console.log(popularTags);
    course.ratings.push(newRating);
    course.update({
        $set: {
            overall: (course.overall * len + overall) / (len + 1),
            difficulty: (course.difficulty * len + difficulty) / (len + 1),
            workload: (course.workload * len + workload) / (len + 1),
            learningExp: (course.learningExp * len + learningExp) / (len + 1),
            ratingCount: len + 1,
            popularTags: popularTags,
            ratings: course.ratings
        }
    }, function(err) {
        if (err) {
            console.log(err);
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


    Rating.remove({ _id: req.body.rating });
}

/**
 * Deletes the user and all their ratings.
 */
function banUser(req, res) {
    User.findOne({ '_id': req.userID }, function(err, usr) {
        if (err) {
            console.log(err);
        } else {
            Rating.remove({ "user": req.userID }, function(err, rats) {
                if (err) {
                    console.log(err);
                } else {
                    User.remove({ '_id': req.userID }, function(err, rts) {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
            })
        }
    });
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
    getUserSuggested: getUserSuggested,
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
    banUser: banUser,
    updateHelpfulness: updateHelpfulness,
    getRatings: getRatings,
    getPopularTags: getPopularTags,
    userLogout: userLogout
};
