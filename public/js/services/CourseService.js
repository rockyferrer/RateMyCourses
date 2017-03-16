angular.module('CourseService', []).factory('Course', ['$http', function($http) {

    return {
        // Get course info
        getCourse: function(courseCode) {
            return $http.get('/api/courses/' + courseCode);
        }
    }

}]);