angular.module('SearchService', []).factory('Search', ['$http', function($http) {

    return {
        // call to get all nerds
        searchResults: function(query) {
            return $http.get('/api/search/' + query);
        }
    }

}]);
