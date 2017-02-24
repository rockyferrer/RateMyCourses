var app = angular.module('department', []);

app.controller('suggestedCourses', function($scope){
	$scope.getLimit = function() {
		if(window.innerWidth < 768){
			return 3;
		}
		else return 5;
		console.log(window.innerWidth);
  	};

	$scope.courses = [
		{
			"courseCode" : "CSC309",
			"courseTitle" : "Programming on the Web",
			"rating" : "5"
		},{
			"courseCode" : "CSC369",
			"courseTitle" : "Operating Systems",
			"rating" : "5"
		},{
			"courseCode" : "CSC301",
			"courseTitle" : "Introduction to Software Engineering",
			"rating" : "5"
		},{
			"courseCode" : "CSC302",
			"courseTitle" : "Introduction to Software Engineering",
			"rating" : "5"
		},{
			"courseCode" : "CSC301",
			"courseTitle" : "Introduction to Software Engineering",
			"rating" : "5"
		},{
			"courseCode" : "CSC302",
			"courseTitle" : "Introduction to Software Engineering",
			"rating" : "5"
		}
	]
});

app.controller('allCourses', function($scope){
	$scope.courses = [
		{
			"courseCode" : "CSC301",
			"courseTitle" : "Intro to Software Design"
		},{
			"courseCode" : "CSC302",
			"courseTitle" : "Introduction to Software Engineering"
		},{
			"courseCode" : "CSC369",
			"courseTitle" : "Operating Systems"
		},{
			"courseCode" : "CSC301",
			"courseTitle" : "Intro to Software Design"
		},{
			"courseCode" : "CSC302",
			"courseTitle" : "Introduction to Software Engineering"
		},{
			"courseCode" : "CSC369",
			"courseTitle" : "Operating Systems"
		},{
			"courseCode" : "CSC301",
			"courseTitle" : "Intro to Software Design"
		},{
			"courseCode" : "CSC302",
			"courseTitle" : "Introduction to Software Engineering"
		},{
			"courseCode" : "CSC369",
			"courseTitle" : "Operating Systems"
		},{
			"courseCode" : "CSC301",
			"courseTitle" : "Intro to Software Design"
		},{
			"courseCode" : "CSC302",
			"courseTitle" : "Introduction to Software Engineering"
		},{
			"courseCode" : "CSC369",
			"courseTitle" : "Operating Systems"
		}
	]
});
	
