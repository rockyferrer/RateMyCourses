angular.module('LoginService', []).factory('Login', ['$http', function($http) {

    return {
        // Get all the known departments
        getAllDepartments: function() {
            return $http.get('/api/dept/all');
        },

        // Get all the known faculties 
        getAllFaculties: function() {
            return $http.get('/api/faculties/all');
        }
    }

}]);