angular.module('appRoutes', ['LoginCtrl', 'DepartmentCtrl', 'CourseCtrl']).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

    // home page
        .when('/', {
        templateUrl: 'views/home.html',
        controller: 'MainController'
    })

    // Login page
    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
    })

    // Department Page
    .when('/dept/:department', {
        templateUrl: 'views/department.html',
        controller: 'DepartmentController'
    })

    // Course Page
    .when('/course/:courseCode', {
        templateUrl: 'views/course.html',
        controller: 'CourseController'
    });

    $locationProvider.html5Mode(true);

}]);