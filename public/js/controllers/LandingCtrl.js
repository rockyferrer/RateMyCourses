angular.module('LandingCtrl', []).controller('LandingController', function($scope, $rootScope, Landing) {

    if ($rootScope.loggedIn == false) $location.path("/");
    Landing.getSuggestedCourses().then(function(data) {
        $scope.suggestedCourses = data.data;
    });

    Landing.getUserHistory().then(function(data) {
        $scope.courseHistory = data.data;
        console.log("History: " + data.data);
    });

    Landing.getCoursesRated().then(function(data) {
        $scope.ratedCourses = data.data;
    });
});