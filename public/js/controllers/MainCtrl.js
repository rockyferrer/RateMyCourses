angular.module('MainCtrl', []).controller('MainController', function($scope, $location, $rootScope) {

    $scope.title = "RateMyCourses - Because Knowledge Is Power"
    $scope.cssFilename = "home"
    $rootScope.loggedIn = false;
    $rootScope.search = function() {
        console.log("Searching");
        $location.path("/search/" + $rootScope.searchField);
    }
});