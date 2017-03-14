angular.module('appRoutes', ['LoginCtrl', 'DepartmentCtrl', 'CourseCtrl']).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

    // home page
        .when('/', {
        title: 'RateMyCourses - Knowledge Is Power',
        templateUrl: 'views/home.html',
        controller: 'MainController'
    })

    // Login page
    .when('/login', {
            title: 'RateMyCourses - Login',
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        //TODO: ADD CORRECT TITLE
        // Department Page
        .when('/dept/:department', {
            title: 'RateMyCourses - ',
            templateUrl: 'views/department.html',
            controller: 'DepartmentController'
        })

    // Course Page
    .when('/course/:courseCode', {
        title: 'RateMyCourses',
        templateUrl: 'views/course.html',
        controller: 'CourseController'
    });

    $locationProvider.html5Mode(true);

}]);