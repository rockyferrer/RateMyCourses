var app = angular.module("userlanding", []);

app.controller("suggestedcourses", function($scope) {
	// Dummy data
	$scope.courses = [
		{
			"courseCode" : "CSC309",
			"courseTitle" : "Programming on the Web",
			"department" : "Computer Science",
			"rating" : "5"
		},{
			"courseCode" : "CSC369",
			"courseTitle" : "Operating Systems",
			"department" : "Computer Science",
			"rating" : "5"
		},{
			"courseCode" : "CSC301",
			"courseTitle" : "Introduction to Software Engineering",
			"department" : "Computer Science",
			"rating" : "5"
		},{
			"courseCode" : "CSC302",
			"courseTitle" : "Introduction to Software Engineering",
			"department" : "Computer Science",
			"rating" : "5"
		}
	]
});

app.controller("history", function($scope) {
	// Dummy data
	$scope.courses = [
		{
			"courseCode" : "CSC309",
			"courseTitle" : "Programming on the Web",
			"department" : "Computer Science",
			"rating" : "5"
		},{
			"courseCode" : "CSC369",
			"courseTitle" : "Operating Systems",
			"department" : "Computer Science",
			"rating" : "5"
		},{
			"courseCode" : "CSC301",
			"courseTitle" : "Introduction to Software Engineering",
			"department" : "Computer Science",
			"rating" : "5"
		},{
			"courseCode" : "CSC302",
			"courseTitle" : "Introduction to Software Engineering",
			"department" : "Computer Science",
			"rating" : "5"
		}
	]
});


app.controller("rated", function($scope) {
	// Dummy data
	$scope.courses = [
		{
			"courseCode" : "CSC309",
			"courseTitle" : "Programming on the Web",
			"department" : "Computer Science",
			"rating" : "5"
		},{
			"courseCode" : "CSC369",
			"courseTitle" : "Operating Systems",
			"department" : "Computer Science",
			"rating" : "5"
		},{
			"courseCode" : "CSC301",
			"courseTitle" : "Introduction to Software Engineering",
			"department" : "Computer Science",
			"rating" : "5"
		},{
			"courseCode" : "CSC302",
			"courseTitle" : "Introduction to Software Engineering",
			"department" : "Computer Science",
			"rating" : "5"
		}
	]
});


