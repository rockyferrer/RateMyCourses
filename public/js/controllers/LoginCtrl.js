angular.module('LoginCtrl', []).controller('LoginController', function($scope, $http, $location, Login) {

    $http.get('/api/faculties/all').then(function(data) {
        $scope.faculty_list = data.data;
    })

    .then($http.get('/api/dept/all').then(function(data) {
        $scope.department_list = data.data;
    }));

    $scope.submitLogin = function() {
        Login.processLogin($scope.loginForm).then(
            function(data) {
                console.log(data);
                if (data.status == 200) {
                    console.log('success');
                    $location.path('/user/landing');

                } else {
                    console.log('faliure');
                    // Clear fields
                    // Show error
                    element(by.class("hidden-error-msg")).getAtrribute('class')
                        .toBe('error-msg');
                }
            }
        );
    };

    $scope.submitRegister = function() {
        var data = {
            email: $scope.loginForm.email,
            password: $scope.loginForm.password,
            faculty: $scope.loginForm.faculty,
            department1: $scope.loginForm.department1,
            department2: $scope.loginForm.department2,
            department3: $scope.loginForm.department3
        };
        Login.processRegistration(data).then(
            function(data) {
                if (data.status == 200) {
                    console.log('success');
                    $location.path('/user/landing');

                } else {
                    console.log(data.status);
                }
            }
        );
    };
});