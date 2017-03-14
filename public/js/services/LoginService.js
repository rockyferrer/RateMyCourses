angular.module('LoginService', []).factory('Login', ['$http', function($http) {

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
            return $http.post('/api/user/register', formData);
        }
    }

}]);