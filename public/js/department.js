var app = angular.module("department", []);

/*
var app = angular.module("department", [], function($locationProvider) {
    $locationProvider.html5Mode({ enabled: true, requireBase: false });
});*/

var department = "Computer Science"

app.controller('mainController', function($scope, $location) {
    $scope.title = 'title';
    console.log($location.path());
})


app.controller('suggestedCourses', function($scope, $http) {

    /**
     * Determines the number of suggested courses to show based on page width.
     * 
     * NOTE: This only works on reload not resize.
     */
    $scope.getLimit = function() {
        if (window.innerWidth < 768) {
            return 3;
        } else return 10;
        console.log(window.innerWidth);
    };

    $http.get('/api/dept/' + department + '/courses')
        .success(function(data) {
            $scope.courses = data
        })
        .error(function(data) {
            console.log('Could not get department: ' + data)
        });

    // Dummy data	
    /*$scope.courses = [{
        "courseCode": "CSC309",
        "courseTitle": "Programming on the Web",
        "rating": "5"
    }, {
        "courseCode": "CSC369",
        "courseTitle": "Operating Systems",
        "rating": "5"
    }, {
        "courseCode": "CSC301",
        "courseTitle": "Introduction to Software Engineering",
        "rating": "5"
    }, {
        "courseCode": "CSC302",
        "courseTitle": "Introduction to Software Engineering",
        "rating": "5"
    }, {
        "courseCode": "CSC301",
        "courseTitle": "Introduction to Software Engineering",
        "rating": "5"
    }, {
        "courseCode": "CSC302",
        "courseTitle": "Introduction to Software Engineering",
        "rating": "5"
    }]*/
});

/**
 * Stores list of all courses in the department.
 */
app.controller('allCourses', function($scope, $http) {

    $http.get('/api/dept/Computer%20Science/courses')
        .success(function(data) {
            $scope.courses = data
        })
        .error(function(data) {
            console.log('Could not get department: ' + data)
        });

    /*$scope.courses = [{
        "courseCode": "CSC301",
        "courseTitle": "Intro to Software Design"
    }, {
        "courseCode": "CSC302",
        "courseTitle": "Introduction to Software Engineering"
    }, {
        "courseCode": "CSC369",
        "courseTitle": "Operating Systems"
    }, {
        "courseCode": "CSC301",
        "courseTitle": "Intro to Software Design"
    }, {
        "courseCode": "CSC302",
        "courseTitle": "Introduction to Software Engineering"
    }, {
        "courseCode": "CSC369",
        "courseTitle": "Operating Systems"
    }, {
        "courseCode": "CSC301",
        "courseTitle": "Intro to Software Design"
    }, {
        "courseCode": "CSC302",
        "courseTitle": "Introduction to Software Engineering"
    }, {
        "courseCode": "CSC369",
        "courseTitle": "Operating Systems"
    }, {
        "courseCode": "CSC301",
        "courseTitle": "Intro to Software Design"
    }, {
        "courseCode": "CSC302",
        "courseTitle": "Introduction to Software Engineering"
    }, {
        "courseCode": "CSC369",
        "courseTitle": "Operating Systems"
    }]*/
});