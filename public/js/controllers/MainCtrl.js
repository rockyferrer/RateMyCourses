angular.module('MainCtrl', []).controller('MainController', function($scope, $rootScope) {

    $scope.title = "RateMyCourses - Because Knowledge Is Power"
    $scope.cssFilename = "home"
    $rootScope.loggedIn = false;
});