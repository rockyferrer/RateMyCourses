var request = require('request');
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var models = require('../model.js');
var courseSchema = models.courseSchema;
var Course;

var key = '9iDLLnSQRMwapjbMs5Yb7tnwyqAxK5ud';
var url = 'https://cobalt.qas.im/api/1.0/courses/filter' + '?key=' + key + "&q=department:\"Computer Science&limit=100";

function CourseScraper(db, deparment) {
    this.department = deparment;
    this.db = db;
    this.requestData;
    Course = db.connection.model('Course', courseSchema);
    this.init();
}

util.inherits(CourseScraper, EventEmitter);

CourseScraper.prototype.init = function() {
    var self = this;
    self.on('requestComplete', function() {
        self.parseAndSave();
    });
    self.on('parsingComplete', function() {
        self.db.connection.close();
    })
    self.requestCourses();

};

CourseScraper.prototype.requestCourses = function() {
    var self = this;
    console.log("Requesting: " + url);
    request(url, function(error, response, body) {
        if (error) {
            console.log("Error on cobalt request.");
        } else {
            self.data = JSON.parse(body);
            console.log("Request complete");
            self.emit('requestComplete')
        }
    });
};

CourseScraper.prototype.parseAndSave = function() {
    var self = this;
    var c;
    var count = 0;
    self.data.forEach(function(value) {
        c = new Course({
            courseCode: value.code,
            title: value.name,
            department: value.department,
            description: value.description,
            popularTags: [],
            classSize: value.meeting_sections[0].size,
            ratings: []
        });
        c.save(function(err) {
            if (err) {
                console.log('Error saving to db:' + err);
            } else {
                console.log('Sucess!');
            }
        });
    });
    //self.emit('parsingComplete');
}

module.exports = CourseScraper;