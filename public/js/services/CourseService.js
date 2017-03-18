angular.module('CourseService', []).factory('Course', ['$http', function($http) {

    return {
        // Get course info
        getCourse: function(courseCode) {
            return $http.get('/api/courses/' + courseCode);
        },

        processRating: function(courseCode, ratingData) {
            console.log("process rating");
            return $http.post('/api/courses/' + courseCode + '/addRating', ratingData);
        }
    }

}]);
