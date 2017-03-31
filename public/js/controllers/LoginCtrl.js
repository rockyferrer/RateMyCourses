angular.module('LoginCtrl', ['ngCookies']).controller('LoginController', function($scope, $http, $location, $cookies, $rootScope, Login) {

    $http.get('/api/faculties/all').then(function(data) {
        $scope.faculty_list = data.data;
    })

    .then($http.get('/api/dept/all').then(function(data) {
        $scope.department_list = data.data;
    }));

    $scope.error = null;

    $scope.submitLogin = function() {
        if (loginForm.password == null) {
            $scope.error = "Password missing.";
            return;
        }
        if (loginForm.email == null || !loginForm.email.includes('@')) {
            $scope.error = "Please enter valid email.";
            return;
        }

        Login.processLogin($scope.loginForm).then(
            function(data) {
                console.log(data);
                if (data.data < 3) {
                    $rootScope.loggedIn = true;
                    $rootScope.user = $scope.loginForm.email;
                    $cookies.put('user', $scope.loginForm.email);
                    $location.path('/user/landing');
                    if (data.data == 1) {
                        $cookies.put('admin', true);
                        $rootScope.admin = true;
                    }
                } else if (data.data == 3) {
                    // Clear fields
                    $scope.error = "Invalid login.";
                }
            }
        );
    };

    $scope.submitRegister = function() {
        if (loginForm.password != loginForm.confirmPassword) {
            $scope.error = "Password do not match.";
            return;
        }
        if (loginForm.department1 == '' || loginForm.faculty == '' || loginForm.confirmPassword == '' ||
            loginForm.password == '' || loginForm.email == '') {
            $scope.error = "Missing required field.";
            return;
        }
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
                if (data.data < 3) {
                    $rootScope.loggedIn = true;
                    $rootScope.user = $scope.loginForm.email;
                    $cookies.put('user', $scope.loginForm.email);
                    $location.path('/user/landing');

                } else {
                    $scope.error = "Error creating user. Relax, it's not your fault.";
                }
            }
        );
    };
});