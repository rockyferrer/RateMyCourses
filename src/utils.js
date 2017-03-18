var pw = require('./password.js');
var mongoose = require('mongoose');
var models = require('./model.js');
var db = mongoose.connection;
var User = db.model('User', models.userSchema);

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

//finds the key with the highest value in <dict>
function findMax(dict) {
    var max = -1;
    var max_key = "";
    for (item in ls) {
        if (dict[item] > max) {
            max = dict[item];
            max_key = item;
        }
    }
    return max_key;
}



function loggedIn(req, res, next) {
    if ('user' in req.session) {
        next();
    } else {
        res.redirect('/');
    }
}

module.exports = { createUser: createUser, loggedIn: loggedIn, findMax: findMax };
