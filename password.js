/**
 * THIS CODE WAS ORIGINALL WRITTEN BY RAHIL SHAIKH MODIFIED BY DAVID ANSERMINO
 * https://ciphertrick.com/2016/01/18/salt-hash-passwords-using-nodejs-crypto/https://ciphertrick.com/2016/01/18/salt-hash-passwords-using-nodejs-crypto/
 * 
 * This is an elegant yet simple implementation of the 
 * two functions required for user authentication. We first
 * need to be able to produce 'salt' (random data) which is
 * then hashed with our user passphrase to produce a unique
 * output to protect against predictable hashes. The other being
 * a function to produce the hash from the same passphrase
 * and salt for comparison.
 */

var crypto = require('crypto');
/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
var genRandomString = function(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0, length); /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
var sha512 = function(password, salt) {
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
};

/**
 * Generate a new salt and generate the resulting hash.
 */
function createNewHash(password) {
    var salt = genRandomString(10);
    var hash = sha512(password, salt);
    return hash;
}

/**
 * Compare a hash value to the output of a password and salt.
 */
function validatePassphrase(userInput, salt, expectedHash) {
    var hash = (userInput, salt);
    return (expectedHash == hash.passwordHash);
}

module.exports = { createNewHash, validatePassphrase };