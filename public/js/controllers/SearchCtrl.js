angular.module('SearchCtrl', []).controller('SearchController', function($scope, $routeParams, SearchService) {

    $scope.courseResults = SearchService.searchResults($routeParams.query);
    $scope.cssFilename = "searchresults";

});
