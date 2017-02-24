var app = angular.module("searchresults", []);
/**
 * Stores the course results of the query.
 */
app.controller("courseresults", function($scope) {
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

/**
 * Stores department results of the query.
 */
app.controller("departmentresults", function($scope) {
	// Dummy data
	$scope.departments = [
		"Computer Science", "Mathematics", "Statistics"
	]
});
