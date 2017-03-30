angular.module('MainCtrl', ['ngCookies']).controller('MainController', function($scope, $cookies, $location, $rootScope) {

    $scope.title = "RateMyCourses - Because Knowledge Is Power"

    $rootScope.user = $cookies.get('user');
    if ($rootScope.user == null) $rootScope.loggedIn = false;
    if ($rootScope.loggedIn != true) $rootScope.loggedIn = false;
    $rootScope.search = function() {
        $location.path("/search/" + $rootScope.searchField);
    }
    $rootScope.homeSearch = function() {
        $location.path("/search/" + $rootScope.homeSearchField);
    }

    $rootScope.gotoCourse = function(c) {
        $location.path('/courses/' + c.courseCode);
    }

    $rootScope.gotoCourseCode = function(c) {
        $location.path('/courses/' + c);
    }

    $rootScope.gotoDepartment = function(d) {
        $location.path('/dept/' + d);
    }
});