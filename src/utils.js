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

module.exports = { createUser };