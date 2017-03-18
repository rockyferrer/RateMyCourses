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
]).run(['$rootScope', "$cookies", function($rootScope, $cookies) {
    $rootScope.user = $cookies.get("user");
    $rootScope.loggedIn = ($rootScope.user != null);

}]);
/*.config(['$qProvider', function($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);*/