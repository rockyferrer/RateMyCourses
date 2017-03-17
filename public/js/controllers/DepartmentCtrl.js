angular.module('DepartmentCtrl', []).controller('DepartmentController', function($scope, $location, $routeParams, Department) {

    Department.getAllCourses($routeParams.department).then(function(data) {
        console.log(data);
        $scope.allCourses = data.data;
    })

    $scope.suggestedCourses = Department.getAllCourses($routeParams.department);
    console.log($scope.allCourses);
    $scope.title = $routeParams.department;

});