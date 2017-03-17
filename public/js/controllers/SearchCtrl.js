angular.module('SearchCtrl', []).controller('SearchController', function($scope, $routeParams, SearchService) {

    $scope.courseResults = DepartmentService.searchResults($routeParams.query);
    $scope.cssFilename = "searchresults";

});
