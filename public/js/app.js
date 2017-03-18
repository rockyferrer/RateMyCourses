angular.module('rateMyCourses', [
    'ngRoute',
    'appRoutes',
    'MainCtrl',
    'LoginCtrl', 'LoginService',
    'DepartmentCtrl', 'DepartmentService',
    'CourseCtrl', 'CourseService',
    'LandingCtrl', 'LandingService',
    'SearchCtrl', 'SearchService',
    'ProfileCtrl'
]).config(['$qProvider', function($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);