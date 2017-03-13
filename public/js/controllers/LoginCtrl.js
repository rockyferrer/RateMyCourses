angular.module('LoginCtrl', []).controller('LoginController', function($scope, Login) {

    $scope.departments = Login.getAllDepartments();
    $scope.faculties = Login.getAllFaculties();

});