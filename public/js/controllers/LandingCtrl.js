angular.module('LandingCtrl', []).controller('LandingController', function($scope, Landing) {

    Landing.getSuggestedCourses().then(function(data) {
        $scope.suggestedCourses = data.data;
    });

    Landing.getUserHistory().then(function(data) {
        $scope.courseHistory = data.data;
    });

    Landing.getCoursesRated().then(function(data) {
        $scope.ratedCourses = data.data;
    });
});