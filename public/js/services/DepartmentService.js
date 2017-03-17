angular.module('DepartmentService', []).factory('Department', ['$http', function($http) {

    return {
        // call to get all nerds
        getAllCourses: function(department) {
            return $http.get('/api/dept/' + department + '/allCourses');
        },

        getSuggestedCourses: function(department) {
            return $http.get('/api/dept/' + department + '/suggested');
        }
    }

}]);