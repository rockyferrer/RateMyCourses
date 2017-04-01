angular.module('ProfileCtrl', []).controller('ProfileController', function($scope, $http, $routeParams, $rootScope) {
    if ($rootScope.loggedIn == false) $location.path("/");
    $http.get('/api/user/' + $rootScope.user).then(function(data) {
        $scope.userID = data.data.email;
    });

    $http.get('/api/faculties/all').then(function(data) {
            $scope.faculty_list = data.data;
        })
        .then($http.get('/api/dept/all').then(function(data) {
            $scope.department_list = data.data;
        }));



    $scope.userForm = {
        "userID": $rootScope.user,
        "password": $scope.password,
        "faculty": $scope.faculty,
        "department": $scope.department
    };

    

    $scope.saveUserInfo = function() {
        $rootScope.user = $scope.userForm.userID;
        $scope.userID = $scope.userForm.userID;
        console.log('username changed to ' + $scope.userForm.userID);
        console.log('department changed to ' + $scope.userForm.department);
        console.log('faculty changed to ' + $scope.userForm.faculty);
        //console.log('id is ' + $rootScope.userForm.userID);
        $http.put('/api/user/updateInfo', $scope.userForm).then(
            function(data) {
                if (data.status == 200) {
                    $http.get('/api/user/' + $scope.userForm.userID)
                        .then(function(data) {
                            $scope.userID = data.data.email;
                            $rootScope.user = data.data.email;
                            $scope.department = data.data.department;
                            $scope.faculty = data.data.faculty;

                        });
                } else {
                    console.log('failure');
                }
            }
        );

    };

    $scope.logout = function() {
        $rootScope.loggedIn = false;
        $rootScope.user = null;
        $cookies.getAll().forEach(function(cookie) {
            $cookies.remove(cookie);
        });
    }

    $scope.deleteAccount = function() {
        $http.delete('/api/users/deleteUser/' + $scope.user).then(
            function() {
                $scope.logout();
            }
        );
    }

});
