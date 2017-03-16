angular.module('LandingCtrl', []).controller('LandingController', function($scope, LandingService) {

    $scope.suggestedCourses = LandingService.getSuggestedCourses();
    $scope.courseHistory = LandingService.getUserHistory();
    $scope.ratedCourses = LandingService.getCoursesRated();
});