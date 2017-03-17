angular.module('DepartmentCtrl', []).controller('DepartmentController', function($scope, $location, $routeParams, Department) {

    Department.getAllCourses($routeParams.department).then(function(data) {
        console.log(data);
        $scope.allCourses = data.data;
    })

    Department.getSuggestedCourses($routeParams.department).then(function(data) {
        $scope.suggestedCourses = data.data;
    });

    $scope.title = $routeParams.department;

});