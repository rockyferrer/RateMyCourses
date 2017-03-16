angular.module('LoginService', []).factory('Login', ['$http', '$location', function($http, $location, $route) {

    return {
        //TODO: No longer needed

        // Get all the known departments
        getAllDepartments: function() {
            return $http.get('/api/dept/all');
        },

        // Get all the known faculties 
        getAllFaculties: function() {
            return $http.get('/api/faculties/all');
        },

        processLogin: function(formData) {
            return $http.post('/api/user/login', formData);
        },

        processRegistration: function(formData) {
            return $http.post('/api/user/register', formData).then(
                function(data) {
                    if (data.status == 200) {
                        console.log('success');
                        $location.path('/user/landing');
                        $scope.apply();
                    } else {
                        console.log(data.status);
                    }
                }
            );
        }
    }

}]);