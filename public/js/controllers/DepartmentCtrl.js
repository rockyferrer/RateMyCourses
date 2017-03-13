angular.module('DepartmentCtrl', []).controller('DeartmentController', function($scope, $routeParams, DepartmentService) {

    $scope.allCourses = DepartmentService.getAllCourses($routeParams.department);
    $scope.suggestedCourses = DepartmentService.getAllCourses($routeParams.department);
    $scope.title = $routeParams.department;

});