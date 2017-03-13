angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

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
    });

    $locationProvider.html5Mode(true);

}]);