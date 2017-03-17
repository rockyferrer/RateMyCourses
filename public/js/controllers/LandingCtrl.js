angular.module('LandingCtrl', []).controller('LandingController', function($scope, Landing) {

    $scope.suggestedCourses = Landing.getSuggestedCourses();
    $scope.courseHistory = Landing.getUserHistory();
    $scope.ratedCourses = Landing.getCoursesRated();
});