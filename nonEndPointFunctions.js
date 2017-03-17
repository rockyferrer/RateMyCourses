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

module.exports = {getAllFaculties: getAllFaculties, userRegister: userRegister, userLogin: userLogin, getAllDepartments: getAllDepartments};
