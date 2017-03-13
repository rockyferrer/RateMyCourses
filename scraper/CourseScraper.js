var request = require('request');
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var models = require('../model.js');
var courseSchema = models.courseSchema;
var Course;

var key = '9iDLLnSQRMwapjbMs5Yb7tnwyqAxK5ud';
var url = 'https://cobalt.qas.im/api/1.0/courses/' + '?key=' + key + "&skip=100&limit=100";

function CourseScraper(db, skip) {
    this.url = 'https://cobalt.qas.im/api/1.0/courses/?key=' + key + "&skip=" + skip + "&limit=100";
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
    console.log("Requesting: " + this.url);
    request(this.url, function(error, response, body) {
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
	if(self.data == undefined){
		console.log("Error at: " + self.count);
		return;
	}
    self.data.forEach(function(value) {
        var size = 0;
        if (value.meeting_sections && value.meeting_sections[0]) {
            size = value.meeting_sections[0].size;
        }
        c = new Course({
            courseCode: value.code,
            title: value.name,
            department: value.department,
            description: value.description,
            popularTags: [],
            classSize: size,
            ratings: []
        });
        console.log(c.courseCode + ' - ' + c.title);
        c.save(function(err) {
            if (err) {
                console.log('Error saving to db:' + err);
            } else {
                //console.log('Done');
            }
        });
    });
    //self.emit('parsingComplete');
}

module.exports = CourseScraper;
