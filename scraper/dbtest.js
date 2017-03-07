var mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
	code: {type: String, required: true},
	title: {type: String, required: true},
	department: {type: String, required: true},
	description: {type: String, required: true},
	tags: [String],
	classSize: {type: Number},
	ratings: [String]
});

var course = mongoose.model('Course', courseSchema);

var db = mongoose.connect('mongodb://localhost/Team23-RateMyCourses');

var data = [ 
{ id: 'CSC165H1S20171',
  code: 'CSC165H1S',
  name: 'Mathematical Expression and Reasoning for Computer Science',
  description: 'Introduction to abstraction and rigour. Informal introduction to logical notation and reasoning. Understanding, using and developing precise expressions of mathematical ideas, including definitions and theorems. Structuring proofs to improve presentation and comprehension. General problem-solving techniques. Running time analysis of iterative programs.  Formal definition of Big-Oh.  Diagonalization, the Halting Problem, and some reductions. Unified approaches to programming and theoretical problems.',
  division: 'Faculty of Arts and Science',
  department: 'Computer Science',
  prerequisites: '',
  exclusions: 'CSC236H1, CSC240H1',
  level: 100,
  campus: 'UTSG',
  term: '2017 Winter',
  meeting_sections: 
   [ { code: 'L0101',
       size: 220,
       enrolment: 0,
       times: [Object],
       instructors: [Object] },
     { code: 'L0201',
       size: 220,
       enrolment: 0,
       times: [Object],
       instructors: [Object] },
     { code: 'L0301',
       size: 198,
       enrolment: 0,
       times: [Object],
       instructors: [Object] },
     { code: 'L5101',
       size: 200,
       enrolment: 0,
       times: [Object],
       instructors: [Object] } ],
  breadths: [ 5 ] },

{ id: 'CSC148H1S20171',
  code: 'CSC148H1S',
  name: 'Introduction to Computer Science',
  description: 'Abstract data types and data structures for implementing them. Linked data structures. Encapsulation and information-hiding. Object-oriented programming. Specifications. Analyzing the efficiency of programs. Recursion. This course assumes programming experience as provided by CSC108H1. Students who already have this background may consult the Computer Science Undergraduate Office for advice about skipping CSC108H1. Practical (P) sections consist of supervised work in the computing laboratory. These sections are offered when facilities are available, and attendance is required. NOTE: Students may go to their college to drop down from CSC148H1 to CSC108H1. See above for the drop down deadline.',
  division: 'Faculty of Arts and Science',
  department: 'Computer Science',
  prerequisites: 'CSC108H1/(equivalent programming experience)',
  exclusions: 'CSC150H1',
  level: 100,
  campus: 'UTSG',
  term: '2017 Winter',
  meeting_sections: 
   [ { code: 'L0101',
       size: 250,
       enrolment: 0,
       times: [Object],
       instructors: [Object] },
     { code: 'L0201',
       size: 250,
       enrolment: 0,
       times: [Object],
       instructors: [Object] },
     { code: 'L0301',
       size: 250,
       enrolment: 0,
       times: [Object],
       instructors: [Object] },
     { code: 'L5101',
       size: 250,
       enrolment: 0,
       times: [Object],
       instructors: [Object] },
     { code: 'T0101',
       size: 148,
       enrolment: 0,
       times: [Object],
       instructors: [] },
     { code: 'T0201',
       size: 148,
       enrolment: 0,
       times: [Object],
       instructors: [] },
     { code: 'T0301',
       size: 148,
       enrolment: 0,
       times: [Object],
       instructors: [] },
     { code: 'T0401',
       size: 148,
       enrolment: 0,
       times: [Object],
       instructors: [] },
     { code: 'T0501',
       size: 112,
       enrolment: 0,
       times: [Object],
       instructors: [] },
     { code: 'T5101',
       size: 112,
       enrolment: 0,
       times: [Object],
       instructors: [] },
     { code: 'T5201',
       size: 40,
       enrolment: 0,
       times: [Object],
       instructors: [] },
     { code: 'T5301',
       size: 148,
       enrolment: 0,
       times: [Object],
       instructors: [] } ],
  breadths: [ 5 ] }];


data.forEach(function(e){
	var c = new course({
		code: e.code,
		title: e.name,
		department: e.department,
		description: e.description,
		tags: [],
		classSize: 9999,
		ratings: []
	});
	c.save(function(err){
		if(err){
			console.log(err);
		}
		else{
			console.log('Success!');
		}
	});
});

mongoose.connection.close();


