angular.module('DepartmentService', []).factory('Department', ['$http', function($http) {

    return {
        // call to get all nerds
        getAllCourses: function(department) {
            return $http.get('/api/dept/' + department + '/courses');
        }
    }

}]);