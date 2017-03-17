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

// TODO: Implement multiple departments
function userRegister(req, res) {
    console.log(req.body);
    var newUser = createUser(req.body);
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
    if(len == 0){
	var overall = 0;
    }
    Course.update({
	courseCode: data.course.courseCode
    }, 
    {
	$set: { 
	    overall: (data.course.overall * len + data.overall)/(len + 1),
	    difficulty: (data.course.difficulty * len + data.difficulty)/(len + 1),
	    workload: (data.course.workload * len + data.workload)/(len + 1),
	    learningExp: (data.course.learningExp * len + data.learningExp)/(len + 1),
	    ratings: data.course.ratings
	}
    });

    return newRating;
}

module.exports = {getAllFaculties: getAllFaculties, userRegister: userRegister, userLogin: userLogin, getAllDepartments: getAllDepartments};
