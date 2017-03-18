angular.module('ProfileCtrl', []).controller('ProfileController', function($scope, $http, $routeParams, $rootScope) {
    console.log($rootScope.user);

    $http.get('/api/user/' + $rootScope.user).then(function(data) {
        $scope.userID = data.data.email;
        console.log($scope.userID);
    });

    $http.get('/api/faculties/all').then(function(data) {
        $scope.faculty_list = data.data;
    })
    .then($http.get('/api/dept/all').then(function(data) {
        $scope.department_list = data.data;
    }));

    $scope.userForm = {
        "userID" : $rootScope.user
    };

    $scope.saveUserInfo = function() {
        $rootScope.user = $scope.userForm.userID;
        console.log('username changed to ' + $rootScope.user);
        // $http.put('/api/user/updateInfo').then(
        //     function(data) {
        //         if (data.status == 200) {
        //             $http.get('/api/user/' + $scope.userForm.userID)
        //                 .then(function(data) {
        //                     $scope.userID = data.data;
        //                 });
        //         } else {
        //             console.log('failure');
        //         }
        //     }
        // );

    }

});
