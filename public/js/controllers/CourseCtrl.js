angular.module('CourseCtrl', []).controller('CourseController', function($scope, Course) {

    $scope.course = Course.getCourse(courseCode);

});