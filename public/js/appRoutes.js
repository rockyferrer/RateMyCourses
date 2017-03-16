angular.module('appRoutes', ['LoginCtrl', 'DepartmentCtrl', 'CourseCtrl', 'LandingCtrl']).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    // home page
    $routeProvider.when('/', {
        templateUrl: 'views/home.html',
        controller: 'MainController',
        css: 'css/home.css'
    })

    // Login page
    .when('/login', {
        //title: 'RateMyCourses - Login',
        templateUrl: 'views/login.html',
        controller: 'LoginController',
        css: 'css/login.css'
    })

    // Department Page
    .when('/dept/:department', {
        //title: 'RateMyCourses - ',
        templateUrl: 'views/department.html',
        controller: 'DepartmentController',
        css: 'css/department.css'
    })

    // Course Page
    .when('/courses/:courseCode', {
        //title: 'RateMyCourses',
        templateUrl: 'views/course.html',
        controller: 'CourseController',
        css: 'css/course.css'
    })

    // User landing page
    .when('/user/landing', {
        templateUrl: 'views/userlanding.html',
        controller: 'LandingController',
        css: 'css/userlanding.css'
    })

    .otherwise({
        redirectTo: '/'
    });

    $locationProvider.html5Mode(true);

}]);