angular.module('CourseCtrl', []).controller('CourseController', function($scope, $http, $routeParams, Course) {

    $http.get('/api/courses/' + $routeParams.courseCode).then(function(data) {
        $scope.course = data.data;
    });

});