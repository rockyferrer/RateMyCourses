angular.module('LoginCtrl', []).controller('LoginController', function($scope, $http, Login) {

    $http.get('/api/faculties/all').then(function(data) {
        $scope.faculty_list = data.data;
    })

    .then($http.get('/api/dept/all').then(function(data) {
        $scope.department_list = data.data;
    }));

    $scope.submitLogin = function() {
        Login.processLogin($scope.loginForm);
    };

    $scope.submitRegister = function() {
        var data = {
            email: $scope.loginForm.email,
            password: $scope.loginForm.password,
            faculty: $scope.loginForm.faculty,
            department1: $scope.loginForm.department1,
            department2: $scope.loginForm.department2,
            department3: $scope.loginForm.department3
        }
        Login.processRegistration(data);
    }

});