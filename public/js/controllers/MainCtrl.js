angular.module('MainCtrl', []).controller('MainController', function($scope, $location, $rootScope) {

    $scope.title = "RateMyCourses - Because Knowledge Is Power"
    $scope.cssFilename = "home"
    if ($rootScope.loggedIn != true) $rootScope.loggedIn = false;
    $rootScope.search = function() {
        console.log("Searching");
        $location.path("/search/" + $rootScope.searchField);
    }

    $rootScope.gotoCourse = function(c) {
        $location.path('/courses/' + c.courseCode);
    }

    $rootScope.gotoDepartment = function(d) {
        $location.path('/dept/' + d);
    }
});