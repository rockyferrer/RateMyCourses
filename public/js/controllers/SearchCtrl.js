angular.module('SearchCtrl', []).controller('SearchController', function($scope, $routeParams, $http, Search) {

    $http.get('/api/search/' + $routeParams.query).then(function(data) {
        $scope.allResults = data.data;
        console.log($scope.allResults);
    });
});