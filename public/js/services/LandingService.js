angular.module('LandingService', []).factory('Landing', ['$http', function($http) {

    return {
        // Get suggested courses for user
        getSuggestedCourses: function() {
            return $http.get('/api/dept/Computer Science/suggested');
        },

        // Get users viewing history
        getUserHistory: function() {
            return $http.get('/api/user/history');
        },

        // Get all the courses the user has reviewd
        getCoursesRated: function() {
            return $http.get('/api/user/rated');
        }
    }

}]);